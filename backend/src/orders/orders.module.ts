import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from '../orders/orders.controller';
import { OrdersService } from '../orders/orders.service';
import { Order, OrderSchema } from '../orders/order.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule { }