import { createSlice } from "@reduxjs/toolkit";
import { getOrder, updateStatus } from "./ApiCalls";

const initialState = {
    orderState : false,
    orders : [],
    ORSummary: [],
    pageInfo: {},
    oneOrder: {},
    reload: false,
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
        },
        setOneOrder : (state, action) => {
            state.oneOrder = {...action.payload}
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getOrder.fulfilled,(state, action)=> {
                state.oneOrder = {...action.payload}
            })
            .addCase(updateStatus.fulfilled,(state) => {
                state.reload = !state.reload
            })
    }
})

export const {toggleOrderState, setOrders, setSummary, setPageInfo, setOneOrder} = orderSlice.actions

export default orderSlice.reducer