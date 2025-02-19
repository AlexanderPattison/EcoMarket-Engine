import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole, UserDocument } from '../users/user.schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async signup(signupDto: SignUpDto): Promise<{ user: { id: string; username: string; role: UserRole }; token: string }> {
        const hashedPassword = await bcrypt.hash(signupDto.password, 12);
        const user = new this.userModel({ username: signupDto.username, password: hashedPassword, role: UserRole.User });

        try {
            await user.save();
            const secret = process.env.SECRET_KEY || '';
            if (user._id) {
                const token = jwt.sign({ userId: user._id.toString(), role: user.role }, secret, { expiresIn: '1h' });
                return { user: { id: user._id.toString(), username: user.username, role: user.role }, token };
            } else {
                throw new Error('User ID is null');
            }
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('Username already exists');
            }
            throw new BadRequestException('An error occurred while signing up');
        }
    }

    async login(loginDto: LoginDto): Promise<{ user: { id: string; username: string; role: UserRole }; token: string }> {
        try {
            const user = await this.userModel.findOne({ username: loginDto.username });
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const secret = process.env.SECRET_KEY || '';
            if (user._id) {
                const token = jwt.sign({ userId: user._id.toString(), role: user.role }, secret, { expiresIn: '1h' });
                return { user: { id: user._id.toString(), username: user.username, role: user.role }, token };
            } else {
                throw new Error('User ID is null');
            }
        } catch (error) {
            throw new UnauthorizedException('Login failed');
        }
    }

    async isAdmin(userId: string): Promise<boolean> {
        const user = await this.userModel.findById(userId).select('role');

        if (!user) {
            return false;
        }

        if (!user.role) {
            return false;
        }

        return user.role === UserRole.Admin;
    }

    async isContentCreator(userId: string): Promise<boolean> {
        const user = await this.userModel.findById(userId);
        return user !== null && (user.role === UserRole.ContentCreator || user.role === UserRole.Admin);
    }
}