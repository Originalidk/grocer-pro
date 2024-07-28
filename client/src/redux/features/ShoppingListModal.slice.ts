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

const shoppingListInitialValue: ShoppingListProducts = {};

export const shoppingListProductsSlice = createSlice({
    name: 'shoppingListProducts',
    initialState: {
      value: shoppingListInitialValue
    },
    reducers: {
      addProduct: (state, action: PayloadAction<ProductCardProps>) => {
        // Keep state immutable
        state.value = JSON.parse(JSON.stringify(state.value));
        const product: ProductCardProps = action.payload;
        const key: string = `${product.shop}-${product.name}-${product.units}-${product.price}-${product.images[0]}`
        if (key in state.value) {
            const shoppingListProduct: ShoppingListProduct = state.value[key]
            shoppingListProduct.count = Math.round(shoppingListProduct.count + 1);
        } else {
          state.value[key] = {
                product: product,
                count: 1,
            }
        }
        state.value = JSON.parse(JSON.stringify(state.value));
      },
      removeProduct: (state, action: PayloadAction<ProductCardProps>) => {
        // Keep state immutable
        state.value = JSON.parse(JSON.stringify(state.value));
        const product = action.payload;
        const key: string = `${product.shop}-${product.name}-${product.units}-${product.price}-${product.images[0]}`
        if (key in state.value) {
            const shoppingListProduct: ShoppingListProduct = state.value[key]
            shoppingListProduct.count = Math.round(shoppingListProduct.count - 1);
            if (shoppingListProduct.count == 0) {
                delete state.value[key];
            }
        }
      },
    }
})

export const { openShoppingList, closeShoppingList } = showShoppingListSlice.actions;

export const { addProduct, removeProduct } = shoppingListProductsSlice.actions;