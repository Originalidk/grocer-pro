'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShoppingListProduct, ShoppingListProducts } from '../../components/ShoppingListModal/ShoppingListModal.type'
import { ProductCardProps } from '@/components/ProductCard/ProductCard.type'

export const showShoppingListSlice = createSlice({
    name: 'showShoppingList',
    initialState: {
      value: false
    },
    reducers: {
      openShoppingList: state => {
        state.value = true
      },
      closeShoppingList: state => {
        state.value = false
      },
    }
})

const shoppingListInitialValue: string = "{}";

export const shoppingListProductsSlice = createSlice({
    name: 'shoppingListProducts',
    initialState: {
      value: shoppingListInitialValue
    },
    reducers: {
      addProduct: (state, action: PayloadAction<string>) => {
        const product = JSON.parse(action.payload);
        const key: string = `${product.shop}-${product.name}-${product.id}`
        const deserialisedState = JSON.parse(state.value);
        if (key in deserialisedState) {
            const shoppingListProduct: ShoppingListProduct = deserialisedState[key]
            shoppingListProduct.count++;
        } else {
            deserialisedState[key] = {
                product: product,
                count: 1,
            }
        }
        state.value = JSON.stringify(deserialisedState);
      },
      removeProduct: (state, action: PayloadAction<string>) => {
        const product = JSON.parse(action.payload);
        const key: string = `${product.shop}-${product.name}-${product.id}`
        const deserialisedState = JSON.parse(state.value);
        if (key in deserialisedState) {
            const shoppingListProduct: ShoppingListProduct = deserialisedState[key]
            shoppingListProduct.count--;
            if (shoppingListProduct.count == 0) {
                delete deserialisedState[key];
            }
        }
        state.value = JSON.stringify(deserialisedState);
      },
    }
})

export const { openShoppingList, closeShoppingList } = showShoppingListSlice.actions;

export const { addProduct, removeProduct } = shoppingListProductsSlice.actions;