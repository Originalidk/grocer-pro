import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { SortProductDropDownProp } from './SortProductsDropDown.type'
import Image from 'next/image'
import DefaultIcon from "@/../public/default-alphabet.svg";
import CoinIcon from "@/../public/coin.svg";

const SortProductsDropDown = (props: SortProductDropDownProp) => {
    const { selectedSort, setSelectedSort } = props

  return (
    <Select value={selectedSort} onValueChange={(value: string) => setSelectedSort(value)}>
      <SelectTrigger className="w-[200px] mr-10">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Products</SelectLabel>
          <SelectItem value="default">
            <div className='flex flex-row'>
                <Image src={DefaultIcon} alt='coin' width='16' className="mr-1" />
                <p>Default</p>
            </div>
          </SelectItem>
          <SelectItem value="price-low">
            <div className='flex flex-row'>
              <Image src={CoinIcon} alt='coin' width='16' className="mr-1" />
              <p>Price &#40;low to high&#41;</p>
            </div>
          </SelectItem>
          <SelectItem value="price-high">
            <div className='flex flex-row'>
              <Image src={CoinIcon} alt='coin' width='16' className="mr-1" />
              <p>Price &#40;high to low&#41;</p>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortProductsDropDown
