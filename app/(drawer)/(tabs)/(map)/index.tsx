import { Text, View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { useState } from "react";
import MapBottomSheet from "@/components/map/map-bottom-sheet";
import { buildingData } from "@/data/buildings";
import { MapTurnInstruction } from "@/components/map/map-turn-instruction";
import { MOCK_STEPS } from "@/data/navigation-steps";

type SheetState = "details" | "directions" | "navigating";

export default function Map() {
  const icon = useColor("icon");
  const [selectedBuilding] = useState(buildingData[1]);
  const [mapState, setMapState] = useState<SheetState>("details");
  const [stepIndex] = useState(0);
  const currentStep = MOCK_STEPS[stepIndex];

  return (
    <View style={styles.root}>
      <View style={styles.map} />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        {mapState !== "navigating" && (
          <>
            <Header title="Map" />
            <View style={styles.searchRow}>
              <SearchBar
                placeholder="Search for a building..."
                onSearch={(query) => console.log(query)}
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

      {selectedBuilding ? (
        <MapBottomSheet
          building={selectedBuilding}
          onStateChange={setMapState}
        />
      ) : (
        <></>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#D1D5DB",
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
});
