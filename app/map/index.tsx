// ─── React Native core UI primitives ────────────────────────────────────────
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
// SafeAreaView ensures content doesn't overlap with the device notch / status bar
import { SafeAreaView } from "react-native-safe-area-context";
// Shared header component (back button + title) used across screens
import { Header } from "@/components/shared/screen/header";
// Reusable search input component with icon slots
import { SearchBar } from "@/components/ui/searchbar";
// Lucide icon components used in the search bar and dropdown results
import { Mic, MapPin } from "lucide-react-native";
// Custom hook that resolves a semantic color token to its current theme value
import { useColor } from "@/hooks/useColor";
// React hooks
import { useState, useRef, useEffect, useMemo } from "react";
// Mapbox GL React Native SDK – provides map rendering and map-related components
import MapboxGL from "@rnmapbox/maps";
// Bottom sheet component that shows place details, directions, and navigation UI
import MapBottomSheet from "@/components/map/map-bottom-sheet";
// Static dataset of campus places (buildings, landmarks, etc.)
import { places } from "@/data/places";
// Expo Router hook to read URL query parameters (e.g. ?buildingId=...)
import { useLocalSearchParams } from "expo-router";
// Custom Mapbox style URL (defines how the base map looks)
import { MAP_STYLE_URL } from "@/constants/mapbox";
// Custom hook that tracks the user's live GPS location
import { useUserLocation } from "@/hooks/useUserLocation";
// Utility to fetch turn-by-turn route geometry from the Mapbox Directions API
import { getRoute, type RouteResult } from "@/utils/directions";

// ─── Type definitions ───────────────────────────────────────────────────────

/**
 * Represents the current mode of the bottom sheet / map interaction:
 *  - "details"    → showing place information
 *  - "directions" → showing route overview (distance, duration, transport mode)
 *  - "navigating" → live turn-by-turn navigation mode
 */
type SheetState = "details" | "directions" | "navigating";

// ─── Constants ──────────────────────────────────────────────────────────────

/** Default center coordinate for the campus map [longitude, latitude]. */
const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

// ─── Component ──────────────────────────────────────────────────────────────

export default function Map() {
  // ── Theme colors (resolved from the current light/dark theme) ───────────
  const icon = useColor("icon");
  const primaryColor = useColor("primary");
  const cardColor = useColor("card");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const borderColor = useColor("border");

  // ── Route params ────────────────────────────────────────────────────────
  // If the screen was opened via deep-link `/map?buildingId=xyz`,
  // this will contain the target building's ID.
  const { buildingId } = useLocalSearchParams<{ buildingId?: string }>();

  // ── User location ──────────────────────────────────────────────────────
  // Live GPS position as [longitude, latitude] or null while loading.
  const { location: userLocation } = useUserLocation();

  // ── State ──────────────────────────────────────────────────────────────

  /** The campus place the user has currently selected (tapped marker or search result). */
  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[0] | null>(
    null,
  );

  /** Controls the bottom-sheet mode (details → directions → navigating). */
  const [mapState, setMapState] = useState<SheetState>("details");

  /** The currently-active route geometry + metadata returned by Mapbox Directions. */
  const [route, setRoute] = useState<RouteResult | null>(null);

  /** True while a directions request is in-flight. */
  const [routeLoading, setRouteLoading] = useState(false);

  /** Current text typed into the search bar. */
  const [searchQuery, setSearchQuery] = useState("");

  /** Whether the search bar is currently focused (keyboard visible). */
  const [searchFocused, setSearchFocused] = useState(false);

  // ── Refs ───────────────────────────────────────────────────────────────

  /** Ref to the Mapbox Camera so we can imperatively animate the viewport. */
  const cameraRef = useRef<MapboxGL.Camera>(null);

  /**
   * Monotonically-increasing ID used to discard stale direction responses.
   * Each new request bumps this counter; when a response arrives we check
   * that its ID still matches the latest request.
   */
  const requestIdRef = useRef(0);

  // ── Derived / memoized values ─────────────────────────────────────────

  /**
   * Filters the static `places` list against the current search query.
   * Results are sorted so that names starting with the query appear first,
   * and the list is capped at 8 items to keep the dropdown compact.
   */
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // No query → no results (avoid showing all places)
    if (!query) {
      return [];
    }

    return places
      .filter((place) => place.name.toLowerCase().includes(query))
      .sort((a, b) => {
        // Prioritize names that *start* with the query over substring matches
        const aStarts = a.name.toLowerCase().startsWith(query) ? 0 : 1;

        const bStarts = b.name.toLowerCase().startsWith(query) ? 0 : 1;

        return aStarts - bStarts;
      })
      .slice(0, 8); // Cap at 8 results
  }, [searchQuery]);

  /** Whether to render the search-results dropdown. */
  const showDropdown = searchFocused && searchQuery.trim().length > 0;

  // ── Event handlers / helpers ──────────────────────────────────────────

  /**
   * Selects a place: animates the camera to it, updates selection state,
   * and clears the search UI.
   *
   * @param place              The place object to select.
   * @param clearExistingRoute If true, any previously-fetched route is cleared.
   *                           Set to false when tapping a marker so that an
   *                           active route remains visible.
   */
  const selectPlace = (
    place: (typeof places)[0],
    clearExistingRoute = false,
  ) => {
    // Fly the camera to the selected place's coordinates
    cameraRef.current?.setCamera({
      centerCoordinate: [place.longitude, place.latitude],
      zoomLevel: 17,
      pitch: 45,
      animationDuration: 600,
    });

    // Update UI state
    setSelectedPlace(place);
    setMapState("details"); // Reset the sheet to the details view
    setSearchQuery(""); // Clear the search input
    setSearchFocused(false); // Dismiss the keyboard / dropdown

    // Optionally clear the route (e.g. when picking a new destination via search)
    if (clearExistingRoute) {
      setRoute(null);
    }
  };

  /**
   * Called when a place is chosen from the search dropdown.
   * Clears any existing route because this represents a *new* destination.
   */
  const handleSearchSelect = (place: (typeof places)[0]) => {
    selectPlace(place, true);
  };

  /**
   * Called when the user taps a map marker/annotation.
   * Preserves the current route so the user can inspect nearby places
   * without losing their active directions.
   */
  const handleAnnotationSelect = (place: (typeof places)[0]) => {
    selectPlace(place, false);
  };

  /**
   * Returns the user's GPS location, waiting up to 5 seconds for it to
   * become available. Used as a fallback when `userLocation` is null at
   * the moment directions are requested.
   *
   * @returns A [longitude, latitude] tuple, or null if location could not be obtained.
   */
  const waitForLocation = (): Promise<[number, number] | null> => {
    return new Promise((resolve) => {
      // If location is already available, resolve immediately
      if (userLocation) {
        resolve(userLocation);
        return;
      }

      // Poll every 200ms for the location to arrive
      const interval = setInterval(() => {
        if (userLocation) {
          clearInterval(interval);
          resolve(userLocation);
        }
      }, 200);

      // Give up after 5 seconds to avoid hanging indefinitely
      setTimeout(() => {
        clearInterval(interval);
        resolve(null);
      }, 5000);
    });
  };

  /**
   * Fetches a route from the user's current location to the selected place.
   *
   * Uses a request-ID guard (`requestIdRef`) so that if the user quickly
   * switches transport mode, only the most recent response is applied.
   *
   * After a successful fetch the camera fits the entire route into view.
   *
   * @param profile The transport mode: "walking" (default), "driving", or "cycling".
   */
  const handleRequestDirections = async (
    profile: "walking" | "driving" | "cycling" = "walking",
  ) => {
    // Can't get directions without a destination
    if (!selectedPlace) {
      return;
    }

    // Bump the request counter to track this specific request
    const thisRequestId = ++requestIdRef.current;

    setRouteLoading(true);

    // Attempt to get the user's current location
    let origin = userLocation;

    if (!origin) {
      // If not yet available, wait up to 5s
      origin = await waitForLocation();
    }

    // If we still don't have a location, bail out
    if (!origin) {
      setRouteLoading(false);
      return;
    }

    // Fetch the route from the Mapbox Directions API
    const result = await getRoute(
      origin,
      [selectedPlace.longitude, selectedPlace.latitude],
      profile,
    );

    // Stale-request guard: if a newer request was made while this one
    // was in-flight, discard this result silently.
    if (thisRequestId !== requestIdRef.current) {
      return;
    }

    // Apply the route and stop the loading indicator
    setRoute(result);
    setRouteLoading(false);

    // If we got a valid route, zoom the camera to fit the entire path
    if (result) {
      const coords = result.geometry.coordinates as [number, number][];

      // Extract all longitudes and latitudes to compute bounding box
      const lons = coords.map((coordinate) => coordinate[0]);

      const lats = coords.map((coordinate) => coordinate[1]);

      // fitBounds takes [NE corner], [SW corner], padding, animationDuration
      cameraRef.current?.fitBounds(
        [Math.max(...lons), Math.max(...lats)], // Northeast corner
        [Math.min(...lons), Math.min(...lats)], // Southwest corner
        60, // Padding (px) around the route
        800, // Animation duration (ms)
      );
    }
  };

  /** Transitions the map into live turn-by-turn navigation mode. */
  const handleStartNavigation = () => {
    setMapState("navigating");
  };

  // ── Effects ───────────────────────────────────────────────────────────

  /**
   * Deep-link handler: if the screen was opened with a `buildingId` query
   * param (e.g. from a home-screen building card), automatically select
   * that building and fly the camera to it.
   */
  useEffect(() => {
    if (!buildingId) {
      return;
    }

    const found = places.find((place) => place.id === buildingId);

    if (found) {
      selectPlace(found, true);
    }
  }, [buildingId]);

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <View style={styles.root}>
      {/* ── Mapbox Map ─────────────────────────────────────────────────── */}
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MAP_STYLE_URL}
        logoEnabled={false} // Hide the Mapbox logo
        attributionEnabled={false} // Hide the attribution button
        compassEnabled={false} // Hide the compass indicator
        scaleBarEnabled={false} // Hide the scale bar
        pitchEnabled // Allow the user to tilt the map with gestures
      >
        {/* ── Camera controller ───────────────────────────────────────── */}
        {/* In navigation mode the camera follows the user with a high pitch;
            otherwise it centers on the campus. */}
        <MapboxGL.Camera
          ref={cameraRef}
          zoomLevel={mapState === "navigating" ? 18 : 16}
          pitch={mapState === "navigating" ? 60 : 0}
          centerCoordinate={
            mapState === "navigating" ? undefined : CAMPUS_CENTER
          }
          followUserLocation={mapState === "navigating"}
          followUserMode={
            mapState === "navigating"
              ? MapboxGL.UserTrackingMode.FollowWithCourse
              : undefined
          }
          followZoomLevel={18}
          followPitch={60}
          animationMode="flyTo"
          animationDuration={mapState === "navigating" ? 800 : 0}
        />

        {/* ── User location dot with heading arrow ────────────────────── */}
        <MapboxGL.UserLocation visible showsUserHeadingIndicator />

        {/* ── 3D building extrusions ──────────────────────────────────── */}
        {/* Renders buildings from the Mapbox "composite" source as 3D shapes.
            Height and base are read from the vector tile's feature properties. */}
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

        {/* ── Route line overlay ──────────────────────────────────────── */}
        {/* Rendered only when a route has been fetched.
            Draws a rounded polyline in the app's primary color. */}
        {route && (
          <MapboxGL.ShapeSource id="routeSource" shape={route.geometry}>
            <MapboxGL.LineLayer
              id="routeLine"
              style={{
                lineColor: primaryColor,
                lineWidth: 5,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        {/* ── Place markers (annotations) ─────────────────────────────── */}
        {/* One marker per campus place. Each is a dark circle with a blue
            inner dot. Tapping a marker selects it without clearing any
            active route. */}
        {places.map((place) => (
          <MapboxGL.PointAnnotation
            key={place.id}
            id={`marker-${place.id}`}
            coordinate={[place.longitude, place.latitude]}
            onSelected={() => handleAnnotationSelect(place)}
          >
            <View style={styles.markerPin}>
              <View style={styles.markerDot} />
            </View>
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>

      {/* ── Search overlay (hidden during navigation) ──────────────────── */}
      {mapState !== "navigating" && (
        <SafeAreaView style={styles.overlay} pointerEvents="box-none">
          {/* Screen header with back button */}
          <Header title="Map" />

          <View style={styles.searchRow}>
            {/* Search bar with microphone icon on the right */}
            <SearchBar
              placeholder="Search for a building..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setSearchFocused(true)}
              onSearch={(query) => {
                // When the user submits the search (keyboard "Enter"),
                // pick the first matching place.
                const found = places.find((place) =>
                  place.name.toLowerCase().includes(query.toLowerCase()),
                );

                if (found) {
                  handleSearchSelect(found);
                }
              }}
              loading={false}
              rightIcon={<Mic size={18} color={icon} />}
            />

            {/* ── Search results dropdown ──────────────────────────────── */}
            {showDropdown && (
              <View
                style={[
                  styles.dropdown,
                  {
                    backgroundColor: cardColor,
                    borderColor,
                  },
                ]}
              >
                {/* Empty-state message when no places match the query */}
                {searchResults.length === 0 ? (
                  <View style={styles.dropdownEmpty}>
                    <Text
                      style={[
                        styles.dropdownEmptyText,
                        {
                          color: mutedColor,
                        },
                      ]}
                    >
                      No places found
                    </Text>
                  </View>
                ) : (
                  /* Scrollable list of matching places */
                  <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id}
                    keyboardShouldPersistTaps="handled" // Allow tapping results without dismissing the keyboard first
                    ItemSeparatorComponent={() => (
                      <View
                        style={[
                          styles.dropdownSeparator,
                          {
                            backgroundColor: borderColor,
                          },
                        ]}
                      />
                    )}
                    renderItem={({ item }) => (
                      <Pressable
                        style={styles.dropdownItem}
                        onPress={() => handleSearchSelect(item)}
                      >
                        {/* Map pin icon */}
                        <View
                          style={[
                            styles.dropdownIcon,
                            {
                              backgroundColor: "#F3F4F6",
                            },
                          ]}
                        >
                          <MapPin size={16} color={primaryColor} />
                        </View>

                        {/* Place name and description */}
                        <View style={styles.dropdownItemText}>
                          <Text
                            style={[
                              styles.dropdownItemName,
                              {
                                color: textColor,
                              },
                            ]}
                          >
                            {item.name}
                          </Text>

                          <Text
                            style={[
                              styles.dropdownItemDesc,
                              {
                                color: mutedColor,
                              },
                            ]}
                            numberOfLines={1}
                          >
                            {item.description}
                          </Text>
                        </View>

                        {/* Distance label (e.g. "0.3 km") */}
                        <Text
                          style={[
                            styles.dropdownItemDistance,
                            {
                              color: mutedColor,
                            },
                          ]}
                        >
                          {item.distance}
                        </Text>
                      </Pressable>
                    )}
                  />
                )}
              </View>
            )}
          </View>
        </SafeAreaView>
      )}

      {/* ── Full-screen tap target to dismiss the dropdown ─────────────── */}
      {/* Sits below the dropdown (zIndex: 5) but above the map.
          Tapping anywhere outside the dropdown dismisses it. */}
      {showDropdown && (
        <Pressable
          style={styles.dismissOverlay}
          onPress={() => setSearchFocused(false)}
        />
      )}

      {/* ── Bottom sheet (place details / directions / navigation) ─────── */}
      {/* Only rendered when a place is selected. Provides controls for
          viewing info, requesting directions, and starting navigation. */}
      {selectedPlace && (
        <MapBottomSheet
          place={selectedPlace}
          route={route}
          routeLoading={routeLoading}
          onRequestDirections={handleRequestDirections}
          onStartNavigation={handleStartNavigation}
          onStateChange={setMapState}
          onClose={() => {
            // Reset everything when the user closes the sheet
            setSelectedPlace(null);
            setRoute(null);
            setMapState("details");
          }}
        />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  /** Full-screen container; black background shows through any map loading gaps. */
  root: {
    flex: 1,
    backgroundColor: "#000",
  },

  /** The Mapbox MapView fills the entire screen. */
  map: {
    flex: 1,
  },

  /** Absolutely-positioned layer above the map for the header + search bar. */
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  /** Horizontal padding and top spacing for the search bar row. */
  searchRow: {
    paddingHorizontal: 20,
    marginTop: 12,
  },

  /** Search-results dropdown card with rounded corners and a subtle shadow. */
  dropdown: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    maxHeight: 320,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6, // Android shadow equivalent
  },

  /** Centered container shown when the search query matches no places. */
  dropdownEmpty: {
    padding: 20,
    alignItems: "center",
  },

  /** "No places found" text style. */
  dropdownEmptyText: {
    fontSize: 14,
  },

  /** 1px horizontal line between dropdown items, indented past the icon column. */
  dropdownSeparator: {
    height: 1,
    marginLeft: 60,
  },

  /** A single row in the search-results dropdown. */
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },

  /** Rounded square container for the MapPin icon in each result row. */
  dropdownIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  /** Flexible column holding the place name + description text. */
  dropdownItemText: {
    flex: 1,
    gap: 2,
  },

  /** Bold place name in the dropdown row. */
  dropdownItemName: {
    fontSize: 14,
    fontWeight: "600",
  },

  /** Muted description line below the place name. */
  dropdownItemDesc: {
    fontSize: 12,
  },

  /** Distance label aligned to the right of each dropdown row. */
  dropdownItemDistance: {
    fontSize: 12,
    fontWeight: "500",
  },

  /** Invisible full-screen overlay used to detect taps outside the dropdown. */
  dismissOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },

  /** Dark circular marker with a white border, placed at each campus location. */
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

  /** Small blue dot inside the marker pin. */
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4DA8FF",
  },
});
