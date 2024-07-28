import { ShoppingListProducts } from "../ShoppingListModal.type"

export type ShoppingListContentProp = {
    productsInCart: ShoppingListProducts;
    totalPrice: number;
    tabFilter: string;
}