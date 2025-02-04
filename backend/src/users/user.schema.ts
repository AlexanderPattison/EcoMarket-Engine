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
    username: string;

    @Prop({ required: true })
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, { message: 'Password too weak' })
    password: string;

    @Prop({ required: true, enum: UserRole, default: UserRole.User })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;