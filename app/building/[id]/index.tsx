import { StyleSheet, Text, View, Pressable, Share } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { ParallaxScrollView } from "@/components/ui/parallax-scrollview";
import { places } from "@/data/places";
import { categoryImages } from "@/data/category-images";
import { Brain, FlaskConical, Utensils, ArrowRight } from "lucide-react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/screen/header";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useColor } from "@/hooks/useColor";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BuildingHeaderBadges,
  BuildingStatusBadge,
  BuildingNameBlock,
  BuildingOverviewTab,
  BuildingPhotosTab,
  BuildingReviewsTab,
  BuildingAboutTab,
} from "@/components/building";

const MOCK_REVIEWS = [
  {
    id: "1",
    name: "Ama K.",
    rating: 5,
    comment: "Great study spot, always quiet in the mornings.",
    date: "2 days ago",
  },
  {
    id: "2",
    name: "Kwame T.",
    rating: 4,
    comment: "Good wifi and comfortable seating.",
    date: "1 week ago",
  },
  {
    id: "3",
    name: "Efua B.",
    rating: 5,
    comment: "My favorite place on campus honestly.",
    date: "2 weeks ago",
  },
];

export default function BuildingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const foundPlace = places.find((p) => p.id === id);
  const [isFavorited, setIsFavorited] = useState(false);

  const backgroundColor = useColor("background");
  const iconColor = useColor("icon");
  const mutedColor = useColor("textMuted");

  if (!foundPlace) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <Header title="Not Found" showBack />
        <Text style={{ padding: 20, color: mutedColor }}>Place not found.</Text>
      </SafeAreaView>
    );
  }

  const place = foundPlace;

  const accessibility = [
    {
      id: "1",
      title: "Ramp Access",
      description: "Wheelchair accessible ramps at all entrances",
      icon: (
        <MaterialCommunityIcons
          name="wheelchair-accessibility"
          size={24}
          color={iconColor}
        />
      ),
    },
    {
      id: "2",
      title: "Elevator Access",
      description: "Elevator access to all floors",
      icon: (
        <MaterialCommunityIcons name="elevator" size={24} color={iconColor} />
      ),
    },
    {
      id: "3",
      title: "Restroom Access",
      description: "Restrooms on all floors",
      icon: <MaterialIcons name="wc" size={24} color={iconColor} />,
    },
  ];

  const facilities = [
    {
      id: "1",
      title: "Central Cafeteria",
      description: "Coffee and healthy meal options nearby",
      icon: <Utensils size={20} color={iconColor} />,
    },
    {
      id: "2",
      title: "Study Hub",
      description: "Quiet zones available on-site",
      icon: <Brain size={20} color={iconColor} />,
    },
    {
      id: "3",
      title: "Lab Access",
      description: "ID required for entry",
      icon: <FlaskConical size={20} color={iconColor} />,
    },
  ];

  const image = categoryImages[place.category] ?? categoryImages.library;

  const handleShare = () => {
    Share.share({
      message: `Check out ${place.name} on Athas: https://athas.app/building/${id}`,
      title: "Check out this location",
    });
  };

  return (
    <ParallaxScrollView
      headerHeight={380}
      headerImage={
        <Image
          source={image}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      }
      headerOverlay={
        <>
          <StatusBar style="light" translucent backgroundColor="transparent" />
          <SafeAreaView edges={["top"]}>
            <Header title={place.name} variant="transparent" />
          </SafeAreaView>
        </>
      }
    >
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.badgeRow}>
          <BuildingHeaderBadges
            isFavorited={isFavorited}
            onToggleFavorite={() => setIsFavorited((prev) => !prev)}
            onShare={handleShare}
          />
          <BuildingStatusBadge isOpen={place.isOpen} />
        </View>

        <BuildingNameBlock
          name={place.name}
          rating={4.7}
          reviewCount={MOCK_REVIEWS.length}
          distance={place.distance}
        />

        <Button
          icon={ArrowRight}
          size="sm"
          onPress={() => router.push(`/map?buildingId=${id}`)}
        >
          Navigate
        </Button>

        <Tabs defaultValue="overview" style={{ marginTop: 20 }}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <BuildingOverviewTab
              description={place.description}
              days={place.days}
              hours={place.hours}
              isOpen={place.isOpen}
              facilities={facilities}
            />
          </TabsContent>

          <TabsContent value="photos">
            <BuildingPhotosTab images={[image, image, image, image]} />
          </TabsContent>

          <TabsContent value="reviews">
            <BuildingReviewsTab reviews={MOCK_REVIEWS} />
          </TabsContent>

          <TabsContent value="about">
            <BuildingAboutTab
              description={place.description}
              accessibility={accessibility}
              onContactConcierge={() => {}}
            />
          </TabsContent>
        </Tabs>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16, width: "100%", padding: 20 },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
