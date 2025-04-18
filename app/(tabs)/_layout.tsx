import { Image, ImageBackground, StyleSheet, Text, View, } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

interface TabBarIconProps {
  focused: boolean;
  title: string;
  source: any; // ImageSourcePropType;
}

const TabBarIcon = (props: TabBarIconProps) => {
  const { focused, title, source } = props;
  if (focused) {
    return (
      <>
        <ImageBackground
          source={images.highlight}
          className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden gap-2"
        >
          <Image source={source} tintColor="#151312" className="size-5" />
          <Text className="text-secondary text-base font-semibold ">
            {" "}
            {title}{" "}
          </Text>
        </ImageBackground>
      </>
    );
  } else {
    return (
      <>
        <View className="size-full justify-center items-center mt-4 rounded-full">
          <Image source={source} tintColor="#A8B5DB" className="size-5" />
        </View>
      </>
    );
  }
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hide the tab label
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon focused={focused} title="Home" source={icons.home} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon
                focused={focused}
                title="Search"
                source={icons.search}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon focused={focused} title="Saved" source={icons.save} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon
                focused={focused}
                title="Profile"
                source={icons.person}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  tabBarItemStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    backgroundColor: "#0f0D23",
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom: 36,
    height: 52,
    position: "absolute",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#0f0D23",
  }
});
