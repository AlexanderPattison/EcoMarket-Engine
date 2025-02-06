import { Controller, Get, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@users/user.service';
import { Request as ExpressRequest } from 'express'; // Assuming you're using Express

@Controller('api')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Request() req: ExpressRequest) {
        const user = req.user as { userId: string }; // Type assertion
        if (!user || !user.userId) {
            throw new UnauthorizedException('User not authenticated');
        }
        const foundUser = await this.userService.findById(user.userId);
        return { user: { id: foundUser._id, name: foundUser.username, role: foundUser.role } };
    }
}