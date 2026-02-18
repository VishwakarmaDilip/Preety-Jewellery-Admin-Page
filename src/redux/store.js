import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '../features/order'
import ownerSlice from '../features/owner'
import productSlice from '../features/product'

export const store = configureStore({
    reducer: {
        order : orderSlice,
        owner : ownerSlice,
        product : productSlice
    }
})