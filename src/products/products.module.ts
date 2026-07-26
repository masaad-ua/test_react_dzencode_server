import { Module } from '@nestjs/common';
import {OrdersRepository} from "../orders/repository/orders.repository";
import {ProductsRepository} from "./repository/products.repository";
import {ProductsService} from "./products.service";
import {ProductController} from "./product.controller";

@Module({
    providers: [ProductsRepository, ProductsService, ProductsRepository, OrdersRepository],
    controllers: [ProductController],
    exports: [ProductsRepository]
})
export class ProductsModule {}
