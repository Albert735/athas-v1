import { View, Text, TextInput, StyleSheet } from "react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Mic } from "lucide-react-native";

export function AddClassForm() {
  const icon = useColor("icon");

  return (
    <View style={styles.container}>
      {/* Course Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Course Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Mathematics"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="words"
        />
      </View>

      {/* Course Code */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Course Code</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. MATH 101"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="characters"
        />
      </View>

      {/* Building */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Building</Text>
        <SearchBar
          placeholder="Search for a building..."
          onSearch={(query) => console.log(query)}
          loading={false}
          rightIcon={<Mic size={18} color={icon} />}
        />
      </View>

      {/* Room */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Room / Hall</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Room 204"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="words"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    letterSpacing: 0.1,
  },
  input: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111827",
  },
});
