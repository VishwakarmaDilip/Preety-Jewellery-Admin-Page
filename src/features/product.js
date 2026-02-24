import { createSlice } from "@reduxjs/toolkit"
import { deleteCategory, getCategories, productStatus } from "./ApiCalls"


const initialState = {
    categories : [],
    catLoad: false
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state,action) => {
                state.categories = action.payload              
            })
            .addCase(deleteCategory.pending, (state, payload) => {
                state.catLoad = true
            })
            .addCase(deleteCategory.fulfilled, (state, payload) => {
                state.catLoad = false
            })
    }
})

export default productSlice.reducer