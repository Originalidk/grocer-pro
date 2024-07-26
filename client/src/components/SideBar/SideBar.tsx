'use-client'

import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  BookA,
  CircleDollarSign,
} from 'lucide-react';
import CoinIcon from "@/../public/coin.svg";
import DefaultIcon from "@/../public/default-alphabet.svg";
import { SideBarProp } from "./SideBar.type";

export function Sidebar(props: SideBarProp) {
  const { checkSuperMarket, setCheckSuperMarket } = props;

  const handleCheckboxChange = (shop: string) => {
    setCheckSuperMarket({
      ...checkSuperMarket,
      [shop]: !checkSuperMarket[shop],
    })
  }
  return (
    <div className="h-[90vh] w-[256px] pb-12 shadow z-10 fixed">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="px-2 text-2xl font-semibold">
            Supermarket
          </h2>
          <hr className='h-px w-full mt-2 mb-4 bg-gray-300 border-0' />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fairprice"
                checked={checkSuperMarket.FairPrice}
                onCheckedChange={() => handleCheckboxChange('FairPrice')} />
              <label
                htmlFor="fairprice"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                FairPrice
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="cold-storage"
                checked={checkSuperMarket['Cold Storage']}
                onCheckedChange={() => handleCheckboxChange('Cold Storage')} />
              <label
                htmlFor="cold-storage"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Cold Storage
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sheng-siong"
                checked={checkSuperMarket['Sheng Siong']}
                onCheckedChange={() => handleCheckboxChange('Sheng Siong')} />
              <label
                htmlFor="sheng-siong"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sheng Siong
              </label>
            </div>
          </div>
        </div>
        {false && <div className="px-3 py-2">
          <h2 className="px-2 text-2xl font-semibold">
            Sort
          </h2>
          <hr className='h-px w-full mt-2 mb-4 bg-gray-300 border-0' />
          <div className="space-y-1">
            <button className="w-full flex flex-row justify-start items-center space-x-2">
              <BookA width='16' className="mr-2" />
              {/* <Image src={DefaultIcon} alt='coin' width='16' className="mr-2" /> */}
              <label>Default</label>
            </button>
            <button className="w-full flex flex-row justify-start items-center space-x-2">
              <CircleDollarSign width='16' className="mr-2" />
              {/* <Image src={CoinIcon} alt='coin' width='16' className="mr-2" /> */}
              <label>Price</label>
            </button>
          </div>
        </div>}
      </div>
    </div>
  )
}