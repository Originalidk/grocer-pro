'use client'
import './NavBarSearch.css';
import React, { useState } from 'react';
import Image from 'next/image';
import CartLogoWhite from "../../../public/shopping-cart-logo-white.svg"
import { Input } from '@/components/ui/input';
import { NavBarSearchProps } from './NavBarSearch.type';
import { useAppDispatch } from '@/redux/hooks';
import { openShoppingList } from '@/redux/features/ShoppingListModal.slice';
import Link from 'next/link';

const NavBarSearch = (props: NavBarSearchProps) => {
  const [greenNavbar, setGreenNavbar] = useState<boolean>(false);

  const { search, setSearch, handleSearch } = props;
  const dispatch = useAppDispatch();
  
  const changeNavbarColor = () => {
      if ((window as any).scrollY >= 1) {
          setGreenNavbar(true);
      } else {
          setGreenNavbar(false);
      }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeNavbarColor);
  }

  return (
    <nav className={`h-[10vh] w-full flex flex-row justify-between items-center fixed z-20 ${greenNavbar && 'bg-green-700'}`}>
      <div className='h-full w-full flex flex-row justify-between items-center'>
        <div className="flex flex-row items-center ml-4">
          <Image src={CartLogoWhite} alt="Cart Logo" width={80} />
          <h1 className="ml-2 text-3xl font-bold text-white">Grocer Pro</h1>
        </div>
        <div className='flex flex-row items-center ml-5'>
          <Input type='text' placeholder='Search...' value={search} onChange={(event) => setSearch(event.target.value)} className='h-[40px] w-[300px] fade-in-animation' />
          <button onClick={() => handleSearch()} className="ml-2 border-2 py-2 px-4 rounded-lg text-sm text-white hover:bg-white hover:border-green-900 hover:text-green-700 fade-in-animation">Search</button>
        </div>
        <div className='h-full w-[45%] flex flex-row justify-center items-center'>
          <div className='h-full w-3/4 flex flex-row justify-between items-center text-lg text-white'>
            <Link href='/' className="cursor-pointer">Home</Link>
            <Link href='search' className="cursor-pointer">Search</Link>
            <div>Support</div>
            <a onClick={() => dispatch(openShoppingList())} className="cursor-pointer">Cart</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBarSearch
