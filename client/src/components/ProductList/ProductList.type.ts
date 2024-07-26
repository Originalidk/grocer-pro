import { ProductCardProps } from '../ProductCard/ProductCard.type'

export type ProductListProps = {
    search: string;
    products: Array<ProductCardProps>;
    selectedSort: string;
    setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
}