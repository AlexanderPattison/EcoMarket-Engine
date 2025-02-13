import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.schema';

@Controller('api/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getProducts(
        @Query('page') page = 1,
        @Query('limit') limit = 5,
        @Query('sortBy') sortBy: string = 'name',
        @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
    ) {
        const skip = (page - 1) * limit;
        return this.productsService.findAll(limit, skip, sortBy, sortOrder);
    }

    @Post()
    async createProduct(@Body() productData: Partial<Product>) {
        return this.productsService.createProduct(productData);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() productData: Partial<Product>) {
        return this.productsService.updateProduct(id, productData);
    }
}