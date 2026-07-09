import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

export function useBottomTabOverflow() {
  if (Platform.OS !== 'ios') {
    return 0;
  }
  const height = React.useContext(BottomTabBarHeightContext);
  return height ?? 0;
}

