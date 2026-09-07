import { Platform } from "react-native";

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },

  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },

  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// -----------------------------------------------------------------------------
// ATHAS COLOR SYSTEM
// Uber-inspired neutral foundation + semantic colors.
//
// Philosophy:
// - Black / white / gray form the UI foundation.
// - Color is reserved for actions, status, categories and maps.
// - Avoid excessive blue UI chrome.
// - Semantic colors should communicate meaning, not decoration.
// -----------------------------------------------------------------------------

export const darkColors = {
  // ---------------------------------------------------------------------------
  // FOUNDATION
  // ---------------------------------------------------------------------------

  background: "#000000",
  foreground: "#FFFFFF",

  card: "#1A1A1A",
  cardForeground: "#FFFFFF",

  popover: "#1A1A1A",
  popoverForeground: "#FFFFFF",

  // ---------------------------------------------------------------------------
  // PRIMARY
  // ---------------------------------------------------------------------------

  // Uber-inspired green for primary actions / navigation states.
  primary: "#06C167",
  primaryForeground: "#000000",

  // ---------------------------------------------------------------------------
  // NEUTRALS
  // ---------------------------------------------------------------------------

  secondary: "#2A2A2A",
  secondaryForeground: "#FFFFFF",

  muted: "#1F1F1F",
  mutedForeground: "#A6A6A6",

  accent: "#2A2A2A",
  accentForeground: "#FFFFFF",

  // ---------------------------------------------------------------------------
  // STATUS
  // ---------------------------------------------------------------------------

  destructive: "#E5484D",
  destructiveForeground: "#FFFFFF",

  success: "#06C167",
  warning: "#FFB749",
  info: "#6B9EFF",

  // ---------------------------------------------------------------------------
  // BORDERS / INPUTS
  // ---------------------------------------------------------------------------

  border: "#2E2E2E",

  input: "#1A1A1A",

  ring: "#FFFFFF",

  // ---------------------------------------------------------------------------
  // TEXT
  // ---------------------------------------------------------------------------

  text: "#FFFFFF",
  textMuted: "#A6A6A6",

  // ---------------------------------------------------------------------------
  // BRAND / UI
  // ---------------------------------------------------------------------------

  tint: "#FFFFFF",

  icon: "#A6A6A6",

  tabIconDefault: "#8F8F8F",
  tabIconSelected: "#FFFFFF",

  // ---------------------------------------------------------------------------
  // SEMANTIC COLORS
  // ---------------------------------------------------------------------------

  blue: "#6B9EFF",
  green: "#06C167",
  red: "#E5484D",
  orange: "#FC823A",
  yellow: "#FFB749",
  pink: "#E88BB6",
  purple: "#9B8AFB",
  teal: "#42B8A6",
  indigo: "#6B7FD7",
};

export const lightColors = {
  // ---------------------------------------------------------------------------
  // FOUNDATION
  // ---------------------------------------------------------------------------

  background: "#FFFFFF",
  foreground: "#000000",

  card: "#FFFFFF",
  cardForeground: "#000000",

  popover: "#FFFFFF",
  popoverForeground: "#000000",

  // ---------------------------------------------------------------------------
  // PRIMARY
  // ---------------------------------------------------------------------------

  primary: "#06C167",
  primaryForeground: "#000000",

  // ---------------------------------------------------------------------------
  // NEUTRALS
  // ---------------------------------------------------------------------------

  secondary: "#F2F2F2",
  secondaryForeground: "#000000",

  muted: "#F5F5F5",
  mutedForeground: "#6B6B6B",

  accent: "#F2F2F2",
  accentForeground: "#000000",

  // ---------------------------------------------------------------------------
  // STATUS
  // ---------------------------------------------------------------------------

  destructive: "#E5484D",
  destructiveForeground: "#FFFFFF",

  success: "#06C167",
  warning: "#D99000",
  info: "#3B78E7",

  // ---------------------------------------------------------------------------
  // BORDERS / INPUTS
  // ---------------------------------------------------------------------------

  border: "#E6E6E6",

  input: "#F5F5F5",

  ring: "#000000",

  // ---------------------------------------------------------------------------
  // TEXT
  // ---------------------------------------------------------------------------

  text: "#000000",
  textMuted: "#6B6B6B",

  // ---------------------------------------------------------------------------
  // BRAND / UI
  // ---------------------------------------------------------------------------

  tint: "#000000",

  icon: "#6B6B6B",

  tabIconDefault: "#737373",
  tabIconSelected: "#000000",

  // ---------------------------------------------------------------------------
  // SEMANTIC COLORS
  // ---------------------------------------------------------------------------

  blue: "#3B78E7",
  green: "#06C167",
  red: "#E5484D",
  orange: "#FC823A",
  yellow: "#D99000",
  pink: "#C85C91",
  purple: "#7956D8",
  teal: "#168F83",
  indigo: "#5968C9",
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};
