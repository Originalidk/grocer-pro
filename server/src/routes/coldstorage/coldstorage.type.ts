export type ColdStorageProduct = {
    sku: number,
    wareName: string,
    warePrice: string,
    wareImg: string,
    promotionWareVO: ProductPromo,
    wareStatus: number // 1 is out of stock, 0 have stock
}

export type ProductPromo = {
    promotionInfoList: Array<ProductInfo>
}

export type ProductInfo = {
    displayInfo: { proTag: string }
}