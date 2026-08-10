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

// Which "screen" of the bottom sheet is currently showing for the selected place
type SheetState = "details" | "directions" | "navigating";

// Fallback map center (University of Ghana, Legon) used before any place is selected
const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

/**
 * Finds the best matching place for a free-text search query.
 * Tries exact match first, then "starts with", then falls back to "contains" —
 * this avoids e.g. a search for "library" always jumping to the first
 * partial match rather than the most relevant one.
 */
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

  // If we navigated here from Building Details with ?buildingId=25, this reads that param
  const { buildingId } = useLocalSearchParams<{ buildingId?: string }>();

  // The user's live GPS position — used as the route origin
  const { location: userLocation } = useUserLocation();

  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[0] | null>(
    null,
  );
  const [mapState, setMapState] = useState<SheetState>("details");
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);

  // Ref to the Mapbox camera so we can programmatically fly/zoom/fit it
  const cameraRef = useRef<MapboxGL.Camera>(null);

  /**
   * Called whenever a place is selected — either by tapping a marker,
   * searching, or arriving via the buildingId URL param.
   * Flies the camera to it and resets any previous route/state.
   */
  const handleMarkerPress = (place: (typeof places)[0]) => {
    cameraRef.current?.setCamera({
      centerCoordinate: [place.longitude, place.latitude],
      zoomLevel: 17,
      // Tilt the camera when flying to a place — combined with the 3D
      // buildings layer below, this gives a nice angled view of the destination
      pitch: 45,
      animationDuration: 600,
    });
    setSelectedPlace(place);
    setMapState("details"); // always start at the details screen for a newly selected place
    setRoute(null); // clear any stale route from a previous selection
  };

  /**
   * Fetches a real route from the user's current location to the selected place.
   * Called when the user taps "Direction" or switches transport mode.
   */
  const handleRequestDirections = async (
    profile: "walking" | "driving" | "cycling" = "walking",
  ) => {
    if (!selectedPlace || !userLocation) return; // can't route without both endpoints

    setRouteLoading(true);
    const result = await getRoute(
      userLocation,
      [selectedPlace.longitude, selectedPlace.latitude],
      profile,
    );
    setRoute(result);
    setRouteLoading(false);

    // Once we have a route, zoom/pan the camera so the entire path is visible
    if (result) {
      const coords = result.geometry.coordinates as [number, number][];
      const lons = coords.map((c) => c[0]);
      const lats = coords.map((c) => c[1]);
      cameraRef.current?.fitBounds(
        [Math.max(...lons), Math.max(...lats)], // north-east corner of the bounding box
        [Math.min(...lons), Math.min(...lats)], // south-west corner
        60, // padding in points around the bounds
        800, // animation duration in ms
      );
    }
  };

  const handleStartNavigation = () => {
    setMapState("navigating");
  };

  // Auto-select a place if we arrived here via a deep link / navigation param
  // (e.g. tapping "Navigate" on the Building Details screen)
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
        // Lets the user tilt the map with a two-finger drag gesture,
        // needed to actually see the 3D building extrusions at an angle
        pitchEnabled
      >
        {/* Controls what part of the map is visible; ref lets us move it programmatically */}
        <MapboxGL.Camera
          ref={cameraRef}
          zoomLevel={16}
          centerCoordinate={CAMPUS_CENTER}
          animationMode="flyTo"
          animationDuration={0}
        />

        {/* Shows the user's live position as a blue dot with a heading arrow */}
        <MapboxGL.UserLocation visible showsUserHeadingIndicator />

        {/*
          3D Buildings Layer
          ───────────────────
          Extrudes building footprints into 3D shapes using height data
          that's already baked into Mapbox's "streets" vector tiles —
          no extra data source or setup required.

          - sourceID="composite" + sourceLayerID="building" reference
            Mapbox's built-in building layer that ships with the style.
          - minZoomLevel={15} means these only render once the user has
            zoomed in close enough for it to make visual sense — at a
            zoomed-out campus overview, flat 2D footprints look better.
          - fillExtrusionHeight/fillExtrusionBase read each building's
            real height/base values straight from the vector tile data,
            so extrusion heights roughly match real building heights.
        */}

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

        {/* Draws the calculated route as a line, only once a route has been fetched */}
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

        {/* One marker per place in our data — tapping any of them selects that place */}
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

      {/* Header + search bar float over the map, but only when not actively navigating
          (navigation uses the full screen for the route + bottom sheet instructions) */}
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

      {/* Bottom sheet only renders once a place is selected; it internally
          switches between Details / Directions / Navigating views */}
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
