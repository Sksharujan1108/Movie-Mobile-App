export default interface IHomeState {
    homeSliceStatus: string | undefined;

    // Get The Trending Movies Details
    homeGetTrendingMoviesData: IHomeGetTrendingMoviesDataResponseBody | undefined;
    homeGetTrendingMoviesDataStatus: string | undefined;

    // Get Search The Trending Movies Details
    homeGetSearchTrendingMoviesData: IHomeGetSearchTrendingMoviesDataResponseBody | undefined;
    homeGetSearchTrendingMoviesDataStatus: string | undefined;

}

// Home Error
export interface IHomeError {
    status_code: number | undefined;
    status_message: string | undefined;
    success: boolean | undefined;
}

// Home Get Trending Movies Data RequestBody 
export interface IHomeGetTrendingMoviesDataRequestBody {
    sort_by: string | undefined;
}

// Home Get Trending Movies Data ResponseBody
export interface IHomeGetTrendingMoviesDataResponseBody {
    page: number | undefined;
    results: ITrendingMovie[] | undefined;
    total_pages: number | undefined;
    total_results: number | undefined;
}
export interface ITrendingMovie {
    adult: boolean | undefined;
    backdrop_path: string | undefined;
    genre_ids: number[] | undefined;
    id: number | undefined;
    original_language: string | undefined;
    original_title: string | undefined;
    overview: string | undefined;
    popularity: number | undefined;
    poster_path: string | undefined;
    release_date: string | undefined;
    title: string | undefined;
    video: boolean | undefined;
    vote_average: number | undefined;
    vote_count: number | undefined;
}
// End Home Get Trending Movies Data Body ---

// Home Get Search Trending Movies Data ResponseBody
export interface IHomeGetSearchTrendingMoviesDataRequestBody {
    query: string | undefined;
}
export interface IHomeGetSearchTrendingMoviesDataResponseBody {
    page: number | undefined;
    results: ITrendingMovie[] | undefined;
    total_pages: number | undefined;
    total_results: number | undefined;
}
// End Home Get Search Trending Movies Data Body ---

