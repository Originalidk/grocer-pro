export type ShengSiongProduct = {
    name: string,
    brand: string,
    price: number,
    imgKey: string,
    associatedPromoRules: { [any: string]: { label: string } },
    packSize: string,
    isSoldOut: boolean,
}