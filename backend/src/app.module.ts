import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@users/user.module';
import { AdminModule } from '@admin/admin.module';
import { ProductsModule } from '@products/products.module';
import { OrdersModule } from '@orders/orders.module';

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
    controllers: [], // Remove any controllers here if they were previously here
    providers: [],
})
export class AppModule { }