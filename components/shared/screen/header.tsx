import { View, StyleSheet, Pressable, type ViewStyle } from "react-native";
import { Text } from "@/components/ui/text";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import type { ReactNode } from "react";

type Props = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  /** 'transparent' for overlaying images (e.g. parallax headers), 'solid' for plain page headers */
  variant?: "transparent" | "solid";
  rightAction?: ReactNode;
};

export function Header({
  title,
  showBack = true,
  onBack,
  variant = "solid",
  rightAction,
}: Props) {
  const isTransparent = variant === "transparent";
  const iconColor = isTransparent ? "#FFF" : "#111";

  return (
    <View style={styles.container}>
      {showBack ? (
        <IconButton
          onPress={onBack ?? (() => router.back())}
          transparent={isTransparent}
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color={iconColor} />
        </IconButton>
      ) : (
        <View style={styles.iconSlot} />
      )}

      <Text
        style={[
          styles.title,
          isTransparent ? styles.titleTransparent : styles.titleSolid,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      <View style={styles.iconSlot}>{rightAction}</View>
    </View>
  );
}

function IconButton({
  children,
  onPress,
  transparent,
  accessibilityLabel,
}: {
  children: ReactNode;
  onPress: () => void;
  transparent: boolean;
  accessibilityLabel: string;
}) {
  const content = (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.iconButton,
        transparent ? styles.iconButtonTransparent : styles.iconButtonSolid,
        pressed && styles.iconButtonPressed,
      ]}
    >
      {children}
    </Pressable>
  );

  if (!transparent) return <View style={styles.iconSlot}>{content}</View>;

  return (
    <View style={styles.iconSlot}>
      <BlurView intensity={40} tint="dark" style={styles.blurWrap}>
        {content}
      </BlurView>
    </View>
  );
}

const ICON_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconSlot: {
    width: ICON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  titleSolid: {
    color: "#111",
  },
  titleTransparent: {
    color: "#FFF",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  blurWrap: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    overflow: "hidden",
  },
  iconButton: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonSolid: {
    backgroundColor: "transparent",
  },
  iconButtonTransparent: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  iconButtonPressed: {
    opacity: 0.6,
  },
});
