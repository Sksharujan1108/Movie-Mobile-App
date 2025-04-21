import { IHomeGetSearchTrendingMoviesDataRequestBody, IHomeGetSearchTrendingMoviesDataResponseBody, IHomeGetTrendingMoviesDataRequestBody, IHomeGetTrendingMoviesDataResponseBody } from "@/feature/redux_models/home_model";
import { requests } from "../api";
import { AUTH_BASE_URL } from "@/env";
import { AxiosResponse } from "axios";

// Home Get Trending Movies Data Service ---
export function requestHomeGetTrendingMoviesDataService(
    params: IHomeGetTrendingMoviesDataRequestBody,
): Promise<AxiosResponse<IHomeGetTrendingMoviesDataResponseBody>> {
    return requests.get(
        `${AUTH_BASE_URL}/discover/movie?sort_by=${params?.sort_by}`,
    );
}
// End Home Get Trending Movies Data Service ---

// Home Get Search Movies Data Service ---
export function requestHomeGetSearchMoviesDataService(
    params: IHomeGetSearchTrendingMoviesDataRequestBody,
): Promise<AxiosResponse<IHomeGetSearchTrendingMoviesDataResponseBody>> {
    return requests.get(
        `${AUTH_BASE_URL}/search/movie?query=${params?.query}`,
    );
}
// End Home Get Search Movies Data Service ---