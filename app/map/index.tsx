import { Alert, View, StyleSheet, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

import { useCallback, useEffect, useRef, useState } from "react";

import MapboxGL from "@rnmapbox/maps";

import { Header } from "@/components/shared/screen/header";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";

import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";
import { MAP_STYLE_URL } from "@/constants/mapbox";

import { useUserLocation } from "@/hooks/useUserLocation";

import { getRoute, type RouteResult } from "@/utils/directions";

import { usePlaceSearch } from "@/hooks/usePlaceSearch";

import { computeDistanceString, computeIsOpen } from "@/utils/place-utils";

import type { SheetState, TransportProfile } from "@/types/map";

import { PlaceSearchDropdown } from "@/components/map/place-search-dropdown";
import MapBottomSheet from "@/components/map/map-bottom-sheet";

const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

type Place = (typeof places)[number];

type CameraMode = "normal" | "route" | "navigation";

export default function Map() {
  const icon = useColor("icon");
  const primaryColor = useColor("primary");

  const { buildingId, source = "external" } = useLocalSearchParams<{
    buildingId?: string;
    source?: string;
  }>();

  const { location: userLocation, error: locationError } = useUserLocation();

  const userLocationRef = useRef<[number, number] | null>(null);

  const cameraRef = useRef<MapboxGL.Camera>(null);

  const requestIdRef = useRef(0);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [sheetState, setSheetState] = useState<SheetState>("details");

  const [route, setRoute] = useState<RouteResult | null>(null);

  const [routeLoading, setRouteLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchFocused, setSearchFocused] = useState(false);

  const [cameraMode, setCameraMode] = useState<CameraMode>("normal");

  const searchResults = usePlaceSearch(searchQuery);

  const showDropdown = searchFocused && searchQuery.trim().length > 0;

  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  const selectedPlaceDistance = selectedPlace
    ? computeDistanceString(
        userLocation,
        selectedPlace.latitude,
        selectedPlace.longitude,
        selectedPlace.distance,
      )
    : undefined;

  const selectedPlaceIsOpen = selectedPlace
    ? computeIsOpen(selectedPlace.hours, selectedPlace.days)
    : undefined;

  useEffect(() => {
    if (!locationError) {
      return;
    }

    Alert.alert(
      "Location Unavailable",
      "Please enable location access in Settings so we can show directions from your current position.",
      [{ text: "OK" }],
    );
  }, [locationError]);

  const focusPlace = useCallback((place: Place) => {
    setCameraMode("normal");

    requestAnimationFrame(() => {
      cameraRef.current?.setCamera({
        centerCoordinate: [place.longitude, place.latitude],
        zoomLevel: 17,
        pitch: 45,
        animationDuration: 700,
      });
    });
  }, []);

  /*
   * Search inside the Map screen.
   *
   * Search results should select the place
   * and show the normal Details Card.
   *
   * We DO NOT push /place-sheet here.
   */
  const handleSearchSelect = useCallback(
    (place: Place) => {
      setSelectedPlace(place);
      setSheetState("details");
      setRoute(null);
      setRouteLoading(false);

      setSearchQuery("");
      setSearchFocused(false);

      focusPlace(place);
    },
    [focusPlace],
  );

  /*
   * Annotation taps happen while we are already
   * on the Map screen.
   *
   * Therefore they must NEVER push another sheet.
   *
   * They simply open the Details Card.
   */
  const handleAnnotationSelect = useCallback(
    (place: Place) => {
      requestIdRef.current += 1;

      setSelectedPlace(place);
      setSheetState("details");
      setRoute(null);
      setRouteLoading(false);

      setSearchQuery("");
      setSearchFocused(false);

      focusPlace(place);
    },
    [focusPlace],
  );

  const waitForLocation = useCallback((): Promise<[number, number] | null> => {
    return new Promise((resolve) => {
      if (userLocationRef.current) {
        resolve(userLocationRef.current);
        return;
      }

      const interval = setInterval(() => {
        if (userLocationRef.current) {
          clearInterval(interval);

          resolve(userLocationRef.current);
        }
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        resolve(null);
      }, 5000);
    });
  }, []);

  const fitRouteOnMap = useCallback((result: RouteResult) => {
    const coordinates = result.geometry.coordinates as [number, number][];

    if (!coordinates.length) {
      return;
    }

    const longitudes = coordinates.map((coordinate) => coordinate[0]);

    const latitudes = coordinates.map((coordinate) => coordinate[1]);

    const east = Math.max(...longitudes);

    const west = Math.min(...longitudes);

    const north = Math.max(...latitudes);

    const south = Math.min(...latitudes);

    setCameraMode("route");

    requestAnimationFrame(() => {
      cameraRef.current?.fitBounds([east, north], [west, south], 80, 900);
    });
  }, []);

  const handleRequestDirections = useCallback(
    async (profile: TransportProfile = "walking") => {
      if (!selectedPlace) {
        return;
      }

      const thisRequestId = ++requestIdRef.current;

      setRouteLoading(true);

      const origin = userLocationRef.current ?? (await waitForLocation());

      if (!origin) {
        if (thisRequestId === requestIdRef.current) {
          setRouteLoading(false);
        }

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

      if (thisRequestId !== requestIdRef.current) {
        return;
      }

      setRoute(result);
      setRouteLoading(false);

      if (result) {
        fitRouteOnMap(result);
      }
    },
    [selectedPlace, waitForLocation, fitRouteOnMap],
  );

  const startNavigation = useCallback(() => {
    if (!route) {
      return;
    }

    setCameraMode("navigation");
    setSheetState("navigating");
  }, [route]);

  /*
   * Navigation → Details
   *
   * The selected place stays alive.
   * The route disappears.
   */
  const handleNavigationExit = useCallback(() => {
    requestIdRef.current += 1;

    setRoute(null);
    setRouteLoading(false);

    setSheetState("details");
    setCameraMode("normal");

    requestAnimationFrame(() => {
      cameraRef.current?.setCamera({
        centerCoordinate: selectedPlace
          ? [selectedPlace.longitude, selectedPlace.latitude]
          : CAMPUS_CENTER,

        zoomLevel: 17,
        pitch: 45,
        animationDuration: 800,
      });
    });
  }, [selectedPlace]);

  /*
   * Deep-link / navigation into Map.
   *
   * external:
   *   Explore → Map → Details
   *
   * home:
   *   Home → Map → Directions
   */
  useEffect(() => {
    if (!buildingId) {
      return;
    }

    const found = places.find((place) => place.id === buildingId);

    if (!found) {
      return;
    }

    setSelectedPlace(found);

    setRoute(null);
    setRouteLoading(false);

    setSearchQuery("");
    setSearchFocused(false);

    if (source === "home") {
      setSheetState("directions");

      requestAnimationFrame(() => {
        focusPlace(found);
      });
    } else {
      setSheetState("details");

      requestAnimationFrame(() => {
        focusPlace(found);
      });
    }
  }, [buildingId, source, focusPlace]);

  /*
   * Home → Directions.
   *
   * Automatically fetch the initial
   * walking route.
   */
  useEffect(() => {
    if (source !== "home" || sheetState !== "directions" || !selectedPlace) {
      return;
    }

    if (route || routeLoading) {
      return;
    }

    handleRequestDirections("walking");
  }, [
    source,
    sheetState,
    selectedPlace,
    route,
    routeLoading,
    handleRequestDirections,
  ]);

  const navigationActive = sheetState === "navigating";

  /*
   * Close Details Card.
   *
   * This is NOT navigation back to Home.
   *
   * It simply clears the selected place
   * while staying on the Map.
   *
   * The annotations remain visible.
   */
  const clearSelectedPlace = useCallback(() => {
    requestIdRef.current += 1;

    setSelectedPlace(null);
    setRoute(null);
    setRouteLoading(false);
    setSheetState("details");
    setCameraMode("normal");

    setSearchQuery("");
    setSearchFocused(false);

    requestAnimationFrame(() => {
      cameraRef.current?.setCamera({
        centerCoordinate: CAMPUS_CENTER,
        zoomLevel: 16,
        pitch: 0,
        animationDuration: 600,
      });
    });
  }, []);

  return (
    <View style={styles.root}>
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
          zoomLevel={navigationActive ? 18 : 16}
          pitch={navigationActive ? 60 : 0}
          centerCoordinate={navigationActive ? undefined : CAMPUS_CENTER}
          followUserLocation={navigationActive}
          followUserMode={
            navigationActive
              ? MapboxGL.UserTrackingMode.FollowWithCourse
              : undefined
          }
          followZoomLevel={18}
          followPitch={60}
          animationMode="easeTo"
          animationDuration={700}
        />

        <MapboxGL.UserLocation visible showsUserHeadingIndicator />

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

        {route && (
          <MapboxGL.ShapeSource id="navigationRoute" shape={route.geometry}>
            <MapboxGL.LineLayer
              id="navigationRouteLine"
              style={{
                lineColor: primaryColor,
                lineWidth: navigationActive ? 6 : 5,
                lineCap: "round",
                lineJoin: "round",
                lineOpacity: 0.95,
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        {selectedPlace && (
          <MapboxGL.PointAnnotation
            key={selectedPlace.id}
            id={`marker-${selectedPlace.id}`}
            coordinate={[selectedPlace.longitude, selectedPlace.latitude]}
            onSelected={() => handleAnnotationSelect(selectedPlace)}
          >
            <View style={styles.markerPin}>
              <View style={styles.markerDot} />
            </View>
          </MapboxGL.PointAnnotation>
        )}
      </MapboxGL.MapView>

      {!navigationActive && (
        <SafeAreaView style={styles.overlay} pointerEvents="box-none">
          <Header title="Map" />

          <View style={styles.searchRow}>
            <SearchBar
              placeholder="Search for a building..."
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setSearchFocused(true);
              }}
              onFocus={() => {
                setSearchFocused(true);
              }}
              onSearch={(query) => {
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

            <PlaceSearchDropdown
              visible={showDropdown}
              results={searchResults}
              onSelect={handleSearchSelect}
            />
          </View>
        </SafeAreaView>
      )}

      {showDropdown && (
        <Pressable
          style={styles.dismissOverlay}
          onPress={() => setSearchFocused(false)}
        />
      )}

      {selectedPlace && (
        <MapBottomSheet
          place={selectedPlace}
          route={route}
          routeLoading={routeLoading}
          sheetState={sheetState}
          onSheetStateChange={setSheetState}
          onRequestDirections={handleRequestDirections}
          distanceOverride={selectedPlaceDistance}
          isOpenOverride={selectedPlaceIsOpen}
          onNavigationExit={handleNavigationExit}
          onClose={clearSelectedPlace}
          onStart={startNavigation}
        />
      )}
    </View>
  );
}

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
