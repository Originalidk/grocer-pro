'use client'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { shoppingListProductsSlice, showShoppingListSlice } from './features/ShoppingListModal.slice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
}

// const showShoppingListReducer = persistReducer(persistConfig, showShoppingListSlice.reducer)
// const shoppingListProductsReducer = persistReducer(persistConfig, shoppingListProductsSlice.reducer)

const rootReducer = combineReducers({
    showShoppingList: showShoppingListSlice.reducer,
    shoppingListProducts: shoppingListProductsSlice.reducer,
});

const rootPersistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = configureStore({
    reducer: rootPersistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof makeStore['getState']>
export type AppDispatch = typeof makeStore['dispatch']