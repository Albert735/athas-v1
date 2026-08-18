import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";

export function useBottomTabOverflow() {
  const height = React.useContext(BottomTabBarHeightContext);
  if (Platform.OS !== "ios") {
    return 0;
  }
  return height ?? 0;
}
