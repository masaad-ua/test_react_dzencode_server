import {Injectable, NotFoundException} from "@nestjs/common";
import {OrdersRepository} from "./repository/orders.repository";
import {ProductsRepository} from "../products/repository/products.repository";
import {products} from "../products/data/products.data";

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productsRepository: ProductsRepository
    ){}

    findAll(page = 1, limit = 20) {
        const orders = this.ordersRepository.findAll();

        const start = (page - 1) * limit;
        const end = start + limit;

        const items = orders.slice(start, end).map((order) => {
            const products =  this.productsRepository.findByOrderId(order.id);

            return  {
                ...order,
                products,
                productsCount: products.length,
                totalUSD: products.reduce((sum, product)=> sum + product.price[0].value, 0),
                totalUAH: products.reduce((sum, product)=> sum + product.price[1].value, 0),
            }
    });

        return {
            data: items,
            pagination: {
                page,
                limit,
                total: orders.length,
                totalPages: Math.ceil(orders.length / limit),
                hasNextPage: end < orders.length,
            },
        };
    }

    findOne(id: number) {
        const order = this.ordersRepository.findById(id)

        if (!order) {
            throw new NotFoundException(`Order with id ${id} not found`);
        }
        return {
            ...order,
            products: this.productsRepository.findByOrderId(id)
        };
    }

    remove(id: number){
        const deleted = this.ordersRepository.delete(id);

        if(!deleted){
            throw new NotFoundException(`Order with id ${id} not found`);
        }

        return {
            message: 'Order deleted successfully',
        };
    }


}