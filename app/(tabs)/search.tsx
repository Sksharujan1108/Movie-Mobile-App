import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { updateSearchCount } from "@/feature/services/appwrite";

let debounceTimer: NodeJS.Timeout;

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

  const filteredMoviesData = GetSearchMoviesListData?.results ?? [];

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search call
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (query.trim()) {
        dispatch(requestHomeGetSearchTrendingMoviesData({ query }));
        setIsSearching(true);
      } else {
        setIsSearching(false);
      }
    }, 500); // Delay of 500ms
  };

  // Show search results if query exists
  const moviesData = searchQuery
    ? filteredMoviesData
    : GetTrendingMoviesData?.results ?? [];

  useEffect(() => {
    if (isSearching && searchQuery.trim().length > 0 && filteredMoviesData.length > 0) {
      updateSearchCount(searchQuery, filteredMoviesData[0] as Movie);
    }
  }, [searchQuery]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
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
          ListEmptyComponent={
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-100">
                {searchQuery.trim() && moviesData.length > 0
                  ? "No Movies Found"
                  : "No Trending Movies"}
              </Text>
            </View>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Search;

const styles = StyleSheet.create({});
