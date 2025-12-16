import { createSlice } from "@reduxjs/toolkit";
import { checkOwnerAuth } from "./ApiCalls";

const initialState = {
    ownerDetails: {},
    isLoggedIn: false,
    loading: true
}

export const ownerSlice = createSlice({
    name: "owner",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(checkOwnerAuth.pending, (state) => {
                state.loading = true
            })
            .addCase(checkOwnerAuth.fulfilled, (state) => {
                state.isLoggedIn = true
                state.loading = false
            })
            .addCase(checkOwnerAuth.rejected, (state) => {
                state.isLoggedIn = false
                state.loading = false
            })
    }
})

export const {} = ownerSlice.actions

export default ownerSlice.reducer