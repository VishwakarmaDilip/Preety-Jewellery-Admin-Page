import { configureStore } from '@reduxjs/toolkit'
import { orderSlice } from '../features/order'

export const store = configureStore({
    reducer: {
        order : orderSlice
    }
})