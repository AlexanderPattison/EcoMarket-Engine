import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '@products/product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async create(product: Partial<Product>): Promise<Product> {
        const newProduct = new this.productModel(product);
        return newProduct.save();
    }

    async update(id: string, product: Partial<Product>): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    async delete(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id).exec();
    }
}