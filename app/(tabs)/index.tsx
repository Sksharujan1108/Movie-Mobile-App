import React, { useState } from "react";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const [searchList, setSearchList] = useState("");
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
