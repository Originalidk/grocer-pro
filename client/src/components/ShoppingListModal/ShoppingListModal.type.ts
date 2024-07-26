import { ProductCardProps } from "../ProductCard/ProductCard.type"

export type ShoppingListProducts = {
    [key: string]: ShoppingListProduct,
}

export type ShoppingListProduct = {
    product: ProductCardProps,
    count: number,
}