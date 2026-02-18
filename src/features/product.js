import { createSlice } from "@reduxjs/toolkit"
import { getCategories, productStatus } from "./ApiCalls"


const initialState = {
    categories : []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(productStatus.fulfilled, (state, action)=> {

            })
            .addCase(getCategories.fulfilled, (state,action) => {
                state.categories = action.payload                
            })
    }
})

export default productSlice.reducer