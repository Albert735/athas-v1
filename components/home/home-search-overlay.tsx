import { View, StyleSheet } from "react-native";
import { Mic } from "lucide-react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { PlaceSearchDropdown } from "@/components/map/place-search-dropdown";
import { usePlaceSearch } from "@/hooks/usePlaceSearch";
import { useColor } from "@/hooks/useColor";
import { places } from "@/data/places";

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
  focused: boolean;
  onFocus: () => void;
  onSelect: (place: (typeof places)[0]) => void;
}

export function HomeSearchOverlay({
  query,
  onQueryChange,
  focused,
  onFocus,
  onSelect,
}: Props) {
  const iconColor = useColor("icon");
  const results = usePlaceSearch(query);
  const showDropdown = focused && query.trim().length > 0;

  return (
    <View style={styles.searchRow}>
      <SearchBar
        placeholder="Search for anything..."
        value={query}
        onChangeText={onQueryChange}
        onFocus={onFocus}
        loading={false}
        rightIcon={<Mic size={18} color={iconColor} />}
      />

      {showDropdown && (
        <View style={styles.dropdownAbsolute}>
          <PlaceSearchDropdown
            visible={showDropdown}
            results={results}
            onSelect={onSelect}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    paddingHorizontal: 20,
    marginTop: 12,
    zIndex: 20,
  },
  dropdownAbsolute: {
    position: "absolute",
    top: 56,
    left: 20,
    right: 20,
    zIndex: 21,
  },
});
