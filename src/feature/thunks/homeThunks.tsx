import { createAsyncThunk } from "@reduxjs/toolkit";
import { IHomeError, IHomeGetSearchTrendingMoviesDataRequestBody, IHomeGetTrendingMoviesDataRequestBody } from "../redux_models/home_model";
import { requestHomeGetSearchMoviesDataService, requestHomeGetTrendingMoviesDataService } from "../services/api_calls/homeService";
import { AxiosError } from "axios";

// Home Get Trending Movies Data Thunk ---
export const requestHomeGetTrendingMoviesData = createAsyncThunk(
    "@/home/request-home-get-trending-movies-data",
    // if you type your function argument here
    async (params: IHomeGetTrendingMoviesDataRequestBody, { rejectWithValue }) => {
        try {
            const response = await requestHomeGetTrendingMoviesDataService(params);
            return response.data;
        } catch (err: any) {
            const error: AxiosError<IHomeError> = err; // cast the error for access
            if (!error) {
                throw err;
            }
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error);
        }
    },
)
// End Home Get Trending Movies Data Thunk ---

// Home Get Search Trending Movies Data Thunk ---
export const requestHomeGetSearchTrendingMoviesData = createAsyncThunk(
    "@/home/request-home-get-search-trending-movies-data",
    // if you type your function argument here
    async (params: IHomeGetSearchTrendingMoviesDataRequestBody, { rejectWithValue }) => {
        try {
            const response = await requestHomeGetSearchMoviesDataService(params);
            return response.data;
        } catch (err: any) {
            const error: AxiosError<IHomeError> = err; // cast the error for access
            if (!error) {
                throw err;
            }
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error);
        }
    },
)
// End Home Get Search Trending Movies Data Thunk ---