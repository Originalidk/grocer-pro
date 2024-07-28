import React, { useEffect, useState } from 'react'
import { ShoppingListItemProp } from './ShoppingListItem.type'
import axios from 'axios';
import { useAppDispatch } from '@/redux/hooks';
import { parseCorrectPrice } from '@/utils/price';
import { ProductCardProps } from '@/components/ProductCard/ProductCard.type';
import { addProduct, removeProduct } from '@/redux/features/ShoppingListModal.slice';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const ShoppingListItem = (props: ShoppingListItemProp) => {
    const [imgURI, setImgURI] = useState<string>("");
    const { name, price, images, offers, units, stock, url, shop } = props.product;
    const quantityPrice: number = parseCorrectPrice(price, shop) * props.count;
    let offerIndex = 0;
    const dispatch = useAppDispatch();

    const handleAddProduct = (product: ProductCardProps) => {
      dispatch(addProduct(product));
    }

    const handleRemoveProduct = (product: ProductCardProps) => {
      dispatch(removeProduct(product));
    }

    useEffect(() => {
        displayImage();
    }, []);

    const displayImage = async () => {
        setImgURI(shop !== 'Sheng Siong' ? images[0] : (
          URL.createObjectURL(
            (await axios.get<Blob>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/markets/shengshiong/img/${images[0]}`, {
              responseType: 'blob',
            })).data
          )
        ))
    }

    return (
      <div key={`${shop}-${name}-${units}-${price}-${images[0]}`} className='h-16 w-full flex flex-row justify-between items-center py-2 px-4 border-b-2 border-gray-300'>
        <div className='w-[800px] flex flex-row justify-start items-center'>
          {imgURI === "" ? (
            <Skeleton className='h-[60px] w-[60px] mr-4' />
          ) : (
            <Image src={imgURI} alt='Product Image' height='60' width='60' className='mr-4' />
          )}
          <div className='text-start'>
            <div className='flex flex-row items-center'>
              <h4 className='truncate'>{name} &#40;{shop}&#41;</h4>
                  {(offers && offers.length > 0) && (
                    <HoverCard>
                      <HoverCardTrigger>
                        <Info className='h-4 w-auto ml-2' />
                      </HoverCardTrigger>
                      <HoverCardContent className='bg-black text-white'>
                        <h5 className='text-lg'>Offers:</h5>
                        {offers.map((offer) => {
                          offerIndex++;
                          return (
                            <p key={`${offer}-${offerIndex}`}>{offerIndex}&#41; {offer}</p>
                          )
                        })}
                      </HoverCardContent>
                    </HoverCard>
                  )}
            </div>
            <p className='truncate'>{units}</p>
          </div>
        </div>
        <div className='w-[200px] flex flex-row items-center'>
          <button onClick={() => handleRemoveProduct(props.product)} className='p-1 bg-black border-y-2 border-black text-white'>-</button>
          <p className='py-1 px-4 border-y-2 border-black truncate'>{props.count}</p>
          <button onClick={() => handleAddProduct(props.product)} className='p-1 bg-black border-y-2 border-black text-white'>+</button>
          <p className='ml-5 truncate'>${Math.round(quantityPrice * 100) / 100}</p>
        </div>
      </div>
    )
}

export default ShoppingListItem