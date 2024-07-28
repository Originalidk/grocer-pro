import React, { useState } from 'react'
import { ShoppingListContentProp } from './ShoppingListContent.type';
import { useAppDispatch } from '@/redux/hooks';
import { ProductCardProps } from '@/components/ProductCard/ProductCard.type';
import { addProduct, removeProduct } from '@/redux/features/ShoppingListModal.slice';
import { parseCorrectPrice } from '@/utils/price';
import Image from 'next/image';
import axios from 'axios';
import ShoppingListItem from './ShoppingListItem/ShoppingListItem';

function ShoppingListContent(props: ShoppingListContentProp) {
    const { productsInCart, totalPrice, tabFilter } = props;

  return (
    <div className='max-h-[620px] w-full'>
      <div className='max-h-[555px] w-full flex flex-col space-y-2 overflow-auto'>
        {Object.entries(productsInCart)
          .filter(([key, value]) => tabFilter === 'total' || value.product.shop === tabFilter)
          .map(([key, value]) => {
            const { name, price, images, offers, units, stock, url, shop } = value.product;
            return (
              <ShoppingListItem { ...value } key={`${shop}-${name}-${units}-${price}-${images[0]}`} />
            )
          })
        }
      </div>
      <div className='h-[65px] w-full flex flex-row justify-between items-center'>
        <h4 className='text-left text-lg font-semibold'>Total:</h4>
        <p className='w-[124px] text-left text-base truncate'>${totalPrice}</p>
      </div>
    </div>
  )
}

export default ShoppingListContent