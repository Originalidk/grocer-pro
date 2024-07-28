import { useEffect, useRef, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ProductCardProps } from './ProductCard.type'
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image';
import axios from 'axios';
import { useAppDispatch, useAppSelector, useAppStore } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { addProduct, removeProduct } from '@/redux/features/ShoppingListModal.slice';
import { parseCorrectPrice } from '@/utils/price';
import { Info } from 'lucide-react';

const ProductCard = (productProps: ProductCardProps) => {
    const [imgURI, setImgURI] = useState<string>("");
    let offerIndex = 0;
    const { name, price, images, offers, units, stock, url, shop } = productProps;
    const key: string = `${shop}-${name}-${units}-${price}-${images[0]}`
    const productsInCart: number = useAppSelector((state: RootState) => {
      const shoppingCart = state.shoppingListProducts.value
      if (key in shoppingCart) {
        return shoppingCart[key].count;
      }
      return 0;
    })
    const dispatch = useAppDispatch();

    useEffect(() => {
      setImage()
    }, []);

    const setImage = async () => {
      setImgURI(
        shop !== 'Sheng Siong' ? images[0] : (
          URL.createObjectURL(
            (await axios.get<Blob>(`http://localhost:3001/markets/shengshiong/img/${images[0]}`, {
              responseType: 'blob',
            })).data
          )
        )
      );
    }

    const handleAddProduct = () => {
      dispatch(addProduct(productProps));
    }

    const handleRemoveProduct = () => {
      dispatch(removeProduct(productProps));
    }

    return (
      <div className='w-[256px] m-5 space-y-3'>
        <Card className='h-[360px] w-full flex flex-col justify-start items-center'>
          <div className='h-[150px] w-full flex flex-col justify-start items-center relative'>
            {imgURI === "" ? (
              <Skeleton className="h-full w-[200px] my-2 rounded-xl" />
            ) : (
              <Image src={imgURI} alt="Product Image" height="150" width="150" className='mt-2' />
            )}
              <Sheet>
                <SheetTrigger>
                  <Info color='gray' className='top-1 right-1 absolute' />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className='text-xl'>{name}</SheetTitle>
                    <SheetTitle className='text-lg text-gray-500'>{units}</SheetTitle>
                    <div className='space-y-2'></div>
                      {(offers && offers.length > 0) ? (
                        <div>
                          <SheetDescription>List of offers:</SheetDescription>
                          {offers.map((offer) => {
                            offerIndex++;
                            return (
                              <SheetDescription key={`${offer}-${offerIndex}`}>{offerIndex}&#41; {offer}</SheetDescription>
                            )
                          })}
                        </div>
                      ) : (
                        <SheetDescription>No Offers.</SheetDescription>
                      )}
                    <SheetDescription>
                      <button onClick={() => window.open(url, '_blank')} className='w-1/2 mt-5 py-1 border-2 border-gray-600 text-lg text-black cursor-pointer'>View Product</button>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            {!stock && (
              <div className='w-[200px] flex flex-col justify-center items-center bottom-[-8px] bg-gray-100 opacity-75 absolute'>
                <p className='text-red-700 font-semibold'>Out Of Stock</p>
              </div>
            )}
          </div>
          <CardHeader className='w-full mt-[-12px]'>
            <CardTitle className='h-12 text-base line-clamp-2'>{name}</CardTitle>
            <CardDescription className='h-5 text-sm'>{units}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='font-semibold'>Price: ${parseCorrectPrice(price, shop)}</p>
          </CardContent>
          <CardFooter>
            <p>{shop}</p>
          </CardFooter>
        </Card>
        {productsInCart > 0 ? (
          <div className='w-full flex flex-row space-x-2'>
            <button onClick={() => handleRemoveProduct()} className='px-2 border-2 border-gray-100 shadow-sm text-xl text-red-500'>-</button>
            <button className='w-full py-1 border-2 border-gray-100 shadow-sm text-lg'>{productsInCart}</button>
            <button onClick={() => handleAddProduct()} className='px-2 border-2 border-gray-100 shadow-sm text-xl text-green-500'>+</button>
          </div>
        ) : (
          <button onClick={() => handleAddProduct()} className='w-full py-1 border-2 border-gray-100 shadow-sm text-lg cursor-pointer'>Add Product</button>
        )}
      </div>
  )
}

export default ProductCard
