import {Controller, Delete, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {OrdersService} from "./orders.service";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 20,
    ) {
        return this.ordersService.findAll(
            Number(page),
            Number(limit),
        );
    }

    @Get(":id")
    findOne(
        @Param("id", ParseIntPipe) id: number
    ){
        return this.ordersService.findOne(id);
    }
    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.ordersService.remove(id);
    }
}