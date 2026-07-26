import {OrderDataI} from "../orders/data/orders.data";
import {ProductDataI} from "../products/data/products.data";

export class Data <T extends OrderDataI | ProductDataI>{
    public items: T [] = [];
    constructor(
        readonly amount: number,
        protected startId: number,
    ) {}

    protected getRandomDateInYear(year: number): Date {
        const startTimestamp: number = new Date(year, 0, 1).getTime();
        const endTimestamp: number = new Date(year, 11,31).getTime()
        const randomTime: number = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
        return new Date(randomTime);
    }
}