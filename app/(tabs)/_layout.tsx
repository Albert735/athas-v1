import { Platform } from "react-native";
import { useColor } from "@/hooks/useColor";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import Feather from "@expo/vector-icons/Feather";
import {
  Badge,
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  const red = useColor("red");
  const primary = useColor("primary");
  const foreground = useColor("foreground");

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      labelStyle={{
        default: {
          color: primary,
        },
        selected: {
          color: foreground,
        },
      }}
      iconColor={{
        default: primary,
        selected: foreground,
      }}
      badgeBackgroundColor={red}
      labelVisibilityMode="unlabeled"
      disableTransparentOnScrollEdge
    >
      {/* Home */}
      <NativeTabs.Trigger name="(home)">
        {Platform.select({
          ios: <Icon sf="house.fill" />,
          android: <Icon src={<VectorIcon family={Feather} name="home" />} />,
        })}
        <Label>Home</Label>
      </NativeTabs.Trigger>

      {/* Schedule */}
      <NativeTabs.Trigger name="(schedule)">
        {Platform.select({
          ios: <Icon sf="calendar" />,
          android: (
            <Icon src={<VectorIcon family={Feather} name="calendar" />} />
          ),
        })}
        <Label>Schedule</Label>
      </NativeTabs.Trigger>

      {/* Map */}
      <NativeTabs.Trigger
        name="(map)"
        role={isLiquidGlassAvailable() ? "search" : undefined}
      >
        {Platform.select({
          ios: <Icon sf="map" />,
          android: <Icon src={<VectorIcon family={Feather} name="map" />} />,
        })}
        <Label>Map</Label>
      </NativeTabs.Trigger>

      {/* Favourite */}
      <NativeTabs.Trigger name="(favourite)">
        {Platform.select({
          ios: <Icon sf="heart" />,
          android: <Icon src={<VectorIcon family={Feather} name="heart" />} />,
        })}
        <Label>Favourite</Label>
        <Badge>1</Badge>
      </NativeTabs.Trigger>

      {/* Profile */}
      <NativeTabs.Trigger name="(profile)">
        {Platform.select({
          ios: <Icon sf="person.crop.circle" />,
          android: <Icon src={<VectorIcon family={Feather} name="user" />} />,
        })}
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
