import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import MapboxGL from "@rnmapbox/maps";

import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";

import {
  HomeHeader,
  HomeMap,
  HomePopularSheet,
  HomeSearchOverlay,
} from "@/components/home";

type Place = (typeof places)[number];

export default function HomeScreen() {
  const backgroundColor = useColor("background");

  const cameraRef = useRef<MapboxGL.Camera>(null);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const [showBottomSheet, setShowBottomSheet] = useState(true);

  /*
   * Whenever Home becomes the active screen again,
   * return it to its default state.
   *
   * This is important because Expo Router can keep
   * the Home screen mounted while another screen is
   * pushed on top of it.
   */
  useFocusEffect(
    useCallback(() => {
      setSelectedPlace(null);
      setSelectedCategory("all");
      setSearchQuery("");
      setSearchFocused(false);
      setShowBottomSheet(true);

      return undefined;
    }, []),
  );

  const openPlace = useCallback((place: Place) => {
    setSelectedPlace(place);
    setShowBottomSheet(false);

    setSearchQuery("");
    setSearchFocused(false);

    cameraRef.current?.setCamera({
      centerCoordinate: [place.longitude, place.latitude],
      zoomLevel: 17,
      pitch: 45,
      animationDuration: 600,
    });

    router.push({
      pathname: "/place-sheet",
      params: {
        id: place.id,
        source: "home",
      },
    });
  }, []);

  const handleSearchSelect = useCallback(
    (place: Place) => {
      openPlace(place);
    },
    [openPlace],
  );

  const handlePlacePress = useCallback(
    (place: Place) => {
      openPlace(place);
    },
    [openPlace],
  );

  const handleAnnotationPress = useCallback((place: Place) => {
    setSelectedPlace(place);
    setShowBottomSheet(false);

    setSearchQuery("");
    setSearchFocused(false);

    router.push({
      pathname: "/place-sheet",
      params: {
        id: place.id,
        source: "home",
      },
    });
  }, []);

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
    setShowBottomSheet(false);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setSearchFocused(false);

    if (searchQuery.trim().length === 0) {
      setShowBottomSheet(true);
    }
  }, [searchQuery]);

  return (
    <View style={[styles.root, { backgroundColor }]}>
      <View style={styles.mapContainer}>
        <HomeMap
          ref={cameraRef}
          selectedPlace={selectedPlace}
          onAnnotationPress={handleAnnotationPress}
        />
      </View>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <HomeHeader />

        <HomeSearchOverlay
          query={searchQuery}
          onQueryChange={setSearchQuery}
          focused={searchFocused}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          onSelect={handleSearchSelect}
        />
      </SafeAreaView>

      <HomePopularSheet
        visible={showBottomSheet}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onPlacePress={handlePlacePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  mapContainer: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
