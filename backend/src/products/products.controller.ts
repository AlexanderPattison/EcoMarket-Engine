import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ProductsService } from '@products/products.service';
import { Product, ProductDocument } from '@products/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Post()
    async createProduct(@Body() productDto: CreateProductDto): Promise<ProductDocument> {
        return this.productsService.create(productDto);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() productDto: UpdateProductDto): Promise<ProductDocument> {
        return this.productsService.update(id, productDto);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<ProductDocument> {
        return this.productsService.delete(id);
    }
}