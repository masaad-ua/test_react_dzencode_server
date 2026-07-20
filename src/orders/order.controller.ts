import {Controller, Delete, Get, Param, ParseIntPipe} from "@nestjs/common";
import {OrdersService} from "./orders.service";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    findAll(){
        return this.ordersService.findAll();
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