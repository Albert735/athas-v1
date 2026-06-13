import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { Input } from "@/components/ui/input";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Mic, MapPinned } from "lucide-react-native";

import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  OptionType,
} from "@/components/ui/combobox";



import { useState } from "react";

import { lectureHalls } from "@/data/lecture-halls";

export function AddClassForm() {
  const icon = useColor("icon");
  const mutedColor = useColor("textMuted");

  const [hall, setHall] = useState<OptionType | null>(null);

  return (
    <View style={styles.container}>
      {/* Course Name */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: mutedColor }]}>Course Name</Text>
        <Input placeholder="e.g. Mathematics" autoCapitalize="words" />
      </View>

      {/* Course Code */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: mutedColor }]}>Course Code</Text>
        <Input placeholder="e.g. MATH 101" autoCapitalize="characters" />
      </View>

      {/* Building */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: mutedColor }]}>Building</Text>

        <SearchBar
          placeholder="Search for a building..."
          onSearch={(query) => console.log(query)}
          loading={false}
          rightIcon={<Mic size={18} color={icon} />}
        />

        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/building-1.jpg")}
            style={styles.image}
          />

          <View style={styles.imageOverlay}>
            <MapPinned size={18} color="#FFFFFF" />

            <View>
              <Text style={styles.buildingName}>Engineering Block</Text>

              <Text style={styles.buildingSubtitle}>Main Campus</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Room / Hall */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: mutedColor }]}>Room / Hall</Text>

        <Combobox value={hall} onValueChange={setHall}>
          <ComboboxTrigger>
            <ComboboxValue placeholder="Select room or hall" />
          </ComboboxTrigger>

          <ComboboxContent>
            <ComboboxInput placeholder="Search room or hall..." />

            <ComboboxList>
              <ComboboxEmpty>No room or hall found</ComboboxEmpty>

              {lectureHalls.map((item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.1,
  },

  imageContainer: {
    marginTop: 10,
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
  },

  imageOverlay: {
    position: "absolute",
    left: 16,
    bottom: 16,

    flexDirection: "row",
    alignItems: "center",
    gap: 10,

    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
  },

  buildingName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  buildingSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginTop: 2,
  },
});
