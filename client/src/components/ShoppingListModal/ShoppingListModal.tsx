'use client'
import { addProduct, closeShoppingList, removeProduct } from '@/redux/features/ShoppingListModal.slice';
import { useAppCreateSelector, useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from 'react'
import { parseCorrectPrice } from '@/utils/price';
import { ShoppingListProducts } from './ShoppingListModal.type';
import ShoppingListContent from './ShoppingListContent/ShoppingListContent';

const ShoppingListModal = () => {
    const [tabFilter, setTabFilter] = useState<string>("total");
    const totalPrice: number = useAppSelector(useAppCreateSelector([(state: RootState) => state.shoppingListProducts.value],
      ((productsInCart) => {
        return Object.entries(productsInCart).filter(([key, value]) => {
          return tabFilter === 'total' || tabFilter === value.product.shop
        })
        .reduce((total, [key, value]) => {
          const { name, price, images, offers, units, stock, url, shop } = value.product;
          return Math.round((total + parseCorrectPrice(price, shop) * value.count) * 100) / 100;
        }, 0)
      })
    ));
    const showShoppingList = useAppSelector((state: RootState) => state.showShoppingList.value);
    const productsInCart: ShoppingListProducts = useAppSelector((state: RootState) => state.shoppingListProducts.value);
    const dispatch = useAppDispatch();

  return (
    <>
      {showShoppingList && (
        <div className='h-[100vh] w-[100vw] flex justify-center items-center z-30 fixed'>
          <div className='h-full w-full bg-gray-400 opacity-40 fixed'></div>
          <div className='h-[800px] w-[1200px] flex flex-col items-center bg-white z-40 fixed'>
            <button onClick={() => dispatch(closeShoppingList())} className='text-xl absolute top-1 right-2'>X</button>
            <h3 className='text-5xl font-semibold my-5'>Shopping List</h3>
            <Tabs value={tabFilter} onValueChange={(value) => setTabFilter(value)} className="w-[1100px] my-5">
              <TabsList>
                <TabsTrigger value="total">Total</TabsTrigger>
                <TabsTrigger value="FairPrice">FairPrice</TabsTrigger>
                <TabsTrigger value="Cold Storage">Cold Storage</TabsTrigger>
                <TabsTrigger value="Sheng Siong">Sheng Siong</TabsTrigger>
              </TabsList>
              <TabsContent value="total" className='max-h-[620px] w-full'>
                {Object.entries(productsInCart).length > 0 ? (
                  <ShoppingListContent {...{productsInCart, totalPrice, tabFilter}} />
                ) : (
                  <div className='h-[620px] w-full flex flex-col justify-center'>
                    <p className='text-center'>No products.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="FairPrice" className='max-h-[620px] w-full'>
                {Object.entries(productsInCart).length > 0 ? (
                  <ShoppingListContent {...{productsInCart, totalPrice, tabFilter}} />
                ) : (
                  <div className='h-[620px] w-full flex flex-col justify-center'>
                    <p className='text-center'>No products.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="Cold Storage" className='max-h-[620px] w-full'>
                {Object.entries(productsInCart).length > 0 ? (
                  <ShoppingListContent {...{productsInCart, totalPrice, tabFilter}} />
                ) : (
                  <div className='h-[620px] w-full flex flex-col justify-center'>
                    <p className='text-center'>No products.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="Sheng Siong" className='max-h-[620px] w-full'>
                {Object.entries(productsInCart).length > 0 ? (
                  <ShoppingListContent {...{productsInCart, totalPrice, tabFilter}} />
                ) : (
                  <div className='h-[620px] w-full flex flex-col justify-center'>
                    <p className='text-center'>No products.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

          </div>
        </div>
      )}
    </>
  )
}

export default ShoppingListModal