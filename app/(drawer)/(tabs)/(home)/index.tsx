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

interface HomeMapProps {
  selectedPlace: Place | null;
  onAnnotationPress?: (place: Place) => void;
}

type Place = (typeof places)[0];

export default function HomeScreen() {
  const backgroundColor = useColor("background");

  const cameraRef = useRef<MapboxGL.Camera>(null);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [searchFocused, setSearchFocused] = useState(false);

  const [showBottomSheet, setShowBottomSheet] = useState(true);

  /**
   * Used to tell useFocusEffect that we are returning
   * from the place form sheet.
   */
  const openedPlaceSheet = useRef(false);

  /**
   * Select a place and open its form sheet.
   *
   * This is used by:
   * - Search results
   * - Popular places
   * - Map annotations
   */
  const openPlace = useCallback((place: Place) => {
    setSelectedPlace(place);

    setShowBottomSheet(false);

    setSearchQuery("");
    setSearchFocused(false);

    openedPlaceSheet.current = true;

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
      },
    });
  }, []);

  /**
   * Search result selected.
   */
  const handleSearchSelect = useCallback(
    (place: Place) => {
      openPlace(place);
    },
    [openPlace],
  );

  /**
   * Popular place selected.
   */
  const handlePlacePress = useCallback(
    (place: Place) => {
      openPlace(place);
    },
    [openPlace],
  );

  /**
   * Map annotation selected.
   */
  const handleAnnotationPress = useCallback(
    (place: Place) => {
      openPlace(place);
    },
    [openPlace],
  );

  /**
   * When the place form sheet is dismissed,
   * restore the normal map state.
   */
  useFocusEffect(
    useCallback(() => {
      if (!openedPlaceSheet.current) {
        return;
      }

      openedPlaceSheet.current = false;

      setSelectedPlace(null);

      setShowBottomSheet(true);

      setSearchQuery("");
      setSearchFocused(false);
    }, []),
  );

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor,
        },
      ]}
    >
      {/* MAP */}
      <View style={styles.mapContainer}>
        <HomeMap
          ref={cameraRef}
          selectedPlace={selectedPlace}
          onAnnotationPress={handleAnnotationPress}
        />
      </View>

      {/* HEADER + SEARCH */}
      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <HomeHeader />

        <HomeSearchOverlay
          query={searchQuery}
          onQueryChange={setSearchQuery}
          focused={searchFocused}
          onFocus={() => {
            setSearchFocused(true);
            setShowBottomSheet(false);
          }}
          onSelect={handleSearchSelect}
        />
      </SafeAreaView>

      {/* POPULAR PLACES */}
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
