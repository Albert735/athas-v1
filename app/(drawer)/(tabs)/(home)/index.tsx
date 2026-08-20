import { useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Menu, Mic, MapPin } from "lucide-react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { router } from "expo-router";
import MapboxGL from "@rnmapbox/maps";

import { places } from "@/data/places";
import { quickActions } from "@/data/quick-actions";
import { categoryImages } from "@/data/category-images";
import { useColor } from "@/hooks/useColor";
import { MAP_STYLE_URL } from "@/constants/mapbox";
import { SearchBar } from "@/components/ui/searchbar";
import { Text } from "@/components/ui/text";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";
import { PlaceSearchDropdown } from "@/components/map/place-search-dropdown";
import { useUserLocation } from "@/hooks/useUserLocation";
import MapsSheet from "./maps-sheet";
import { Button } from "@/components/ui/button";

const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

export default function HomeScreen() {
  const [selectedQuickAction, setSelectedQuickAction] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [searchFocused, setSearchFocused] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[0] | null>(
    null,
  );

  const cameraRef = useRef<MapboxGL.Camera>(null);

  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  // useWindowDimensions is the correct hook for responsive layouts
  // (Dimensions.get is a one-time snapshot, not reactive to orientation changes)
  const { height } = useWindowDimensions();

  /*
   * Map occupies approximately 56% of the screen.
   * This keeps the layout responsive across devices.
   */
  // const MAP_HEIGHT = height * 0.56;

  /*
   * Theme colors
   */
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const primaryForeground = useColor("primaryForeground");
  const iconColor = useColor("icon");

  /*
   * Leave room for the bottom tab bar and safe area.
   */
  const bottomInset = insets.bottom + 70;

  /*
   * Filter places according to selected quick action.
   */
  const filteredPlaces =
    selectedQuickAction === "all"
      ? places
      : places.filter((place) => place.category === selectedQuickAction);

  /*
   * Get the label of the selected category.
   */
  const selectedCategoryLabel = quickActions.find(
    (item) => item.category === selectedQuickAction,
  )?.label;

  // Shared search hook — same logic as the map screen, no duplication
  const searchResults = usePlaceSearch(searchQuery);

  // User GPS location — used to show an alert if permission is denied
  const { error: locationError } = useUserLocation();

  /*
   * Only display the dropdown when:
   *
   * 1. Search is focused
   * 2. User has typed something
   */
  const showDropdown = searchFocused && searchQuery.trim().length > 0;

  /*
   * Move the map to a selected place.
   */
  const handleMarkerPress = (place: (typeof places)[0]) => {
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

  /*
   * Navigate to a building after moving the map.
   */
  const handlePlacePress = (place: (typeof places)[0]) => {
    handleMarkerPress(place);

    router.push(`/building/${place.id}`);
  };

  // Show a one-time alert if location permission was denied
  if (locationError) {
    Alert.alert(
      "Location Unavailable",
      "Enable location access in Settings so we can compute accurate distances and directions.",
      [{ text: "OK" }],
    );
  }

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor,
        },
      ]}
    >
      {/* =====================================================
          MAP
      ====================================================== */}

      <View
        style={[
          styles.mapContainer,
          {
            // height: MAP_HEIGHT,
            height: "100%",
            backgroundColor: cardColor,
          },
        ]}
      >
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MAP_STYLE_URL}
          logoEnabled={false}
          attributionEnabled={false}
          compassEnabled={false}
          scaleBarEnabled={false}
          pitchEnabled
        >
          <MapboxGL.Camera
            ref={cameraRef}
            zoomLevel={16}
            centerCoordinate={CAMPUS_CENTER}
            animationMode="flyTo"
            animationDuration={0}
          />

          {/* User location */}

          <MapboxGL.UserLocation visible showsUserHeadingIndicator />

          {/* 3D buildings */}

          <MapboxGL.FillExtrusionLayer
            id="3d-buildings"
            sourceID="composite"
            sourceLayerID="building"
            minZoomLevel={15}
            maxZoomLevel={22}
            style={{
              fillExtrusionColor: "#D1D5DB",
              fillExtrusionHeight: ["get", "height"],
              fillExtrusionBase: ["get", "min_height"],
              fillExtrusionOpacity: 0.8,
            }}
          />

          {/* All category-filtered markers — not just the selected one */}
          {filteredPlaces.map((place) => (
            <MapboxGL.PointAnnotation
              key={place.id}
              id={`marker-${place.id}`}
              coordinate={[place.longitude, place.latitude]}
              onSelected={() => handleMarkerPress(place)}
            >
              <View
                style={[
                  styles.markerPin,
                  selectedPlace?.id === place.id && styles.markerPinSelected,
                ]}
              >
                <View style={styles.markerDot} />
              </View>
            </MapboxGL.PointAnnotation>
          ))}
        </MapboxGL.MapView>
      </View>

      {/* =====================================================
          TOP OVERLAY
      ====================================================== */}

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        {/* Header */}

        <View style={styles.header}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
            contentFit="contain"
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={styles.menuButton}
          >
            <Menu size={22} color={textColor} />
          </TouchableOpacity>
        </View>

        {/* Search */}

        <View style={styles.searchRow}>
          <SearchBar
            placeholder="Search for anything..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onSearch={(query) => {
              const found = places.find((place) =>
                place.name.toLowerCase().includes(query.toLowerCase()),
              );
              if (found) handleMarkerPress(found);
            }}
            loading={false}
            rightIcon={<Mic size={18} color={iconColor} />}
          />

          {/* Now absolutely positioned so it floats over content instead of pushing it */}
          {showDropdown && (
            <View style={styles.dropdownAbsolute}>
              <PlaceSearchDropdown
                visible={showDropdown}
                results={searchResults}
                onSelect={handleMarkerPress}
              />
            </View>
          )}
        </View>

        {/* Quick Actions */}

        {!showDropdown && (
          <FlatList
            horizontal
            data={quickActions}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContent}
            renderItem={({ item }) => {
              const isSelected = selectedQuickAction === item.category;

              const Icon = item.icon;

              return (
                <Pressable
                  style={[
                    styles.chip,
                    {
                      backgroundColor: cardColor,
                      borderColor,
                    },

                    isSelected && {
                      backgroundColor: primaryColor,
                      borderColor: primaryColor,
                    },
                  ]}
                  onPress={() => setSelectedQuickAction(item.category)}
                >
                  <Icon
                    size={14}
                    color={isSelected ? primaryForeground : iconColor}
                  />

                  <Text
                    style={[
                      styles.chipText,
                      {
                        color: isSelected ? primaryForeground : textColor,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },

  map: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  logo: {
    width: 34,
    height: 34,
    borderRadius: 9,
  },

  menuButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =======================================================
     SEARCH
  ======================================================== */

  searchRow: {
    paddingHorizontal: 20,
    marginTop: 12,
    zIndex: 20, // ensure dropdown floats above quick actions
  },
  dropdownAbsolute: {
    position: "absolute",
    top: 56, // roughly the height of the search bar — adjust to match yours
    left: 20,
    right: 20,
  },

  dropdownEmpty: {
    padding: 20,
    alignItems: "center",
  },

  dropdownEmptyText: {
    fontSize: 14,
  },

  dropdownSeparator: {
    height: 1,
    marginLeft: 60,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },

  dropdownIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownItemText: {
    flex: 1,
    gap: 2,
  },

  dropdownItemName: {
    fontSize: 14,
    fontWeight: "600",
  },

  dropdownItemDesc: {
    fontSize: 12,
  },

  dropdownItemDistance: {
    fontSize: 12,
    fontWeight: "500",
  },

  dismissOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },

  /* =======================================================
     QUICK ACTIONS
  ======================================================== */

  quickActionsContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },

  chipText: {
    fontSize: 13,
    fontWeight: "500",
  },

  /* =======================================================
     BOTTOM SHEET
  ======================================================== */

  sheet: {
    position: "absolute",
    left: 0,
    right: 0,

    paddingTop: 20,
    paddingBottom: 10,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  seeAll: {
    fontSize: 13,
    fontWeight: "500",
  },

  placesContent: {
    paddingHorizontal: 20,
    gap: 16,
  },

  /* =======================================================
     PLACE CARD
  ======================================================== */

  card: {
    width: 220,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },

  cardImage: {
    width: "100%",
    height: 120,
  },

  cardBody: {
    padding: 12,
    gap: 4,
  },

  cardName: {
    fontSize: 14,
    fontWeight: "600",
  },

  cardDescription: {
    fontSize: 12,
    lineHeight: 17,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },

  cardDistance: {
    fontSize: 12,
  },

  /* =======================================================
     MAP MARKER
  ======================================================== */

  markerPin: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  /** Highlighted variant shown on the currently-selected marker. */
  markerPinSelected: {
    backgroundColor: "#4DA8FF",
    borderColor: "#FFFFFF",
    transform: [{ scale: 1.2 }],
  },

  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4DA8FF",
  },
});
