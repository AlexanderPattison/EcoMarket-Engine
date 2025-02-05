import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from '@orders/orders.service';
import { Order } from '@orders/order.schema';

@Controller('api/orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    async createOrder(@Body() orderData: { user: string; products: string[]; totalPrice: number }): Promise<Order> {
        return this.ordersService.createOrder(orderData.user, orderData.products, orderData.totalPrice);
    }

    @Get('user/:userId')
    async getOrdersByUser(@Param('userId') userId: string): Promise<Order[]> {
        return this.ordersService.findOrdersByUser(userId);
    }

    @Get(':id')
    async getOrderById(@Param('id') id: string): Promise<Order> {
        return this.ordersService.findOrderById(id);
    }
}