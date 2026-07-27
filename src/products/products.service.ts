import {Injectable, NotFoundException} from "@nestjs/common";
import {OrdersRepository} from "../orders/repository/orders.repository";
import {ProductsRepository} from "./repository/products.repository";


@Injectable()
export class ProductsService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productsRepository: ProductsRepository
    ){}

    findAll(type?: string, page = 1, limit = 20){
        let products;
        if(type){
            products = this.productsRepository.findByType(type);
        }
        else {
            products = this.productsRepository.findAll();
        }

        const start = (page - 1) * limit;
        const end = start + limit;

        const items = products.slice(start, end).map((product) => ({
            ...product,
        }));

        return {
            data: items,
            pagination: {
                page,
                limit,
                total: products.length,
                totalPages: Math.ceil(products.length / limit),
                hasNextPage: end < products.length,
            },
        };
    }

    findOne(id: number) {
        const product = this.productsRepository.findById(id)

        if (!product) {
            throw new NotFoundException(`Order with id ${id} not found`);
        }
        return product;
    }



}