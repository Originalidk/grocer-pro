'use client'
import { makeStore } from '@/redux/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    // const storeRef = useRef<AppStore>()
    // if (!storeRef.current) {
    //   // Create the store instance the first time this renders
    //   storeRef.current = makeStore()
    // }
    // const persistor = persistStore(storeRef.current);
    const persistor = persistStore(makeStore);

    return <Provider store={makeStore}><PersistGate loading={null} persistor={persistor}>{children}</PersistGate></Provider>
}