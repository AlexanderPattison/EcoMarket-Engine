import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@users/user.service';

@Controller('api')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Request() req) {
        const user = await this.userService.findById(req.user.userId);
        return { user: { id: user._id, name: user.username, role: user.role } };
    }
}