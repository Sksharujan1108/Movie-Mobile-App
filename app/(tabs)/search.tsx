import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants/images";
import {
  selectHomeGetSearchTrendingMoviesDataSelector,
  selectHomeGetTrendingMoviesDataSelector,
  selectHomeGetTrendingMoviesDataSelectorStatus,
} from "@/feature/slices/homeSlice";
import { useAppDispatch, useAppSelector } from "@/feature/stateHooks";
import MovieCard from "@/components/movieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import { STATUS } from "@/feature/services/status_constants";
import { requestHomeGetSearchMoviesDataService } from "@/feature/services/api_calls/homeService";
import { requestHomeGetSearchTrendingMoviesData } from "@/feature/thunks/homeThunks";

const Search = () => {
  const dispatch = useAppDispatch();

  const GetTrendingMoviesData = useAppSelector(
    selectHomeGetTrendingMoviesDataSelector
  );
  const GetTrendingMoviesDataStatus = useAppSelector(
    selectHomeGetTrendingMoviesDataSelectorStatus
  );

  const GetSearchMoviesListData = useAppSelector(
    selectHomeGetSearchTrendingMoviesDataSelector
  );

  const [searchQuery, setSearchQuery] = useState("");

  // Handle Search Function ----
  const handleSearch = (query: string) => {
    setSearchQuery(query); // update state
    const params = {
      query: searchQuery,
    };
    dispatch(requestHomeGetSearchTrendingMoviesData(params));
  };

  // Show search results if query exists
  const moviesData = searchQuery
    ? GetSearchMoviesListData?.results ?? []
    : GetTrendingMoviesData?.results ?? [];

  return (
    <View className="flex-1 bg-primary">
      {/* Transparent status bar for Android */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      {/* Show The All Trending Movies */}
      <FlatList
        data={moviesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              {/* Logo */}
              <Image source={icons.logo} className=" w-12 h-10" />
            </View>
            {/* Search Bar */}
            <View className="my-5">
              <SearchBar
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={handleSearch}
                onPress={() => {}}
              />
            </View>
            {/* Loading Indicator */}
            {GetTrendingMoviesDataStatus == STATUS.LOADING && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {searchQuery.length > 0 && moviesData.length > 0 && (
              <Text className="text-white text-xl font-semibold my-3">
                Search Results for{""}
                <Text className="text-accent"> {searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
