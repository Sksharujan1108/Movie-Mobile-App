import React, { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/feature/stateHooks";
import { selectHomeGetTrendingMoviesDataSelector } from "@/feature/slices/homeSlice";
import { requestHomeGetTrendingMoviesData } from "@/feature/thunks/homeThunks";

export default function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const GetTrendingMoviesData = useAppSelector(selectHomeGetTrendingMoviesDataSelector);
  console.log("GetTrendingMoviesData => ", GetTrendingMoviesData);
  
  const [searchList, setSearchList] = useState("");

  useEffect(() => {
    const params = {
      include_adult: false,
      include_video: false,
      language: "en-US",
      page: 1,
      sort_by: "popularity.desc",
    }
    dispatch(requestHomeGetTrendingMoviesData(params));
  }, [])
  
  return (
    <View
      className="flex-1 bg-primary"
    >
      {/* Transparent status bar for Android */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {/* Background image */}
      <Image
        source={images.bg}
        className="absolute w-full z-0"
      />
      {/* ScrollView */}
      <ScrollView
        className="flex-1 px-5" 
      >
          <Image
            source={icons.logo} 
            className=" w-12 z-10 mt-20 mb-5 mx-auto"
          />

          {/* Search bar */}
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              value={searchList}
              onChangeText={setSearchList}
              // InLine function
              onPress={() => router.push(`/search`)}
            />
          </View>
      </ScrollView>  
    </View>
  );
}
