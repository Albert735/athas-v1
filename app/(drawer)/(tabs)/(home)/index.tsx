import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { useRef, useState, useCallback } from "react";
import MapboxGL from "@rnmapbox/maps";
import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";
import {
  HomeHeader,
  HomeMap,
  HomePopularSheet,
  HomeSearchOverlay,
} from "@/components/home";

export default function HomeScreen() {
  const backgroundColor = useColor("background");
  const cameraRef = useRef<MapboxGL.Camera>(null);

  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[0] | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const isSearching = searchFocused && searchQuery.trim().length > 0;

  const handleSelectPlace = (place: (typeof places)[0]) => {
    cameraRef.current?.setCamera({
      centerCoordinate: [place.longitude, place.latitude],
      zoomLevel: 17,
      pitch: 45,
      animationDuration: 600,
    });

    setSelectedPlace(place);
    setSearchQuery("");
    setSearchFocused(false);

    router.push(`/place-sheet?id=${place.id}`);
  };

  // Every time Home regains focus (e.g. the place-sheet was dismissed,
  // or the user backed out of Building Details), clear the selection so
  // the map annotation disappears and the popular-places sheet returns.
  const hasMountedRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (hasMountedRef.current) {
        // We're refocusing after having navigated away (e.g. place-sheet closed)
        setSelectedPlace(null);
      }
      hasMountedRef.current = true;
    }, []),
  );

  return (
    <View style={[styles.root, { backgroundColor }]}>
      <View style={styles.mapContainer}>
        <HomeMap ref={cameraRef} selectedPlace={selectedPlace} />
      </View>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <HomeHeader />
        <HomeSearchOverlay
          query={searchQuery}
          onQueryChange={setSearchQuery}
          focused={searchFocused}
          onFocus={() => setSearchFocused(true)}
          onSelect={handleSelectPlace}
        />
      </SafeAreaView>

      {!isSearching && (
        <HomePopularSheet
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onPlacePress={handleSelectPlace}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  mapContainer: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
