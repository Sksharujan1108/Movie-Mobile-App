import { createSlice } from "@reduxjs/toolkit";
import IHomeState from "../redux_models/home_model";
import { requestHomeGetTrendingMoviesData } from "../thunks/homeThunks";
import { STATUS } from "../services/status_constants";
import { RootState } from "../rootReducer";

const DEFAULT_STATE: IHomeState = {
    homeSliceStatus: undefined,
  
    // Home Get All Trending Movies Details Data ---
    homeGetTrendingMoviesData: undefined,
    homeGetTrendingMoviesDataStatus: undefined,
};

const INITIAL_STATE: IHomeState = {
    ...DEFAULT_STATE,
};

const home_slice = createSlice({
    name: "home",
    initialState: INITIAL_STATE,
    reducers: {
        resetHome: () => {
            return INITIAL_STATE;
        },
    },
    extraReducers: (builder) => {
        // Home Get Trending Movies Data ---
        builder.addCase(requestHomeGetTrendingMoviesData.pending, (state) => {
            state.homeSliceStatus = STATUS.LOADING;
            state.homeGetTrendingMoviesDataStatus = STATUS.LOADING;
        });
        builder.addCase(requestHomeGetTrendingMoviesData.fulfilled, (state, action) => {
            state.homeGetTrendingMoviesData = action.payload;
            state.homeSliceStatus = STATUS.SUCCEEDED;
            state.homeGetTrendingMoviesDataStatus = STATUS.SUCCEEDED;
        });
        builder.addCase(requestHomeGetTrendingMoviesData.rejected, (state) => {
            state.homeSliceStatus = STATUS.FAILED;
            state.homeGetTrendingMoviesDataStatus = STATUS.FAILED;
        });
        // End Home Get Trending Movies Data ---
    }
});

// Home Slice Actions
export const { resetHome } = home_slice.actions;

// Home Slice Selector
export const homeSliceSelector = (state: RootState) => state.home.homeSliceStatus;

// Home Get Trending Movies Data Selector ---
export const selectHomeGetTrendingMoviesDataSelector = (state: RootState) => state.home.homeGetTrendingMoviesData;
export const selectHomeGetTrendingMoviesDataStatusSelector = (state: RootState) => state.home.homeGetTrendingMoviesDataStatus;
// End Home Get Trending Movies Data Selector ----

export default home_slice;