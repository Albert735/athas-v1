import { Text, View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { SearchBar } from "@/components/ui/searchbar";
import { Mic } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";

const { width, height } = Dimensions.get("window");

export default function Map() {
  const icon = useColor("icon");
  return (
    <View style={styles.root}>
      <View style={styles.map} />
      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <Header title="Map" />

        <View style={styles.searchRow}>
          <SearchBar
            placeholder="Engineering School"
            onSearch={(query) => console.log(query)}
            loading={false}
            rightIcon={<Mic size={18} color={icon} />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FAFB",
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
    bottom: 0,
    zIndex: 10,
  },
  searchRow: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
});
