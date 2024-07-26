export type ProductInfo = {
    name: string,
    price: number,
    images: Array<string>,
    offers: Array<string> | null,
    units: string | null,
    stock: boolean,
    url: string,
    shop: string,
}

export type MarketResults = {
    [any: string]: Array<ProductInfo> | IError
}

export type IError = {
    status: number,
    message: string,
    error?: string,
}