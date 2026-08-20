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

import { usePlaceSearch } from "@/hooks/usePlaceSearch";

import { getRoute, type RouteResult } from "@/utils/directions";

import { computeDistanceString, computeIsOpen } from "@/utils/place-utils";

import type { SheetState, TransportProfile } from "@/types/map";

import { PlaceSearchDropdown } from "@/components/map/place-search-dropdown";

import MapBottomSheet from "@/components/map/map-bottom-sheet";

const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

type Place = (typeof places)[number];

export default function Map() {
  const primaryColor = useColor("primary");

  const iconColor = useColor("icon");

  const { buildingId } = useLocalSearchParams<{
    buildingId?: string;
  }>();

  const { location: userLocation, error: locationError } = useUserLocation();

  const cameraRef = useRef<MapboxGL.Camera>(null);

  const userLocationRef = useRef<[number, number] | null>(null);

  const requestIdRef = useRef(0);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [sheetState, setSheetState] = useState<SheetState>("details");

  const [route, setRoute] = useState<RouteResult | null>(null);

  const [routeLoading, setRouteLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = usePlaceSearch(searchQuery);

  const showSearchDropdown = searchFocused && searchQuery.trim().length > 0;

  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  useEffect(() => {
    if (!locationError) return;

    Alert.alert(
      "Location Unavailable",
      "Please enable location access so directions can use your current position.",
    );
  }, [locationError]);

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

  const focusPlace = useCallback((place: Place) => {
    cameraRef.current?.setCamera({
      centerCoordinate: [place.longitude, place.latitude],
      zoomLevel: 17,
      pitch: 45,
      animationDuration: 600,
    });
  }, []);

  const openPlace = useCallback(
    (place: Place) => {
      setSelectedPlace(place);
      setRoute(null);
      setSheetState("details");

      setSearchQuery("");
      setSearchFocused(false);

      focusPlace(place);
    },
    [focusPlace],
  );

  const handleSearchSelect = (place: Place) => {
    openPlace(place);
  };

  const handleAnnotationSelect = (place: Place) => {
    openPlace(place);
  };

  const waitForLocation = async (): Promise<[number, number] | null> => {
    if (userLocationRef.current) {
      return userLocationRef.current;
    }

    return new Promise((resolve) => {
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
  };

  const handleRequestDirections = async (
    profile: TransportProfile = "walking",
  ) => {
    if (!selectedPlace) return;

    const requestId = ++requestIdRef.current;

    setRouteLoading(true);

    const origin = await waitForLocation();

    if (!origin) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      setRouteLoading(false);

      Alert.alert(
        "Location Unavailable",
        "We couldn't determine your current location.",
      );

      return;
    }

    const result = await getRoute(
      origin,
      [selectedPlace.longitude, selectedPlace.latitude],
      profile,
    );

    if (requestId !== requestIdRef.current) {
      return;
    }

    setRoute(result);
    setRouteLoading(false);

    if (!result) {
      Alert.alert("No Route", "We couldn't find a route to this location.");

      return;
    }

    const coordinates = result.geometry.coordinates as [number, number][];

    const longitudes = coordinates.map((coordinate) => coordinate[0]);

    const latitudes = coordinates.map((coordinate) => coordinate[1]);

    cameraRef.current?.fitBounds(
      [Math.max(...longitudes), Math.max(...latitudes)],
      [Math.min(...longitudes), Math.min(...latitudes)],
      80,
      900,
    );
  };

  const startNavigation = () => {
    if (!route) return;

    setSearchFocused(false);
    setSearchQuery("");

    setSheetState("navigating");

    cameraRef.current?.setCamera({
      zoomLevel: 18,
      pitch: 60,
      animationDuration: 800,
    });
  };

  const exitNavigation = () => {
    requestIdRef.current++;

    setRoute(null);
    setSheetState("details");

    if (selectedPlace) {
      cameraRef.current?.setCamera({
        centerCoordinate: [selectedPlace.longitude, selectedPlace.latitude],
        zoomLevel: 17,
        pitch: 45,
        animationDuration: 800,
      });
    }
  };

  useEffect(() => {
    if (!buildingId) return;

    const place = places.find((item) => item.id === buildingId);

    if (!place) return;

    openPlace(place);
  }, [buildingId, openPlace]);

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
          zoomLevel={sheetState === "navigating" ? 18 : 16}
          pitch={sheetState === "navigating" ? 60 : 0}
          centerCoordinate={
            sheetState === "navigating" ? undefined : CAMPUS_CENTER
          }
          followUserLocation={sheetState === "navigating"}
          followUserMode={
            sheetState === "navigating"
              ? MapboxGL.UserTrackingMode.FollowWithCourse
              : undefined
          }
          followZoomLevel={18}
          followPitch={60}
          animationMode="flyTo"
          animationDuration={800}
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
          <MapboxGL.ShapeSource id="route-source" shape={route.geometry}>
            <MapboxGL.LineLayer
              id="route-line"
              style={{
                lineColor: primaryColor,

                lineWidth: 6,

                lineCap: "round",

                lineJoin: "round",
              }}
            />
          </MapboxGL.ShapeSource>
        )}

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

      {sheetState !== "navigating" && (
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
              rightIcon={<Mic size={18} color={iconColor} />}
            />

            <PlaceSearchDropdown
              visible={showSearchDropdown}
              results={searchResults}
              onSelect={handleSearchSelect}
            />
          </View>
        </SafeAreaView>
      )}

      {showSearchDropdown && (
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
          onSheetStateChange={(nextState) => {
            if (nextState === "navigating") {
              startNavigation();
              return;
            }

            setSheetState(nextState);
          }}
          onRequestDirections={handleRequestDirections}
          distanceOverride={selectedPlaceDistance}
          isOpenOverride={selectedPlaceIsOpen}
          onNavigationExit={exitNavigation}
          onClose={() => {
            requestIdRef.current++;

            setSelectedPlace(null);

            setRoute(null);

            setSheetState("details");
          }}
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
