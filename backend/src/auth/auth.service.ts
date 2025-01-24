import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new this.userModel({ username, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return { user: { id: user._id, name: user.username }, token };
  }

  async login({ username, password }) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return { user: { id: user._id, name: user.username }, token };
  }
}
