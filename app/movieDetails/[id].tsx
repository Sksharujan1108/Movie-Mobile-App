import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/feature/stateHooks";
import { requestHomeGetSingleMovieDetailsData } from "@/feature/thunks/homeThunks";
import { selectHomeGetSingleMovieDetailsDataSelector } from "@/feature/slices/homeSlice";

const MovieDetails = () => {
  const dispatch = useAppDispatch();

  const getHomeSingleMovieDetailsData = useAppSelector(
    selectHomeGetSingleMovieDetailsDataSelector
  );
  console.log("getHomeSingleMovieDetailsData", getHomeSingleMovieDetailsData);
  

  useEffect(() => {
    const params = {
      movie_id: 1359227,
    }
    dispatch(requestHomeGetSingleMovieDetailsData(params));
  }, []);

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Image
            source={{
              // uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
