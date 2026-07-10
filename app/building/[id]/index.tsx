import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

import { Badge } from "@/components/ui/badge";
import { ParallaxScrollView } from "@/components/ui/parallax-scrollview";
import { buildingData } from "@/data/buildings";

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
        <Badge>
          <Text>Open now</Text>
        </Badge>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={buildingData}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <Image
                source={item.image}
                style={{
                  width: 180,
                  height: 150,
                  borderRadius: 12,
                }}
                contentFit="cover"
              />
            )}
          />
        </View>
        <View>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});
