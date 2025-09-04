import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderState : false,
    orders : [],
    ORSummary: [],
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        toggleOrderState: (state) => {
            state.orderState = !state.orderState
        },
        setOrders : (state, action) => {
            state.orders = action.payload

        },
        setSummary : (state, action) => {
            state.ORSummary = action.payload
        }
    }
})

export const {toggleOrderState, setOrders, setSummary} = orderSlice.actions

export default orderSlice.reducer