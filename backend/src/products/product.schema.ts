import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, MinLength, IsNumber } from 'class-validator';

@Schema()
export class Product extends Document {
    @Prop({ required: true, unique: true })
    @IsString()
    @MinLength(3)
    name: string;

    @Prop({ required: true })
    @IsString()
    description: string;

    @Prop({ required: true })
    @IsNumber()
    price: number;

    @Prop({ required: true })
    @IsNumber()
    quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Product & Document;