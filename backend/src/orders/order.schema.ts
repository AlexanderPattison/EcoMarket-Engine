import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, IsNumber } from 'class-validator';
import { Types } from 'mongoose';
import { User } from '@users/user.schema';

// Define an enum for order statuses
export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled'
}

@Schema()
export class Order extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], required: true })
    products: Types.ObjectId[];

    @Prop({ required: true })
    @IsNumber()
    totalPrice: number;

    @Prop({ default: Date.now })
    @IsString()
    createdAt: Date;

    @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
    @IsString()
    status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Order & Document;