import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderState : false,
    orders : [],
    ORSummary: [],
    pageInfo: {},
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
        },
        setPageInfo : (state, action) => {
            state.pageInfo = action.payload
        }
    }
})

export const {toggleOrderState, setOrders, setSummary, setPageInfo} = orderSlice.actions

export default orderSlice.reducer