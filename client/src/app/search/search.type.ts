import { ProductCardProps } from "@/components/ProductCard/ProductCard.type"

export type ShopProductList = {
    'FairPrice': Array<ProductResponseAPI>,
    'Cold Storage': Array<ProductResponseAPI>,
    'Sheng Siong': Array<ProductResponseAPI>,
}

export type ProductResponseAPI = {
    name: string,
    price: number,
    images: Array<string>,
    offers: Array<string> | null,
    units: string | null,
    stock: boolean,
    url: string,
    shop: string,
}