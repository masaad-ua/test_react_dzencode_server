import {Injectable, NotFoundException} from "@nestjs/common";
import {OrdersRepository} from "./repository/orders.repository";
import {ProductsRepository} from "../products/repository/products.repository";

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productsRepository: ProductsRepository
    ){}

    findAll(){
        return this.ordersRepository.findAll().map((order) => ({
            ...order,
            products: this.productsRepository.findByOrderId(order.id)
        }));
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