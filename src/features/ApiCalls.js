import { createAsyncThunk } from "@reduxjs/toolkit";
import { setOrders, setPageInfo, setSummary, toggleOrderState } from "./order";

// order related api calls
export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (query, thunkAPI) => {
        console.log(query);
        try {
            
            const { searchTerm, page, startDate, endDate } = query

            const response = await fetch(`http://localhost:3000/api/v1/order/getAllOrders?query=${searchTerm}&page=${page}&startDate=${startDate}&endDate=${endDate}`, {
                credentials: "include"
            })

            const responseData = await response.json()
            console.log(responseData);
            
            const fetchOrders = responseData?.data?.fetchedOrders
            const pageInfo = responseData?.data?.pageInfo
            thunkAPI.dispatch(setOrders(fetchOrders))
            thunkAPI.dispatch(setPageInfo(pageInfo))

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
    async (_, thunkAPI) => {
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