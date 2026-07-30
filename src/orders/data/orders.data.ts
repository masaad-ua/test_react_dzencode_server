import {Data} from "../../shared/data";
import {ProductDataI, ProductsDate} from "../../products/data/products.data";

export interface OrderDataI {
    id: number;
    title: string;
    created_at: Date;
    description: string;
}

class OrdersDate extends Data<OrderDataI>{
    constructor(amount: number, startId: number) {
        super(amount, startId)
    }

    public createOrders(year: number){
        let i = 0
        while ( i <= this.amount ){
            this.items.push({
                id: this.startId++,
                title: this.getTitle(),
                created_at: this.getRandomDateInYear(year),
                description: "",
            })
            ++i
        }
    }

    private getTitle(): string {
        if(this.startId % 2){
            return "Длинное название прихода"
        }
        else {
            return "Длинное предлинное длинючее название прихода"
        }
    }

}

const orderDate: OrdersDate = new OrdersDate(25, 1);
orderDate.createOrders(2017)
export const orders: OrderDataI[] = orderDate.items;

