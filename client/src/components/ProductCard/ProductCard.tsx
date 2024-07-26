import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductCardProps } from './ProductCard.type'
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { addProduct, removeProduct } from '@/redux/features/ShoppingListModal.slice';
import { parseCorrectPrice } from '@/utils/price';
import { ShoppingListProducts } from '../ShoppingListModal/ShoppingListModal.type';

const ProductCard = (productProps: ProductCardProps) => {
    const [imgURI, setImgURI] = useState<string>("");
    const { id, name, price, images, offers, units, stock, url, shop } = productProps;
    const key: string = `${shop}-${name}-${id}`
    const productsInCart: ShoppingListProducts = useAppSelector((state: RootState) => JSON.parse(state.shoppingListProducts.value));
    console.log(productsInCart)
    const isAdded = productsInCart && key in useAppSelector((state: RootState) => JSON.parse(state.shoppingListProducts.value));
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
      dispatch(addProduct(JSON.stringify(productProps)));
    }

    const handleRemoveProduct = () => {
      dispatch(removeProduct(JSON.stringify(productProps)));
    }

    return (
      <div className='w-[256px] m-5 space-y-3'>
        <Card className='h-[360px] w-full flex flex-col justify-start items-center'>
          {imgURI === "" ? (
            <Skeleton className="h-[150px] w-[200px] my-2 rounded-xl" />
          ) : (
            <Image src={imgURI} alt="Product Image" height="150" width="150" className='mt-2' />
          )}
          <CardHeader className='w-full mt-[-12px]'>
            <CardTitle className='h-12 text-base line-clamp-2'>{name}</CardTitle>
            <CardDescription className='h-5 text-sm'>{units}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='font-semibold'>Price: ${parseCorrectPrice(price, shop)}</p>
            {/* {offers ? (
              offers.map((offer) => {
                return <p>{offer}</p>
              })
            ) : (
                <p>No Offers</p>
            )} */}
          </CardContent>
          <CardFooter>
            <p>{shop}</p>
          </CardFooter>
        </Card>
        {isAdded ? (
          <div className='w-full flex flex-row space-x-2'>
            <button onClick={() => handleRemoveProduct()} className='px-2 border-2 border-gray-100 shadow-sm text-xl text-red-500'>-</button>
            <button className='w-full py-1 border-2 border-gray-100 shadow-sm text-lg'>{productsInCart[key].count}</button>
            <button onClick={() => handleAddProduct()} className='px-2 border-2 border-gray-100 shadow-sm text-xl text-green-500'>+</button>
          </div>
        ) : (
          <button onClick={() => handleAddProduct()} className='w-full py-1 border-2 border-gray-100 shadow-sm text-lg'>Add Product</button>
        )}
      </div>
  )
}

export default ProductCard
