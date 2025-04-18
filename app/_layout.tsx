import { Stack } from "expo-router";
import "./global.css";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)"
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="movieDetails" 
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
