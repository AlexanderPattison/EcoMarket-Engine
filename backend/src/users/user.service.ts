import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findAll() {
        return await this.userModel.find().select('_id username role');
    }

    async updateRole(userId: string, role: string) {
        const user = await this.userModel.findByIdAndUpdate(userId, { role }, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async findById(userId: string) {
        const user = await this.userModel.findById(userId).select('_id username role');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}