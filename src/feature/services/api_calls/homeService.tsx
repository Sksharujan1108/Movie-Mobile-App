import { IHomeGetTrendingMoviesDataRequestBody, IHomeGetTrendingMoviesDataResponseBody } from "@/feature/redux_models/home_model";
import { requests } from "../api";
import { AUTH_BASE_URL } from "@/env";
import { AxiosResponse } from "axios";

// Home Get Trending Movies Data Service ---
export function requestHomeGetTrendingMoviesDataService(
    params: IHomeGetTrendingMoviesDataRequestBody,
): Promise<AxiosResponse<IHomeGetTrendingMoviesDataResponseBody>> {
    return requests.get(
        `${AUTH_BASE_URL}/3/discover/movie?include_adult=${params?.include_adult}&include_video=${params?.include_video}&language=${params?.language}&page=${params?.page}&sort_by=${params?.sort_by}`,
    );
}
// Home Get Trending Movies Data Service ---