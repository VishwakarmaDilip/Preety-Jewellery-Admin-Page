import { createAsyncThunk } from "@reduxjs/toolkit";
import { setOrders, setSummary, toggleOrderState } from "./order";

// order related api calls
export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/order/getAllOrders`, {
                credentials: "include"
            })

            const responseData = await response.json()
            const fetchOrders = responseData?.data?.fetchedOrders
            thunkAPI.dispatch(setOrders(fetchOrders))
            
        } catch (error) {
            console.error("Failed to fetch Order", error);
            return thunkAPI.rejectWithValue("Failed to fetch order");
        } finally {
            thunkAPI.dispatch(toggleOrderState())
        }
    }
)

export const fetchSummary = createAsyncThunk(
    "orders/fetchSummary",
    async (_,thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/order/getRevenueAndOrders`, {
                credentials: "include"
            })

            const responseData = await response.json()
            const fetchedSummary = responseData?.data || []
            thunkAPI.dispatch(setSummary(fetchedSummary))
        } catch (error) {
            console.error("Failed to fetch", error);
            return thunkAPI.rejectWithValue("Failed to fetch");
        }
    }
)