import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';

interface MovieCardProps {
  id: number | string;
  poster_path: string | undefined;
  title: string | undefined;
  vote_average: any | number
  release_date: string | undefined;
}

const MovieCard = (props: MovieCardProps) => {
  const {
    id,
    title,
    poster_path,
    vote_average,
    release_date
  } = props;

  return (
    <Link href={`/movieDetails/${id}`} asChild>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
      >
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : 'https://placeholder.co/600x400/1a1a1a/ffffff.png',
          }}
          style={styles.poster}
          resizeMode="cover"
        />

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.ratingRow}>
          <Image source={icons.star} style={styles.starIcon} />
          <Text style={styles.ratingText}>
            {(vote_average / 2).toFixed(1)}
          </Text>
        </View>

        <Text style={styles.genre}>Action • Movie</Text>

        <Text style={styles.year}>
          {release_date?.split('-')[0]}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    width: 110,
    marginBottom: 5,
    marginRight: 10,
  },
  poster: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  starIcon: {
    width: 12,
    height: 12,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 12,
  },
  genre: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 4,
  },
  year: {
    color: '#ffffff',
    fontSize: 11,
    marginTop: 4,
  },
});
