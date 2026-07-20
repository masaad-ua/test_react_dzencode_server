import {Injectable, NotFoundException} from "@nestjs/common";
import {OrdersRepository} from "../orders/repository/orders.repository";
import {ProductsRepository} from "./repository/products.repository";


@Injectable()
export class ProductsService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productsRepository: ProductsRepository
    ){}

    findAll(type?: string){
        if(type){
            return this.productsRepository.findByType(type);
        }
        return this.productsRepository.findAll();
    }

    findOne(id: number) {
        const product = this.productsRepository.findById(id)

        if (!product) {
            throw new NotFoundException(`Order with id ${id} not found`);
        }
        return product;
    }



}