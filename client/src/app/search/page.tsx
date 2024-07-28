'use client'

import './search.css';
import NavBar from '@/components/NavBar'
import React, { useEffect, useState } from 'react'
import ShoppingOnlineSearch from '../../../public/shopping-online-search.svg';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import NavBarSearch from '@/components/NavBarSearch/NavBarSearch';
import { NavBarSearchProps } from '@/components/NavBarSearch/NavBarSearch.type';
import { Sidebar } from '@/components/SideBar/SideBar';
import ProductList from '@/components/ProductList/ProductList';
import { ProductCardProps } from '@/components/ProductCard/ProductCard.type';
import { ProductListProps } from '@/components/ProductList/ProductList.type';
import axios from 'axios';
import { ShopProductList } from './search.type';
import { PaginationProps } from '@/components/Pagination/Pagination.type';
import Pagination from '@/components/Pagination/Pagination';
import { sortProductsDefault, sortProductsPrice } from '@/utils/sorting';
import { checkSuperMarketMock, ShopProductListMock } from './search.mock';
import ProductListLoading from '@/components/ProductList/ProductListLoading/ProductListLoading';
import { SideBarProp } from '@/components/SideBar/SideBar.type';
import { filterSuperMarket } from '@/utils/filter';

const Search = () => {
    const [search, setSearch] = useState<string>("");
    const [recentSearch, setRecentSearch] = useState<string>("");
    const [showProductList, setShowProductList] = useState<boolean>(false);
    const [shopProductList, setShopProductList] = useState<ShopProductList>(ShopProductListMock); // Object of each supermarket's product list
    const [productList, setProductList] = useState<Array<ProductCardProps>>([]);
    const [currentProductList, setCurrentProductList] = useState<Array<ProductCardProps>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage] = useState<number>(40);
    const [selectedSort, setSelectedSort] = useState<string>("default");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [checkSuperMarket, setCheckSuperMarket] = useState<{[shop: string]: boolean}>(checkSuperMarketMock);

    useEffect(() => {
        const lastProductIndex = currentPage * productsPerPage;
        const firstProductIndex = lastProductIndex - productsPerPage;
        setCurrentProductList(productList.slice(firstProductIndex, lastProductIndex));
    }, [currentPage, productList, productsPerPage]);

    useEffect(() => {
        let listOfProducts: Array<ProductCardProps> = [];
        if (selectedSort === 'price-low' || selectedSort === 'price-high') {
            listOfProducts = sortProductsPrice(shopProductList, selectedSort)
        } else {
            listOfProducts = sortProductsDefault(shopProductList)
        }
        listOfProducts = filterSuperMarket(listOfProducts, checkSuperMarket);
        setProductList(listOfProducts);
    }, [selectedSort, checkSuperMarket]);

    const handleSearch = async () => {
        if (search == "") {
            alert("Please input a value!");
            return
        }
        setIsLoading(true);
        setRecentSearch(search);
        setShowProductList(true);
        setCurrentPage(1);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/markets?search=${search}`);
        setShopProductList(response.data);
        let listOfProducts: Array<ProductCardProps> = [];
        if (selectedSort === 'price-low' || selectedSort === 'price-high') {
            listOfProducts = sortProductsPrice(response.data, selectedSort)
        } else {
            listOfProducts = sortProductsDefault(response.data)
        }
        listOfProducts = filterSuperMarket(listOfProducts, checkSuperMarket);
        setProductList(listOfProducts);
        setIsLoading(false);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const navbarSearchProps: NavBarSearchProps = {search, setSearch, handleSearch};
    
    const sideBarProps: SideBarProp = {checkSuperMarket, setCheckSuperMarket};

    const productListProps: ProductListProps = {
        search: recentSearch,
        products: currentProductList,
        selectedSort: selectedSort,
        setSelectedSort: setSelectedSort,
    };

    const paginationSearchProps: PaginationProps = {
        currentPage: currentPage,
        itemsPerPage: productsPerPage,
        totalItems: productList.length,
        handlePageChange: handlePageChange,
    };

  return (
    <main>
        {showProductList ? (
            <div className='h-full w-full'>
              <NavBarSearch {...navbarSearchProps} />
              <div className="h-[100vh] w-full flex flex-row disappear-animation">
                <div className="h-full flex flex-col justify-center items-center bg-white white-slide-out-animation">
                  <Image src={ShoppingOnlineSearch} alt="Shopping Online" className='h-3/5 w-auto' />
                </div>
                <div className="h-full bg-green-700 green-slide-in-animation">
                  <div className="h-[90%] w-full flex flex-col justify-center items-center mt-[9%] disappear-animation">
                    <div className='h-1/2 w-full flex flex-col justify-center items-center mb-[13%] disappear-animation'>
                      <h1 className="text-6xl font-bold text-white fade-out-animation">Search Products</h1>
                      <div className='flex flex-row items-center mt-12 fade-out-animation'>
                          <Input type="text" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value)} className='h-[48px] w-[384px]' disabled />
                          <button onClick={() => handleSearch()} className="ml-4 border-2 py-2 px-4 rounded-lg text-lg text-white hover:bg-white hover:border-green-900 hover:text-green-700" disabled>Search</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-row mt-[10vh]'>
                <Sidebar {...sideBarProps} />
                  {isLoading ? (
                    <ProductListLoading productsPerPage={productsPerPage} />
                  ) : productList.length > 0 ? (
                    <div className='w-full flex flex-col items-center mb-5 space-y-5'>
                      <ProductList {...productListProps} />
                      <Pagination {...paginationSearchProps} />
                    </div>
                  ) : (
                    <div className='h-[90vh] w-full flex flex-col justify-center items-center'>
                      <h3 className='ml-[256px]'>No search results.</h3>
                    </div>
                  )}
              </div>
            </div>
        ) : (
            <>
              <NavBar />
              <div className="h-[100vh] w-full flex flex-row">
                <div className="h-full w-1/2 flex flex-col justify-center items-center bg-white">
                  <Image src={ShoppingOnlineSearch} alt="Shopping Online" className='h-3/5 w-auto' priority={true} />
                </div>
                <div className="h-full w-1/2 bg-green-700">
                  <div className="h-[90%] w-full flex flex-col justify-center items-center mt-[9%]">
                    <div className='h-1/2 w-full flex flex-col justify-center items-center mb-[13%]'>
                      <h1 className="text-6xl font-bold text-white">Search Products</h1>
                      <div className='flex flex-row items-center mt-12'>
                          <Input type="text" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value)} className='h-12 w-[384px]' />
                          <button onClick={() => handleSearch()} className="ml-4 border-2 py-2 px-4 rounded-lg text-lg text-white hover:bg-white hover:border-green-900 hover:text-green-700">Search</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
        )}
    </main>
  )
}

export default Search
