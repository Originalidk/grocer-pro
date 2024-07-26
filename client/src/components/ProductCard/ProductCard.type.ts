export type ProductCardProps = {
    id: number,
    name: string,
    price: number,
    images: Array<string>,
    offers: Array<string> | null,
    units: string | null,
    stock: boolean,
    url: string,
    shop: string,
}