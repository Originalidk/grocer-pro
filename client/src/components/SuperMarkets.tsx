'use client'

import Image from 'next/image'
import FairPriceLogo from "../../images/fairprice-logo.png";
import ColdStorageLogo from "../../images/cold-storage-logo.png";
import ShengSiongLogo from "../../images/sheng-siong-logo.png";
import React, { useEffect } from 'react'

const SuperMarkets = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            } else {
              entry.target.classList.remove('visible');
            }
          });
        }, { threshold: 0.1 });
    
        const element = document.getElementById('super-markets-section');
        if (element) {
          observer.observe(element);
        }
    
        return () => {
          if (element) {
            observer.unobserve(element);
          }
        };
      }, []);

    return (
      <div id="super-markets-section" className="h-[718px] w-full flex flex-col items-center">
        <div className='h-full w-11/12 flex flex-col items-center'>
          <h3 className='mt-14 font-bold text-6xl'>Super Markets</h3>
          <hr className='h-px w-4/5 my-8 bg-gray-300 border-0' />
          <div className='h-full w-full flex flex-row justify-center'>
            <div className='w-1/4 flex flex-col items-center move-up-fade-in-animation'>
              <Image src={FairPriceLogo} alt="FairPrice Logo" height='150' />
              <p className='w-3/4 mt-20 text-center text-lg overflow-auto'>Boasting over 100 outlets with many products, FairPrice is the supermarket for convenience and reliability.</p>
            </div>
            <hr className='h-3/5 w-px mt-11 bg-gray-300 border-0' />
            <div className='w-1/4 flex flex-col items-center move-up-fade-in-animation'>
              <Image src={ColdStorageLogo} alt="Cold Storage Logo" height='150' />
              <p className='w-3/4 mt-20 text-center text-lg overflow-auto'>With high quality groceries and specialty items, Cold Storage offers a wide variety of quality products.</p>
            </div>
            <hr className='h-3/5 w-px mt-11 bg-gray-300 border-0' />
            <div className='w-1/4 flex flex-col items-center move-up-fade-in-animation'>
              <Image src={ShengSiongLogo} alt="Sheng Siong Logo" height='150' />
              <p className='w-3/4 mt-20 text-center text-lg overflow-auto'>Known for their affordable prices and short queues, Sheng Shiong prides itself for being consumer centric.</p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default SuperMarkets
