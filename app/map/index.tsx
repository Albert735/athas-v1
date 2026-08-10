import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { useState, useRef, useEffect } from "react";
import MapboxGL from "@rnmapbox/maps";
import MapBottomSheet from "@/components/map/map-bottom-sheet";
import { places } from "@/data/places";
import { useLocalSearchParams } from "expo-router";
import { MAP_STYLE_URL } from "@/constants/mapbox";
import { useUserLocation } from "@/hooks/useUserLocation";
import { getRoute, type RouteResult } from "@/utils/directions";

type SheetState = "details" | "directions" | "navigating";

const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

function findBestMatch(query: string) {
  const lower = query.toLowerCase().trim();
  if (!lower) return undefined;
  return (
    places.find((p) => p.name.toLowerCase() === lower) ??
    places.find((p) => p.name.toLowerCase().startsWith(lower)) ??
    places.find((p) => p.name.toLowerCase().includes(lower))
  );
}

export default function Map() {
  const icon = useColor("icon");
  const primaryColor = useColor("primary");
  const { buildingId } = useLocalSearchParams<{ buildingId?: string }>();
  const { location: userLocation } = useUserLocation();

  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[0] | null>(
    null,
  );
  const [mapState, setMapState] = useState<SheetState>("details");
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  const handleMarkerPress = (place: (typeof places)[0]) => {
    cameraRef.current?.setCamera({
      centerCoordinate: [place.longitude, place.latitude],
      zoomLevel: 17,
      animationDuration: 600,
    });
    setSelectedPlace(place);
    setMapState("details");
    setRoute(null);
  };

  const handleRequestDirections = async (
    profile: "walking" | "driving" | "cycling" = "walking",
  ) => {
    if (!selectedPlace || !userLocation) return;
    setRouteLoading(true);
    const result = await getRoute(
      userLocation,
      [selectedPlace.longitude, selectedPlace.latitude],
      profile,
    );
    setRoute(result);
    setRouteLoading(false);

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

  const handleStartNavigation = () => {
    setMapState("navigating");
  };

  useEffect(() => {
    if (buildingId) {
      const found = places.find((p) => p.id === buildingId);
      if (found) handleMarkerPress(found);
    }
  }, [buildingId]);

  return (
    <View style={styles.root}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MAP_STYLE_URL}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled
      >
        <MapboxGL.Camera
          ref={cameraRef}
          zoomLevel={16}
          centerCoordinate={CAMPUS_CENTER}
          animationMode="flyTo"
          animationDuration={0}
        />

        <MapboxGL.UserLocation visible showsUserHeadingIndicator />

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

        {places.map((place) => (
          <MapboxGL.PointAnnotation
            key={place.id}
            id={`marker-${place.id}`}
            coordinate={[place.longitude, place.latitude]}
            onSelected={() => handleMarkerPress(place)}
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
              onSearch={(query) => {
                const found = findBestMatch(query);
                if (found) handleMarkerPress(found);
              }}
              loading={false}
              rightIcon={<Mic size={18} color={icon} />}
            />
          </View>
        </SafeAreaView>
      )}

      {selectedPlace && (
        <MapBottomSheet
          place={selectedPlace}
          route={route}
          routeLoading={routeLoading}
          onRequestDirections={handleRequestDirections}
          onStartNavigation={handleStartNavigation}
          onStateChange={setMapState}
          onClose={() => {
            setSelectedPlace(null);
            setRoute(null);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  map: { flex: 1 },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 },
  searchRow: { paddingHorizontal: 20, marginTop: 12 },
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
