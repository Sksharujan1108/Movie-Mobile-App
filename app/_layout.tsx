import { Stack } from "expo-router";
import "./global.css";
import React from "react";
import { Provider } from "react-redux";
import store from "@/feature/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movieDetails" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
