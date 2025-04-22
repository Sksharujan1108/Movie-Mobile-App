import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/feature/stateHooks";
import { requestHomeGetSingleMovieDetailsData } from "@/feature/thunks/homeThunks";
import { selectHomeGetSingleMovieDetailsDataSelector } from "@/feature/slices/homeSlice";
import { router, useLocalSearchParams } from "expo-router";
import { icons } from "@/constants/icons";
import moment from "moment";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  console.log("id", id);

  const dispatch = useAppDispatch();

  const getHomeSingleMovieDetailsData = useAppSelector(
    selectHomeGetSingleMovieDetailsDataSelector
  );
  console.log("getHomeSingleMovieDetailsData", getHomeSingleMovieDetailsData);

  const formatReleaseDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return `${moment(dateString).format("MMMM D, YYYY")} (Worldwide)`;
  };

  useEffect(() => {
    const params = {
      movie_id: id,
    };
    dispatch(requestHomeGetSingleMovieDetailsData(params));
  }, []);

  return (
    <View className="bg-primary flex-1">
      {/* Transparent status bar for Android */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${getHomeSingleMovieDetailsData?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        {/*  */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">
            {getHomeSingleMovieDetailsData?.title}
          </Text>
          {/*  */}
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {getHomeSingleMovieDetailsData?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">
              {getHomeSingleMovieDetailsData?.runtime}m
            </Text>
          </View>
          {/*  */}
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(getHomeSingleMovieDetailsData?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({getHomeSingleMovieDetailsData?.vote_count} votes)
            </Text>
          </View>
          {/* Overview */}
          <MovieInfo
            label="Overview"
            value={getHomeSingleMovieDetailsData?.overview}
          />
          {/* Release Date and Status */}
          <View className="flex-row justify-between w-full  pr-20">
            <MovieInfo
              label="Release Date"
              value={formatReleaseDate(getHomeSingleMovieDetailsData?.release_date)}
            />
            <MovieInfo
              label="Status"
              value={
                getHomeSingleMovieDetailsData?.status
              }
            />
          </View>
          {/* genres */}
          <MovieInfo
            label="Genres"
            value={
              getHomeSingleMovieDetailsData?.genres
                ?.map((genre: any) => genre?.name)
                .join(", ") || "N/A"
            }
          />
          {/* country */}
          <MovieInfo
            label="Countries"
            value={
              getHomeSingleMovieDetailsData?.production_countries
                ?.map((country: any) => country?.name)
                .join ("  • ") || "N/A"
            }
          />
          {/* spoken_languages */}
          <MovieInfo
            label="Languages"
            value={
              getHomeSingleMovieDetailsData?.spoken_languages
                ?.map((l: any) => l?.name)
                .join ("  • ") || "N/A"
            }
          />
          {/*  */}
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${
                (getHomeSingleMovieDetailsData?.budget ?? 0) / 1_000_000
              } million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (getHomeSingleMovieDetailsData?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>
          {/*  */}
          <MovieInfo
            label="Production Companies"
            value={
              getHomeSingleMovieDetailsData?.production_companies
                ?.map((c: any) => c.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>
      {/* Go Back */}
      <TouchableOpacity
        className="absolute bottom-8 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#121212"
        />
        <Text className="text-light-TextPrimary font-bold text-base">Visit Homepage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
