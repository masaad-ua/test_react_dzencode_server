import { Module } from '@nestjs/common';
import {OrdersRepository} from "./repository/orders.repository";
import {OrdersService} from "./orders.service";
import {OrdersController} from "./order.controller";
import {ProductsRepository} from "../products/repository/products.repository";

@Module({
    providers: [OrdersRepository, OrdersService, ProductsRepository],
    controllers: [OrdersController],
    exports: [OrdersRepository]
})
export class OrdersModule {}
