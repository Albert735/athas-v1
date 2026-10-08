import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";

interface Props {
  images: any[];
  /** Called with the index of the photo that was tapped. */
  onImagePress?: (index: number) => void;
}

export function BuildingPhotosTab({ images, onImagePress }: Props) {
  return (
    <View style={styles.photoGrid}>
      {images.map((img, i) => (
        <Pressable
          key={i}
          style={styles.photoGridItem}
          onPress={() => onImagePress?.(i)}
          accessibilityRole="imagebutton"
          accessibilityLabel={`Open photo ${i + 1}`}
        >
          <Image source={img} style={styles.photo} contentFit="cover" />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  photoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  photoGridItem: {
    width: "48%",
    height: 140,
    borderRadius: 14,
    overflow: "hidden",
  },
  photo: { width: "100%", height: "100%" },
});
