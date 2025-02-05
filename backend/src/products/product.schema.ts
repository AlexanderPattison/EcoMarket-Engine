import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, MinLength, IsNumber, IsUrl, Min } from 'class-validator';

@Schema()
export class Product extends Document {
    @Prop({ required: true, unique: true })
    @IsString()
    @MinLength(3)
    name: string;

    @Prop({ required: true })
    @IsString()
    @MinLength(10)
    description: string;

    @Prop({ required: true })
    @IsNumber()
    @Min(0.01, { message: 'Price must be at least 0.01' })
    price: number;

    @Prop({ required: true })
    @IsNumber()
    @Min(0)
    quantity: number;

    @Prop({ required: true })
    @IsUrl()
    imageUrl: string;

    @Prop({ required: true, default: 0 })
    @IsNumber()
    @Min(0)
    stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Product & Document;