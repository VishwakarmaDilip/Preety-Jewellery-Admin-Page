import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '../features/order'
import ownerSlice from '../features/owner'

export const store = configureStore({
    reducer: {
        order : orderSlice,
        owner : ownerSlice
    }
})