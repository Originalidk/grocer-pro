import '../ProductList.css';
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardLoading from '../../ProductCard/ProductCardLoading';
import { ProductListLoadingProp } from './ProductListLoading.type';

const ProductListLoading = (props: ProductListLoadingProp) => {
  const { productsPerPage } = props;
  const products = Array.from({ length: productsPerPage }, (_, index) => index);
  return (
      <div className='product-list-width flex flex-col ml-[256px] mt-2 p-10'>
        <div className='w-full flex flex-row justify-between items-center'>
          <Skeleton className='h-10 w-64 rounded-full' />
          <Skeleton className='h-10 w-[200px] rounded-md' />
        </div>
        <div className='w-full flex flex-row flex-wrap mt-5'>
          {products.map((product) => (
            <ProductCardLoading key={product} />
          ))}
        </div>
      </div>
    )
}

export default ProductListLoading