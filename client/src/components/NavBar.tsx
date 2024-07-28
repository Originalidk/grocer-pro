'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import CartLogo from '../../public/shopping-cart-logo.svg';
import CartLogoWhite from "../../public/shopping-cart-logo-white.svg"
import { openShoppingList } from '../redux/features/ShoppingListModal.slice';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';

const NavBar = () => {
  const [greenNavbar, setGreenNavbar] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  
  const changeNavbarColor = () => {
      if ((window as any).scrollY >= 80) {
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
          {greenNavbar ? (
            <Image src={CartLogoWhite} alt="Cart Logo" width={80} />
          ) : (
            <Image src={CartLogo} alt="Cart Logo" width={80} />
          )}
          <h1 className={`ml-2 text-3xl font-bold ${greenNavbar ? 'text-white' : 'text-green-700'}`}>Grocer Pro</h1>
        </div>
        <div className='h-full w-[45%] flex flex-row justify-center items-center'>
          <div className='h-full w-3/4 flex flex-row justify-between items-center text-lg text-white'>
            <Link href='/' className="cursor-pointer">Home</Link>
            <Link href='search' className="cursor-pointer">Search</Link>
            <div>Support</div>
            <button onClick={() => dispatch(openShoppingList())} className="cursor-pointer">Cart</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
