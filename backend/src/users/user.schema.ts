import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, MinLength, Matches } from 'class-validator';

export enum UserRole {
    User = 'user',
    Admin = 'admin',
    ContentCreator = 'contentCreator'
}

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    @IsString()
    @MinLength(3)
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' })
    username: string;

    @Prop({ required: true })
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, { message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character' })
    password: string;

    @Prop({ required: true, enum: UserRole, default: UserRole.User })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;