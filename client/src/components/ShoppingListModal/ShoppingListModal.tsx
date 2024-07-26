'use client'
import { closeShoppingList } from '@/redux/features/ShoppingListModal.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import { parseCorrectPrice } from '@/utils/price';
import { ShoppingListProducts } from './ShoppingListModal.type';

const ShoppingListModal = () => {
    const showShoppingList = useAppSelector((state: RootState) => state.showShoppingList.value);
    const productsInCart: ShoppingListProducts = useAppSelector((state: RootState) => JSON.parse(state.shoppingListProducts.value));
    const dispatch = useAppDispatch();
    console.log(productsInCart);
  return (
    <>
      {showShoppingList && (
        <div className='h-[100vh] w-[100vw] flex justify-center items-center z-30 fixed'>
          <div className='h-full w-full bg-gray-400 opacity-40 fixed'></div>
          <div className='h-[800px] w-[1200px] flex flex-col items-center bg-white z-40 fixed'>
            <button onClick={() => dispatch(closeShoppingList())} className='text-xl absolute top-1 right-2'>X</button>
            <h3 className='text-5xl font-bold my-5'>Shopping List</h3>
            <Tabs defaultValue="total" className="w-[1100px] my-5">
              <TabsList>
                <TabsTrigger value="total">Total</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
              </TabsList>
              <TabsContent value="total" className='max-h-[620px] w-full'>
                {Object.entries(productsInCart).length > 0 ? (
                  <div className='max-h-[620px] w-full flex flex-col space-y-2 overflow-auto'>
                    {Object.entries(productsInCart).map(([key, value]) => {
                      return (
                        <div key={`${value.product.shop}-${value.product.images[0]}-${value.product.id}`} className='h-16 w-full flex flex-row justify-between items-center py-2 px-4 border-t-2 border-black'>
                          <div className='w-[800px] text-start'>
                            <h4 className='truncate'>{value.product.name} &#40;{value.product.shop}&#41;</h4>
                            <p className='truncate'>{value.product.units}</p>
                          </div>
                          <div className='w-[200px] flex flex-row items-center'>
                            <button className='p-1 bg-black border-y-2 border-black text-white'>-</button>
                            <p className='py-1 px-4 border-y-2 border-black truncate'>{value.count}</p>
                            <button className='p-1 bg-black border-y-2 border-black text-white'>+</button>
                            <p className='ml-5 truncate'>${parseCorrectPrice(value.product.price, value.product.shop) * value.count}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className='text-center'>No products.</p>
                )}
              </TabsContent>
              <TabsContent value="compare">Change your password here.</TabsContent>
            </Tabs>

          </div>
        </div>
      )}
    </>
  )
}

export default ShoppingListModal