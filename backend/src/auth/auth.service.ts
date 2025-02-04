import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole, UserDocument } from '@users/user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface SignupData {
    username: string;
    password: string;
    role?: UserRole;
}

interface LoginData {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async signup(data: SignupData): Promise<{ user: { id: string; username: string; role: UserRole }; token: string }> {
        const validatePasswordStrength = (password: string): boolean => {
            const minLength = 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
        };

        if (!validatePasswordStrength(data.password)) {
            throw new BadRequestException('Password does not meet strength requirements. Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character.');
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = new this.userModel({ username: data.username, password: hashedPassword, role: data.role || UserRole.User });

        try {
            await user.save();
            const token = jwt.sign({ userId: user._id.toString(), role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return { user: { id: user._id.toString(), username: user.username, role: user.role }, token };
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('Username already exists');
            }
            throw new BadRequestException('An error occurred while signing up');
        }
    }

    async login(data: LoginData): Promise<{ user: { id: string; username: string; role: UserRole }; token: string }> {
        try {
            const user = await this.userModel.findOne({ username: data.username });
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const token = jwt.sign({ userId: user._id.toString(), role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return { user: { id: user._id.toString(), username: user.username, role: user.role }, token };
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