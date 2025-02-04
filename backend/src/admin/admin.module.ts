import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@users/user.module';

@Module({
    imports: [AuthModule, UserModule],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }