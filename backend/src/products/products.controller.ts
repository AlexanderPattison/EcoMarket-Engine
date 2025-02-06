// backend/src/products/products.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from '@products/products.service';

@Controller('api/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getProducts(
        @Query('page') page = 1,
        @Query('limit') limit = 5
    ) {
        const skip = (page - 1) * limit;
        return this.productsService.findAll(limit, skip);
    }
}