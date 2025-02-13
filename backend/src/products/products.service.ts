import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async findAll(limit: number, skip: number, sortBy: string = 'name', sortOrder: 'asc' | 'desc' = 'asc', category?: string, priceRanges?: string[], search?: string): Promise<{ products: ProductDocument[], count: number }> {
        const validSortFields = ['name', 'price', 'createdAt'];
        let sortField = validSortFields.includes(sortBy) ? sortBy : 'name';

        const sort: { [key: string]: number } = {};
        sort[sortField] = sortOrder === 'asc' ? 1 : -1;

        let query = this.productModel.find();
        if (category) {
            query = query.where('category').equals(category);
        }

        if (priceRanges && priceRanges.length > 0) {
            const conditions = priceRanges.map(range => {
                if (range === 'under20') return { price: { $lt: 20 } };
                if (range === '20to50') return { price: { $gte: 20, $lt: 50 } };
                if (range === 'above50') return { price: { $gte: 50 } };
                return {};
            });
            query = query.or(conditions);
        }

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query = query.or([
                { name: { $regex: searchRegex } },
            ]);
        }

        const [products, count] = await Promise.all([
            query.sort(sort as any).limit(limit).skip(skip).exec(),
            this.productModel.countDocuments(query.getFilter()).exec()
        ]);
        return { products, count };
    }

    async createProduct(productData: Partial<Product>): Promise<ProductDocument> {
        const newProduct = new this.productModel(productData);
        return await newProduct.save();
    }

    async updateProduct(id: string, productData: Partial<Product>): Promise<ProductDocument | null> {
        return await this.productModel.findByIdAndUpdate(id, productData, { new: true }).exec();
    }

    async getCategories(): Promise<string[]> {
        const categories = await this.productModel.distinct('category');
        return categories.map((category) => String(category));
    }
}