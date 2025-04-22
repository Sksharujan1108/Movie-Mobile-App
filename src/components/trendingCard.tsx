import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images"; // Make sure this is correct

interface TrendingCardProps {
  movie: {
    movie_id: number;
    title: string;
    poster_url: string;
    genres: string[];
  };
  index: number;
}

const TrendingCard = (props: TrendingCardProps) => {
  const { movie, index } = props;
  return (
    <Link href={`/movieDetails/${movie?.movie_id}`} asChild>
      <TouchableOpacity style={styles.cardContainer}>
        {/* Poster */}
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: movie?.poster_url }}
            style={styles.poster}
            resizeMode="cover"
          />

          {/* Ranking Number */}
          <View style={styles.rankContainer}>
            <MaskedView
              maskElement={<Text style={styles.rankText}>{index + 1}</Text>}
            >
              <Image
                source={images.rankingGradient}
                style={styles.rankMask}
                resizeMode="cover"
              />
            </MaskedView>
          </View>
        </View>

        <View style={styles.titleContainer}>
            {/* Movie Title */}
        <Text style={styles.title} numberOfLines={2}>
          {movie?.title}
        </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 120,
    // opacity: 0.5,
    // backgroundColor: "red",
  },
  posterContainer: {
    width: 120,
    height: 167,
    overflow: "hidden",
    alignItems: "center",
  },
  poster: {
    width: "90%",
    height: "100%",
    borderRadius: 10,
  },
  rankContainer: {
    position: "absolute",
    bottom: -6,
    left: -2,
    zIndex: 1,
  },
  rankText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  rankMask: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    paddingHorizontal: 6
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
    textAlign: 'left',
  },
  genres: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 2,
  },
});
