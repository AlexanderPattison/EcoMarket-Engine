import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '@orders/order.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }

    async createOrder(user: string, products: string[], totalPrice: number): Promise<Order> {
        const newOrder = new this.orderModel({ user, products, totalPrice });
        return newOrder.save();
    }

    async findOrdersByUser(userId: string): Promise<Order[]> {
        return this.orderModel.find({ user: userId }).populate('products').exec();
    }

    async findOrderById(id: string): Promise<Order | null> {
        return this.orderModel.findById(id).populate('products').exec() as Promise<Order | null>;
    }
}