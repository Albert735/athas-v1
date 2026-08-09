import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { useState, useRef } from "react";
import MapboxGL from "@rnmapbox/maps";
import MapBottomSheet from "@/components/map/map-bottom-sheet";
import { buildingData } from "@/data/buildings";
import { places } from "@/data/places";
import { MapTurnInstruction } from "@/components/map/map-turn-instruction";
import { MOCK_STEPS } from "@/data/navigation-steps";

type SheetState = "details" | "directions" | "navigating";

// University of Ghana, Legon — approximate campus center
const CAMPUS_CENTER: [number, number] = [-0.1869, 5.6508];

export default function Map() {
  const icon = useColor("icon");
  const [selectedBuilding, setSelectedBuilding] = useState<
    (typeof buildingData)[0] | null
  >(null);
  const [mapState, setMapState] = useState<SheetState>("details");
  const [stepIndex] = useState(0);
  const currentStep = MOCK_STEPS[stepIndex];
  const cameraRef = useRef<MapboxGL.Camera>(null);

  const handleMarkerPress = (place: (typeof places)[0]) => {
    cameraRef.current?.setCamera({
      centerCoordinate: [place.longitude, place.latitude],
      zoomLevel: 17,
      animationDuration: 600,
    });
    // Adapt place shape to what MapBottomSheet expects (buildingData shape)
    setSelectedBuilding({
      id: place.id,
      name: place.name,
      image: undefined,
    } as any);
  };

  return (
    <View style={styles.root}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
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

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        {mapState !== "navigating" && (
          <>
            <Header title="Map" />
            <View style={styles.searchRow}>
              <SearchBar
                placeholder="Search for a building..."
                onSearch={(query) => {
                  const found = places.find((p) =>
                    p.name.toLowerCase().includes(query.toLowerCase()),
                  );
                  if (found) handleMarkerPress(found);
                }}
                loading={false}
                rightIcon={<Mic size={18} color={icon} />}
              />
            </View>
          </>
        )}

        {mapState === "navigating" && (
          <View style={styles.searchRow}>
            <MapTurnInstruction step={currentStep} />
          </View>
        )}
      </SafeAreaView>

      {selectedBuilding && (
        <MapBottomSheet
          building={selectedBuilding}
          onStateChange={setMapState}
          onClose={() => setSelectedBuilding(null)}
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
