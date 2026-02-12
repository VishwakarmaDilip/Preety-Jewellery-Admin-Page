import { createSlice } from "@reduxjs/toolkit"
import { productStatus } from "./ApiCalls"


const initialState = {

}

export const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(productStatus.fulfilled, (state, action)=> {

            })
    }
})