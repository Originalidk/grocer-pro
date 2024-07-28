'use client';

import './ProductList.css';
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { ProductListProps } from './ProductList.type';
import SortProductsDropDown from './SortProductsDropDown/SortProductsDropDown';
import { SortProductDropDownProp } from './SortProductsDropDown/SortProductsDropDown.type';

const ProductList = (props: ProductListProps) => {
  const { search, products, selectedSort, setSelectedSort } = props;
  const sortProductsProp: SortProductDropDownProp = {
    selectedSort: selectedSort,
    setSelectedSort: setSelectedSort,
  }
  return (
    <div className='product-list-width flex flex-col ml-[256px] mt-2 p-10'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h3 className='text-xl font-semibold'>Search Results For: <span>{search}</span></h3>
        <SortProductsDropDown {...sortProductsProp} />
      </div>
      <div className='w-full flex flex-row flex-wrap mt-5'>
        {products.map((product) => {
          return (
          <ProductCard key={`${product.shop}-${product.name}-${product.units}-${product.price}-${product.images[0]}`} {...product} />
        )})}
      </div>
    </div>
  )
}

export default ProductList
