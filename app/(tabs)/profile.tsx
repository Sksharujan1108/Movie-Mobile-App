import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const Profile = () => {
  return (
    <View className="flex-1 bg-primary px-10">
      {/* Transparent status bar for Android */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image className="size-10" tintColor={"#fff"} source={icons.person} />
        <Text className="text-light-100 text-base">Profile</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
