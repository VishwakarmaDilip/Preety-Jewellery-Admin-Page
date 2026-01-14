import { createAsyncThunk } from "@reduxjs/toolkit";
import { setOneOrder, setOrders, setPageInfo, setSummary, toggleOrderState } from "./order";
import toast from "react-hot-toast";

// order related api calls
export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (query, thunkAPI) => {
        try {
            const { searchTerm, page, startDate, endDate, orderStatus, paymentType } = query

            const response = await fetch(`http://localhost:3000/api/v1/order/getAllOrders?query=${searchTerm}&page=${page}&startDate=${startDate}&endDate=${endDate}&orderStatus=${orderStatus}&paymentType=${paymentType}`, {
                credentials: "include"
            })

            const responseData = await response.json()
            
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

export const getOrder = createAsyncThunk(
    "orders/getOrder",
    async(order_id, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/order/getOrder/${order_id}`, {
                credentials: "include"
            })

            const responseData = await response.json()
            const fetchedOrder = responseData?.data[0] || {}

            // thunkAPI.dispatch(setOneOrder(fetchedOrder))

            return fetchedOrder
            
        } catch (error) {
            console.error("Failed to fetch", error);
            return thunkAPI.rejectWithValue("Failed to fetch");
        }
    }
)

export const cancelTheOrder = createAsyncThunk(
     "orders/cancelOrder",
    async(order_id, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/order/cancelOrder/${order_id}`, {
                method: "POST",
                credentials: "include"
            })
            if (response.status < 399) {
                toast.success("Order cancelled successfully")
            } else {
                toast.error("Failed to cancel the order")
            }
        } catch (error) {
            console.error("Failed to cancel", error);
            return thunkAPI.rejectWithValue("Failed to cancel"); 
        }
    }
)

export const checkOwnerAuth = createAsyncThunk(
    "owner/checkOwnerAuth",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/owner/me`,
                {
                    credentials: "include",
                }
            )
            if (!response.ok) {
                thunkAPI.rejectWithValue("Unauthorized");
            }

            const fetchedData = await response.json()

            const data = fetchedData?.data || null

            return data

        } catch (error) {
            console.error("Failed to check user auth:", error);
            return thunkAPI.rejectWithValue("Failed to check user auth");
        }
    }
) 
   