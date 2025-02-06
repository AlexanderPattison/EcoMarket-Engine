import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express'; // Assuming you're using Express

@Controller('api')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() signupDto: SignUpDto) {
        return this.authService.signup(signupDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        // Clear any cookies if you're using them for JWT storage
        res.clearCookie('jwt');
        return res.status(200).json({ message: 'Logout successful' });
    }
}