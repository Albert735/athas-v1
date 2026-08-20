import { Alert, View, StyleSheet, Pressable } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

import { useEffect, useRef, useState } from "react";

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

export default function Map() {
  const icon = useColor("icon");

  const primaryColor = useColor("primary");

  const { buildingId, startDirections } = useLocalSearchParams<{
    buildingId?: string;
    startDirections?: string;
  }>();

  const { location: userLocation, error: locationError } = useUserLocation();

  const userLocationRef = useRef<[number, number] | null>(null);

  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  const cameraRef = useRef<MapboxGL.Camera>(null);

  const requestIdRef = useRef(0);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const [mapState, setMapState] = useState<SheetState>("details");

  const [route, setRoute] = useState<RouteResult | null>(null);

  const [routeLoading, setRouteLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = usePlaceSearch(searchQuery);

  const showDropdown = searchFocused && searchQuery.trim().length > 0;

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
    if (!locationError) return;

    Alert.alert(
      "Location Unavailable",
      "Please enable location access so directions can use your current position.",
      [{ text: "OK" }],
    );
  }, [locationError]);

  const focusPlace = (place: Place) => {
    cameraRef.current?.setCamera({
      centerCoordinate: [place.longitude, place.latitude],
      zoomLevel: 17,
      pitch: 45,
      animationDuration: 600,
    });
  };

  const openPlaceSheet = (place: Place) => {
    setSelectedPlace(place);
    setMapState("details");
    setRoute(null);

    setSearchQuery("");
    setSearchFocused(false);

    focusPlace(place);

    router.push({
      pathname: "/place-sheet",
      params: {
        id: place.id,
      },
    });
  };

  const handleSearchSelect = (place: Place) => {
    openPlaceSheet(place);
  };

  const handleAnnotationSelect = (place: Place) => {
    openPlaceSheet(place);
  };

  const waitForLocation = (): Promise<[number, number] | null> =>
    new Promise((resolve) => {
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

  const handleRequestDirections = async (
    profile: TransportProfile = "walking",
  ) => {
    if (!selectedPlace) return;

    const requestId = ++requestIdRef.current;

    setRouteLoading(true);

    const origin = userLocationRef.current ?? (await waitForLocation());

    if (!origin) {
      setRouteLoading(false);

      Alert.alert(
        "Location Unavailable",
        "We couldn't determine your current location.",
        [{ text: "OK" }],
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
      Alert.alert("No Route", "We couldn't find a route to this destination.");

      return;
    }

    const coordinates = result.geometry.coordinates as [number, number][];

    const longitudes = coordinates.map((coordinate) => coordinate[0]);

    const latitudes = coordinates.map((coordinate) => coordinate[1]);

    cameraRef.current?.fitBounds(
      [Math.max(...longitudes), Math.max(...latitudes)],
      [Math.min(...longitudes), Math.min(...latitudes)],
      80,
      800,
    );
  };

  const handleStartNavigation = () => {
    if (!route) return;

    setMapState("navigating");
  };

  const handleNavigationExit = () => {
    setRoute(null);
    setMapState("details");

    cameraRef.current?.setCamera({
      centerCoordinate: selectedPlace
        ? [selectedPlace.longitude, selectedPlace.latitude]
        : CAMPUS_CENTER,
      zoomLevel: 17,
      pitch: 45,
      animationDuration: 800,
    });
  };

  /*
   * Open a place when the map receives
   * ?buildingId=...
   */
  useEffect(() => {
    if (!buildingId) return;

    const found = places.find((place) => place.id === buildingId);

    if (!found) return;

    setSelectedPlace(found);

    setSearchQuery("");
    setSearchFocused(false);

    focusPlace(found);

    /*
     * PlaceSheet uses startDirections=true.
     * This means we skip the details state
     * and immediately show the Directions card.
     */
    if (startDirections === "true") {
      setMapState("directions");
    } else {
      setMapState("details");
    }
  }, [buildingId, startDirections]);

  /*
   * Once the selected place and user location
   * are available, automatically request the
   * initial walking route when coming from
   * "Get Directions".
   */
  useEffect(() => {
    if (startDirections !== "true" || !selectedPlace || !userLocation) {
      return;
    }

    handleRequestDirections("walking");
  }, [startDirections, selectedPlace?.id, userLocation]);

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
          <MapboxGL.ShapeSource id="routeSource" shape={route.geometry}>
            <MapboxGL.LineLayer
              id="routeLine"
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

      {mapState !== "navigating" && (
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
          sheetState={mapState}
          onSheetStateChange={setMapState}
          onRequestDirections={handleRequestDirections}
          onNavigationExit={handleNavigationExit}
          distanceOverride={selectedPlaceDistance}
          isOpenOverride={selectedPlaceIsOpen}
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
