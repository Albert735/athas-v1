import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { ParallaxScrollView } from "@/components/ui/parallax-scrollview";

export default function BuildingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ParallaxScrollView
      headerHeight={300}
      headerImage={
        <Image
          source={require("@/assets/images/building-1.jpg")}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      }
    >
      <View style={styles.container}>
        <Text>Your scrollable content goes here...</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
});
