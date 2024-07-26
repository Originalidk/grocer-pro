import { ProductCardProps } from "@/components/ProductCard/ProductCard.type";

export const filterSuperMarket = (products: Array<ProductCardProps>, checkSuperMarket: {[shop: string]: boolean}): Array<ProductCardProps> => {
    return products.filter((product) => {
        return checkSuperMarket[product.shop];
    });
}