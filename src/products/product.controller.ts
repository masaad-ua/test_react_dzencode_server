import {Controller, Get, Injectable, Param, ParseIntPipe, Query} from "@nestjs/common";
import {ProductsService} from "./products.service";

@Controller("products")
export class ProductController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll(@Query("type") type?: string){
        return this.productsService.findAll(type)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }
}


