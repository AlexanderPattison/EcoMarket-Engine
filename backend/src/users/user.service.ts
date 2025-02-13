import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findAll() {
        return await this.userModel.find().select('_id username role');
    }

    async updateRole(userId: string, role: string, adminId: string) {
        const adminUser = await this.userModel.findById(adminId).select('role');
        if (!adminUser || adminUser.role !== 'admin') {
            throw new UnauthorizedException('Admin privileges required');
        }

        const updatedUser = await this.userModel.findByIdAndUpdate(userId, { role }, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    }

    async findById(userId: string) {
        const user = await this.userModel.findById(userId).select('_id username role');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}