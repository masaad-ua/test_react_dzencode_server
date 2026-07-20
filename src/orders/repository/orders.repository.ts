import {Injectable} from "@nestjs/common";
import { orders, OrderData } from '../data/orders.data';

@Injectable()
export class OrdersRepository {
    private readonly orders = orders;

    findAll(): OrderData[]{
        return this.orders;
    }

    findById(id: number): OrderData | undefined {
        return this.orders.find((order) => order.id === id);
    }

    delete(id: number): boolean{
        const index = this.orders.findIndex((order) => order.id === id);

        if(index === -1){
            return false;
        }
        this.orders.splice(index, 1)
        return true;
    }

}