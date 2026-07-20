import {Injectable} from "@nestjs/common";
import {ProductDataI, products} from "../data/products.data";

@Injectable()
export class ProductsRepository {
    private readonly products = products;

    findAll(): ProductDataI[]{
        return this.products;
    }

    findById(id: number): ProductDataI | undefined {
        return this.products.find((product) => product.id === id);
    }

    findByOrderId(orderId: number): ProductDataI[]{
        return this.products.filter(
            (product) => product.order === orderId,
        );
    }

    findByType(type: string): ProductDataI[] {
        return this.products.filter(
            (product) => product.type === type,
        )
    }
}