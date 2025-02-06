// backend/src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '@products/product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async findAll(limit: number, skip: number): Promise<{ products: ProductDocument[], count: number }> {
        const [products, count] = await Promise.all([
            this.productModel.find().limit(limit).skip(skip).exec(),
            this.productModel.countDocuments().exec()
        ]);
        return { products, count };
    }
}