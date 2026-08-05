import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface Props {
  images: any[];
}

export function BuildingPhotosTab({ images }: Props) {
  return (
    <View style={styles.photoGrid}>
      {images.map((img, i) => (
        <Image
          key={i}
          source={img}
          style={styles.photoGridItem}
          contentFit="cover"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  photoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  photoGridItem: { width: "48%", height: 140, borderRadius: 14 },
});
