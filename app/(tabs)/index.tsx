import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-center bg-red-500"
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {/* <Link href="/onboarding">Go to onboarding</Link>
      <Link href="/movieDetails/1">Go to movie details</Link> */}
    </View>
  );
}
