import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/feature/stateHooks";
import {
  selectHomeGetTrendingMoviesDataSelector,
  selectHomeGetTrendingMoviesDataSelectorStatus,
} from "@/feature/slices/homeSlice";
import { requestHomeGetTrendingMoviesData } from "@/feature/thunks/homeThunks";
import { STATUS } from "@/feature/services/status_constants";
import MovieCard from "@/components/movieCard";
import { getTrendingMovies } from "@/feature/services/appwrite";
import TrendingCard from "@/components/trendingCard";

export default function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const GetTrendingMoviesData = useAppSelector(
    selectHomeGetTrendingMoviesDataSelector
  );
  const GetTrendingMoviesDataStatus = useAppSelector(
    selectHomeGetTrendingMoviesDataSelectorStatus
  );

  const moviesData = GetTrendingMoviesData?.results ?? [];

  const [topSearchedMovies, setTopSearchedMovies] = useState<TrendingMovie[]>([]);

  useEffect(() => {
    const params = {
      sort_by: "popularity.desc",
    };
    dispatch(requestHomeGetTrendingMoviesData(params));
  }, []);

  // Get Trending Movies
  useEffect(() => {
    const fetchTopSearched = async () => {
      try {
        const response = await getTrendingMovies();
        if (response) {
          setTopSearchedMovies(response);
        }
      } catch (error) {
        console.error("Error fetching top searched movies:", error);
      } 
    };
    fetchTopSearched()
  }, []);
  console.log("topSearchedMovies", topSearchedMovies);
  
  return (
    <View className="flex-1 bg-primary">
      {/* Transparent status bar for Android */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {/* Background image */}
      <Image source={images.bg} className="absolute w-full z-0" />
      {/* ScrollView */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%'}}>
        <Image source={icons.logo} className=" w-12 z-10 mt-20 mb-5 mx-auto" />

        {/* Activator indicator */}
        {GetTrendingMoviesDataStatus == STATUS.LOADING ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              // InLine function
              onPress={() => router.push(`/search`)}
            />

            {/* Top Searched Movies */}
            {topSearchedMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Tending Movies
                </Text>
                {/* List of Items */}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={topSearchedMovies}
                  keyExtractor={(item) => item?.movie_id?.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <TrendingCard
                        movie={{ ...item }}
                        index={index}
                      />
                    );
                  }}
                  
                />
              </View>
            )}

            {/* Latest Movies */}
            <>
              <Text className="text-lg text-white font-bold mt-5">
                Latest Movies
              </Text>
              {/* List of Items */}
              <FlatList
                scrollEnabled={false}
                className="mt-3 pb-32"
                data={moviesData}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginVertical: 10,
                }}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
