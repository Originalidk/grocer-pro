'use client'
import { configureStore } from '@reduxjs/toolkit'
import { shoppingListProductsSlice, showShoppingListSlice } from './features/ShoppingListModal.slice';

export const makeStore = () => configureStore({
    reducer: {
        showShoppingList: showShoppingListSlice.reducer,
        shoppingListProducts: shoppingListProductsSlice.reducer,
    }
})

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']