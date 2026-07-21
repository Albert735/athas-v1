import { buildingData } from "@/data/buildings";
import { View, Text } from "react-native";

interface Props {
  building: (typeof buildingData)[0];
}

export default function MapDetailsCard({ building }: Props) {
  return (
    <View>
      <Text>{building.name}</Text>
    </View>
  );
}
