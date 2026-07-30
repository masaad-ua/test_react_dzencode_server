import {orders} from "../../orders/data/orders.data";
import {Data} from "../../shared/data";

export interface ProductGuaranteeI {
    start: Date,
    end: Date,
}

export interface ProductPriceI {
    value: number,
    symbol: string,
    isDefault: number
}

export interface ProductDataI {
    id: number;
    serialNumber: number,
    isNew: number,
    status: number,
    photo: string,
    title: string,
    series: string,
    type: string,
    specification: string,
    guarantee: ProductGuaranteeI
    price: ProductPriceI[],
    orderId: number,
    created_at: Date,
}

export class ProductsDate extends Data<ProductDataI>{
    constructor(amount: number, startId: number) {
        super(amount, startId)
    }

    public createProducts(year: number, yearStart: number, yearEnd: number){
        let i = 0
        orders.forEach((order) =>{
            let i = 0
            while ( i <= this.amount ){
                const {title, series, type} = this.getProductDescription();
                this.items.push({
                    id: this.startId++,
                    serialNumber: 1235,
                    isNew: this.getCondition(),
                    status: this.getStatus(),
                    photo: '',
                    title: title,
                    series: series,
                    type: type,
                    specification: 'Specification 1',
                    guarantee: {
                        start: this.getRandomDateInYear(yearStart),
                        end: this.getRandomDateInYear(yearEnd)
                    },
                    price: [
                        {value: this.getValueForPrice(), symbol: 'USD', isDefault: 0},
                        {value: this.getValueForPrice(), symbol: 'UAH', isDefault: 1}
                    ],
                    orderId: order.id,
                    created_at: this.getRandomDateInYear(year),
                })
                ++i
            }
        })

    }

    private getProductDescription(): {
        title: string,
        series: string,
        type: string
    }  {
        if (this.startId % 2 === 0){
            return {
                title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
                series: "SN-12.3456789",
                type: 'Monitor',
            }
        }
        else if (this.startId % 3 === 0){
            return {
                title: 'HP LaserJet Pro M404dn',
                series: 'SN-98.7654321',
                type: 'Printer',
            }
        }
        else if (this.startId % 7 === 0){
            return {
                title: 'Lenovo ThinkPad T14 Gen 3',
                series: 'SN-82.7654321',
                type: 'Laptop',
            }
        }
        else {
            return {
                title: 'Microsoft Ergonomic Keyboard',
                series: 'SN-43.9012345',
                type: 'Keyboard',
            }
        }
    }

    private getStatus(): number{
        if(this.startId % 2 === 1){
            return 1
        }
        else {
            return 0
        }
    }

    private getCondition(): number {
        if(this.startId % 3 === 0){
            return 1
        }
        else {
            return 0
        }
    }

    private getValueForPrice(): number {
        return Math.floor( Math.random() * (4901)) + 100
    }
}

const productDate: ProductsDate = new ProductsDate(20, 10)
productDate.createProducts(2017, 2017, 2025);
export const products: ProductDataI[] = productDate.items;