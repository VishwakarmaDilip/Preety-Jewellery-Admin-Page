import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderState : false,
    oredrs : [],
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        toggleOrderState: (state) => {
            state.orderState = !state.orderState
        },
        setOrders : (state, action) => {
            state.oredrs = action.payload
        }
    }
})

export const {toggleOrderState, setOrders} = orderSlice.actions

export default orderSlice.reducer