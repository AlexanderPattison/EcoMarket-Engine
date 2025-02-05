import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@users/user.module';
import { AdminModule } from '@admin/admin.module';
import { ProductsModule } from '@products/products.module';
import { OrdersModule } from '@orders/orders.module';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                const uri = configService.get<string>('MONGODB_URI');
                if (!uri) {
                    throw new Error('MONGODB_URI is not defined');
                }
                return { uri };
            },
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule,
        AdminModule,
        ProductsModule,
        OrdersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RateLimitMiddleware)
            .forRoutes('api/signup', 'api/login'); // Apply rate limiting only to signup and login routes
    }
}