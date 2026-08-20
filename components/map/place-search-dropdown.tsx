import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { MapPin } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";

interface Props {
  /** Whether the dropdown is visible. When false, renders nothing. */
  visible: boolean;
  /** Filtered search results to display. */
  results: (typeof places)[number][];
  /** Called when the user taps a result row. */
  onSelect: (place: (typeof places)[number]) => void;
}

/** A named, stable separator so FlatList doesn't re-mount it every render. */
function Separator({ borderColor }: { borderColor: string }) {
  return (
    <View style={[styles.separator, { backgroundColor: borderColor }]} />
  );
}

/**
 * Shared search-results dropdown used on both the Home and Map screens.
 * Reads theme colors internally so callers don't need to pass them.
 */
export function PlaceSearchDropdown({ visible, results, onSelect }: Props) {
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");
  const primaryColor = useColor("primary");
  const backgroundColor = useColor("background");

  if (!visible) return null;

  return (
    <View
      style={[styles.dropdown, { backgroundColor: cardColor, borderColor }]}
    >
      {results.length === 0 ? (
        /* Empty state */
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: mutedColor }]}>
            No places found
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Separator borderColor={borderColor} />}
          renderItem={({ item }) => (
            <Pressable style={styles.item} onPress={() => onSelect(item)}>
              {/* Map pin icon in a rounded square */}
              <View
                style={[styles.iconContainer, { backgroundColor }]}
              >
                <MapPin size={16} color={primaryColor} />
              </View>

              {/* Name + description */}
              <View style={styles.itemText}>
                <Text
                  style={[styles.itemName, { color: textColor }]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text
                  style={[styles.itemDesc, { color: mutedColor }]}
                  numberOfLines={1}
                >
                  {item.description}
                </Text>
              </View>

              {/* Static distance label */}
              <Text style={[styles.itemDistance, { color: mutedColor }]}>
                {item.distance}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    maxHeight: 320,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    marginLeft: 60,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
  },
  itemDesc: {
    fontSize: 12,
  },
  itemDistance: {
    fontSize: 12,
    fontWeight: "500",
  },
});
