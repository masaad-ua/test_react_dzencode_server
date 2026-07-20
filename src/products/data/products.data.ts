export interface ProductGuaranteeI {
    start: string,
    end: string,
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
    photo: string,
    title: string,
    type: string,
    specification: string,
    guarantee: ProductGuaranteeI
    price: ProductPriceI[],
    order: number,
    date: string,
}

export const products: ProductDataI [] = [
    {
        id: 1,
        serialNumber: 1234,
        isNew: 1,
        photo: '',
        title: 'Product 1',
        type: 'Monitors',
        specification: 'Specification 1',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2017-06-29 12:09:33'
        },
        price: [
            {value: 100, symbol: 'USD', isDefault: 0},
            {value: 2600, symbol: 'UAH', isDefault: 1}
        ],
        order: 1,
        date: '2017-06-29 12:09:33'
    },
    {
        id: 2,
        serialNumber: 1234,
        isNew: 1,
        photo: '',
        title: 'Product 1',
        type: 'Monitors',
        specification: 'Specification 1',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2017-06-29 12:09:33'
        },
        price: [
            {value: 100, symbol: 'USD', isDefault: 0},
            {value: 2600, symbol: 'UAH', isDefault: 1}
        ],
        order: 2,
        date: '2017-06-29 12:09:33'
    }
];