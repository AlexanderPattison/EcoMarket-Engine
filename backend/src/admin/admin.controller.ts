import { Controller, Get, Post, Body, UseGuards, Param, Put, UnauthorizedException, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';
import { UserRole } from '../users/user.schema';
import { Request as ExpressRequest } from 'express';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Get('users')
    @Roles(UserRole.Admin)
    async getAllUsers() {
        const users = await this.userService.findAll();
        return users;
    }

    @Put('users/:userId/role')
    @Roles(UserRole.Admin)
    async updateUserRole(@Param('userId') userId: string, @Body('role') role: string, @Request() req: ExpressRequest) {
        const user = req.user as { userId: string, role: UserRole }; // Type assertion with role check
        if (!user || user.role !== UserRole.Admin) {
            throw new UnauthorizedException('Only admins can change user roles');
        }
        return this.userService.updateRole(userId, role, user.userId);
    }
}