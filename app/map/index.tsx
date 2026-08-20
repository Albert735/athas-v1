import { Alert, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { useState, useRef, useEffect } from "react";
import MapboxGL from "@rnmapbox/maps";
import MapBottomSheet from "@/components/map/map-bottom-sheet";
import { PlaceSearchDropdown } from "@/components/map/place-search-dropdown";
import { places } from "@/data/places";
import { useLocalSearchParams } from "expo-router";
import { MAP_STYLE_URL } from "@/constants/mapbox";
import { useUserLocation } from "@/hooks/useUserLocation";
import { getRoute, type RouteResult } from "@/utils/directions";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";
import { computeDistanceString, computeIsOpen } from "@/utils/place-utils";
import type { SheetState, TransportProfile } from "@/types/map";

// ─── Constants ───────────────────────────────────────────────────────────────

/** Default center coordinate for the campus map [longitude, latitude]. */
const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Map() {
  // ── Theme colors ────────────────────────────────────────────────────────
  const icon = useColor("icon");
  const primaryColor = useColor("primary");

  // ── Route params ─────────────────────────────────────────────────────────
  // If the screen was opened via deep-link `/map?buildingId=xyz`,
  // this will contain the target building's ID.
  const { buildingId } = useLocalSearchParams<{ buildingId?: string }>();

  // ── User location ─────────────────────────────────────────────────────────
  // `location` is [longitude, latitude] or null while loading.
  // `error` is set when the user denies location permission.
  const { location: userLocation, error: locationError } = useUserLocation();

  /**
   * Mirror of userLocation kept in a ref so that async closures (like
   * waitForLocation) always read the *latest* value, not the stale one
   * captured at the time the closure was created. (Fixes Bug #1)
   */
  const userLocationRef = useRef<[number, number] | null>(null);
  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  // ── State ─────────────────────────────────────────────────────────────────

  /** The campus place the user has currently selected. */
  const [selectedPlace, setSelectedPlace] = useState<
    (typeof places)[0] | null
  >(null);

  /**
   * Single source of truth for the bottom-sheet mode. (Fixes Bug #3)
   * Passed down to MapBottomSheet — the child no longer owns its own state.
   */
  const [mapState, setMapState] = useState<SheetState>("details");

  /** The currently-active route geometry + metadata. */
  const [route, setRoute] = useState<RouteResult | null>(null);

  /** True while a directions request is in-flight. */
  const [routeLoading, setRouteLoading] = useState(false);

  /** Current text in the search bar. */
  const [searchQuery, setSearchQuery] = useState("");

  /** Whether the search bar is focused (keyboard visible). */
  const [searchFocused, setSearchFocused] = useState(false);

  // ── Refs ──────────────────────────────────────────────────────────────────

  /** Ref to the Mapbox Camera for imperative viewport animations. */
  const cameraRef = useRef<MapboxGL.Camera>(null);

  /**
   * Monotonically-increasing ID to discard stale direction responses.
   * Each new request bumps this; responses arriving after a newer request
   * was made are silently dropped.
   */
  const requestIdRef = useRef(0);

  // ── Derived values ────────────────────────────────────────────────────────

  /** Filtered + sorted search results, capped at 8 (via shared hook). */
  const searchResults = usePlaceSearch(searchQuery);

  /** Whether to render the search-results dropdown. */
  const showDropdown = searchFocused && searchQuery.trim().length > 0;

  /** Live-computed distance string for the selected place's details card. */
  const selectedPlaceDistance = selectedPlace
    ? computeDistanceString(
        userLocation,
        selectedPlace.latitude,
        selectedPlace.longitude,
        selectedPlace.distance,
      )
    : undefined;

  /** Live-computed open/closed status for the selected place's details card. */
  const selectedPlaceIsOpen = selectedPlace
    ? computeIsOpen(selectedPlace.hours, selectedPlace.days)
    : undefined;

  // ── Alerts ────────────────────────────────────────────────────────────────

  // Show a one-time alert if location permission was denied (Bug #8)
  useEffect(() => {
    if (locationError) {
      Alert.alert(
        "Location Unavailable",
        "Please enable location access in Settings so we can show directions from your current position.",
        [{ text: "OK" }],
      );
    }
  }, [locationError]);

  // ── Event handlers ────────────────────────────────────────────────────────

  /**
   * Selects a place: flies the camera to it, updates state, clears search UI.
   *
   * @param place              The place to select.
   * @param clearExistingRoute If true, any active route is discarded.
   */
  const selectPlace = (
    place: (typeof places)[0],
    clearExistingRoute = false,
  ) => {
    cameraRef.current?.setCamera({
      centerCoordinate: [place.longitude, place.latitude],
      zoomLevel: 17,
      pitch: 45,
      animationDuration: 600,
    });

    setSelectedPlace(place);
    setMapState("details"); // always show the details card first
    setSearchQuery("");
    setSearchFocused(false);

    if (clearExistingRoute) {
      setRoute(null);
    }
  };

  /** Search result tapped — always clears the previous route. */
  const handleSearchSelect = (place: (typeof places)[0]) => {
    selectPlace(place, true);
  };

  /** Map marker tapped — preserves any active route. */
  const handleAnnotationSelect = (place: (typeof places)[0]) => {
    selectPlace(place, false);
  };

  /**
   * Waits up to 5 seconds for a GPS fix using a ref (not a closure) so it
   * always reads the freshest location value. (Fixes Bug #1)
   */
  const waitForLocation = (): Promise<[number, number] | null> =>
    new Promise((resolve) => {
      if (userLocationRef.current) {
        resolve(userLocationRef.current);
        return;
      }

      // Poll the ref — always reflects the latest React state
      const interval = setInterval(() => {
        if (userLocationRef.current) {
          clearInterval(interval);
          resolve(userLocationRef.current);
        }
      }, 200);

      // Hard timeout after 5 seconds
      setTimeout(() => {
        clearInterval(interval);
        resolve(null);
      }, 5000);
    });

  /**
   * Fetches a route to the selected place. Uses a request-ID guard to drop
   * stale responses when the user switches transport modes quickly.
   */
  const handleRequestDirections = async (
    profile: TransportProfile = "walking",
  ) => {
    if (!selectedPlace) return;

    const thisRequestId = ++requestIdRef.current;
    setRouteLoading(true);

    const origin = userLocationRef.current ?? (await waitForLocation());

    if (!origin) {
      setRouteLoading(false);
      Alert.alert(
        "Location Unavailable",
        "We couldn't determine your current location. Please check your settings and try again.",
        [{ text: "OK" }],
      );
      return;
    }

    const result = await getRoute(
      origin,
      [selectedPlace.longitude, selectedPlace.latitude],
      profile,
    );

    // Drop stale response
    if (thisRequestId !== requestIdRef.current) return;

    setRoute(result);
    setRouteLoading(false);

    // Zoom to fit the entire route on screen
    if (result) {
      const coords = result.geometry.coordinates as [number, number][];
      const lons = coords.map((c) => c[0]);
      const lats = coords.map((c) => c[1]);
      cameraRef.current?.fitBounds(
        [Math.max(...lons), Math.max(...lats)],
        [Math.min(...lons), Math.min(...lats)],
        60,
        800,
      );
    }
  };

  /**
   * Called when the user taps Exit during navigation. (Fixes Bug #9)
   * Clears the route and resets the camera to a comfortable overview.
   */
  const handleNavigationExit = () => {
    setRoute(null);
    cameraRef.current?.setCamera({
      centerCoordinate: selectedPlace
        ? [selectedPlace.longitude, selectedPlace.latitude]
        : CAMPUS_CENTER,
      zoomLevel: 17,
      pitch: 45,
      animationDuration: 800,
    });
  };

  // ── Effects ───────────────────────────────────────────────────────────────

  /**
   * Deep-link handler: if opened with `/map?buildingId=...`, auto-select
   * that building and fly the camera to it.
   */
  useEffect(() => {
    if (!buildingId) return;
    const found = places.find((p) => p.id === buildingId);
    if (found) selectPlace(found, true);
  }, [buildingId]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <View style={styles.root}>
      {/* ── Mapbox Map ─────────────────────────────────────────────────── */}
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MAP_STYLE_URL}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
        scaleBarEnabled={false}
        pitchEnabled
      >
        {/* Camera — follows user in navigation mode, centers on campus otherwise */}
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

        <MapboxGL.UserLocation visible showsUserHeadingIndicator />

        {/* 3D building extrusions */}
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

        {/* Route polyline — only rendered when a route is available */}
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

        {/* Place markers — tapping preserves any active route */}
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
          <Header title="Map" />

          <View style={styles.searchRow}>
            <SearchBar
              placeholder="Search for a building..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setSearchFocused(true)}
              onSearch={(query) => {
                const found = places.find((p) =>
                  p.name.toLowerCase().includes(query.toLowerCase()),
                );
                if (found) handleSearchSelect(found);
              }}
              loading={false}
              rightIcon={<Mic size={18} color={icon} />}
            />

            <PlaceSearchDropdown
              visible={showDropdown}
              results={searchResults}
              onSelect={handleSearchSelect}
            />
          </View>
        </SafeAreaView>
      )}

      {/* Dismiss overlay — tapping outside the dropdown closes it */}
      {showDropdown && (
        <Pressable
          style={styles.dismissOverlay}
          onPress={() => setSearchFocused(false)}
        />
      )}

      {/* ── Bottom sheet (details / directions / navigation) ───────────── */}
      {selectedPlace && (
        <MapBottomSheet
          place={selectedPlace}
          route={route}
          routeLoading={routeLoading}
          sheetState={mapState}
          onSheetStateChange={setMapState}
          onRequestDirections={handleRequestDirections}
          distanceOverride={selectedPlaceDistance}
          isOpenOverride={selectedPlaceIsOpen}
          onNavigationExit={handleNavigationExit}
          onClose={() => {
            setSelectedPlace(null);
            setRoute(null);
            setMapState("details");
          }}
        />
      )}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
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
  searchRow: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  dismissOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
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
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4DA8FF",
  },
});
