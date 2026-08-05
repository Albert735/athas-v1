import { Platform } from "react-native";

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
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
// Refined palette: clean, minimal, low-saturation surfaces + one confident accent.
// Designed for map UIs where the map itself (pins, routes, terrain) should carry
// the color — the chrome around it stays quiet.
// -----------------------------------------------------------------------------

export const darkColors = {
  // Softer, less saturated navy — reads as "ink" rather than "brand blue"
  background: "#0B1420",
  foreground: "#EDEFF2",

  // Cards sit one step up in value, subtle not stark
  card: "#111C2B",
  cardForeground: "#EDEFF2",

  popover: "#111C2B",
  popoverForeground: "#EDEFF2",

  // Primary accent — desaturated sky blue, confident but not neon
  primary: "#4DA8FF",
  primaryForeground: "#0B1420",

  // Secondary — muted steel, close to background so it recedes
  secondary: "#1A2635",
  secondaryForeground: "#EDEFF2",

  // Muted states — softer than pure white overlays
  muted: "#161F2E",
  mutedForeground: "#8A96A3",

  accent: "#1A2635",
  accentForeground: "#EDEFF2",

  // Destructive — muted red-orange, less "alarm," still clear
  destructive: "#E5675B",
  destructiveForeground: "#0B1420",

  border: "#1C2A3B",
  input: "rgba(237, 239, 242, 0.06)",
  ring: "#4DA8FF",

  text: "#EDEFF2",
  textMuted: "#8A96A3",

  tint: "#4DA8FF",
  icon: "#8A96A3",
  tabIconDefault: "#8A96A3",
  tabIconSelected: "#4DA8FF",

  // ---- Semantic / accent set — all desaturated ~15-20% vs. defaults ----
  // Kept distinguishable for map pin categories, but none scream.
  blue: "#4DA8FF", // primary actions, selected tab, current location
  green: "#4CB68C", // success, active route, open now
  red: "#E5675B", // errors, closed, avoid
  orange: "#E0A24D", // warnings, traffic delays
  yellow: "#E0C24D", // caution, saved/starred
  pink: "#D97FA8", // custom pin category
  purple: "#9B87D9", // custom pin category
  teal: "#4DBCB0", // transit / walking routes
  indigo: "#7A85D9", // custom pin category
};

export const lightColors = {
  // Off-white, not pure white — easier on the eye, less glare on a map
  background: "#F7F8FA",
  foreground: "#141A22",

  card: "#FFFFFF",
  cardForeground: "#141A22",

  popover: "#FFFFFF",
  popoverForeground: "#141A22",

  // Same accent hue as dark mode, slightly deepened for contrast on light bg
  primary: "#1E7FE0",
  primaryForeground: "#FFFFFF",

  secondary: "#EDF0F4",
  secondaryForeground: "#141A22",

  muted: "rgba(20, 26, 34, 0.05)",
  mutedForeground: "#6B7684",

  accent: "#EDF0F4",
  accentForeground: "#141A22",

  destructive: "#D9483C",
  destructiveForeground: "#FFFFFF",

  border: "#E2E6EB",
  input: "rgba(20, 26, 34, 0.05)",
  ring: "#1E7FE0",

  text: "#141A22",
  textMuted: "#6B7684",

  tint: "#1E7FE0",
  icon: "#6B7684",
  tabIconDefault: "#6B7684",
  tabIconSelected: "#1E7FE0",

  blue: "#1E7FE0",
  green: "#2F9E76",
  red: "#D9483C",
  orange: "#C98A2E",
  yellow: "#C9A62E",
  pink: "#C15E90",
  purple: "#7C67C9",
  teal: "#2FA69A",
  indigo: "#5D68C9",
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};
