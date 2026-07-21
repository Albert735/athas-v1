import { Text, View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { useState } from "react";
import MapBottomSheet from "@/components/map/map-bottom-sheet";
import { buildingData } from "@/data/buildings";

const { width, height } = Dimensions.get("window");

const SELECTED_BUILDING = "Balme Library";

export default function Map() {
  const icon = useColor("icon");
  const [selectedBuilding, setSelectedBuilding] = useState(buildingData[2]);

  return (
    <View style={styles.root}>
      <View style={styles.map} />
      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <Header title="Map" />

        <View style={styles.searchRow}>
          <SearchBar
            placeholder="Balme Library"
            onSearch={(query) => console.log(query)}
            loading={false}
            rightIcon={<Mic size={18} color={icon} />}
          />
        </View>
      </SafeAreaView>

      {selectedBuilding && <MapBottomSheet building={selectedBuilding} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "red",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  searchRow: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
});
