import { ShopProductList } from "@/app/search/search.type";
import { ProductCardProps } from "@/components/ProductCard/ProductCard.type"
import { parseCorrectPrice } from "./price";

const shopToIndexMapping: {[shop: string]: number} = {
    'FairPrice': 0,
    'Cold Storage': 1,
    'Sheng Siong': 2,
}

export const flattenShopProductList = (shopProductList: ShopProductList): Array<ProductCardProps> => {
    return Object.entries(shopProductList).flatMap(([key, shop]) => {
        if (shop.length === 0) {
            return [];
        }
        let id = 0;
        return shop.map((product) => {
            id++;
            return {
                id: id,
                ...product,
            };
        });
    });
}

export const flattenShopProductListDefault = (shopProductList: ShopProductList, shopCountProducts: Array<number>, productRankInShop: {[shop: string]: {[product: string]: number}}): Array<ProductCardProps> => {
    return Object.entries(shopProductList).flatMap(([key, shop]) => {
        shopCountProducts.push(shop.length);
        if (shop.length === 0) {
            return [];
        }
        let rank: number = 1
        return shop.map((product) => {
            if (!productRankInShop[product.shop]) {
                productRankInShop[product.shop] = {}
            }
            productRankInShop[product.shop][product.name] = rank;
            rank++;
            return {
                id: rank - 1,
                ...product,
            };
        });
    });
}

export const sortProductsDefault = (shopProductList: ShopProductList): Array<ProductCardProps> => {
    const shopCountProducts: Array<number> = [];
    const productRankInShop: {[shop: string]: {[product: string]: number}} = {};
    const products = flattenShopProductListDefault(shopProductList, shopCountProducts, productRankInShop);
    if (products.length === 0) {
        return [];
    }
    const determineRank = (product: ProductCardProps): number => {
        const productCount = shopCountProducts[shopToIndexMapping[product.shop]]
        return productRankInShop[product.shop][product.name] / productCount;
    }
    products.sort((first: ProductCardProps, second: ProductCardProps) => {
        return determineRank(first) - determineRank(second)
    });
    return products;
}

export const sortProductsPrice = (shopProductList: ShopProductList, order: string) => {
    const products = flattenShopProductList(shopProductList);
    if (products.length === 0) {
        return [];
    }
    if (order === 'price-high') {
        products.sort((first: ProductCardProps, second: ProductCardProps) => {
            return parseCorrectPrice(second.price, second.shop) - parseCorrectPrice(first.price, first.shop);
        });
    } else {
        products.sort((first: ProductCardProps, second: ProductCardProps) => {
            return parseCorrectPrice(first.price, first.shop) - parseCorrectPrice(second.price, second.shop);
        });
    }
    return products;
}