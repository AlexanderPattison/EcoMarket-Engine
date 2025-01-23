import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserSchema } from './auth/user.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        if (!process.env.MONGODB_URI) {
          throw new Error('MONGODB_URI is not defined');
        }
        return { uri: process.env.MONGODB_URI };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
