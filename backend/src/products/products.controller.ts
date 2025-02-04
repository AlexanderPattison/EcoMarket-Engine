import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.schema';

@Controller('api/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Post()
    async createProduct(@Body() product: Partial<Product>): Promise<Product> {
        return this.productsService.create(product);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Partial<Product>): Promise<Product> {
        return this.productsService.update(id, product);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<Product> {
        return this.productsService.delete(id);
    }
}