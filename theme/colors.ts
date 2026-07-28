import { Platform } from 'react-native';

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const lightColors = {
  // Deep Navy background and surfaces from Tide Guide
  background: '#0D1E36',
  foreground: '#FFFFFF',

  // Semi-transparent deep card containers
  card: '#162A45',
  cardForeground: '#FFFFFF',

  // Popover colors
  popover: '#162A45',
  popoverForeground: '#FFFFFF',

  // Primary Action Accent (Vivid Sky Blue)
  primary: '#0099FF',
  primaryForeground: '#FFFFFF',

  // Secondary colors (Deep Slate Blue)
  secondary: '#1F3757',
  secondaryForeground: '#FFFFFF',

  // Muted states
  muted: 'rgba(255, 255, 255, 0.08)',
  mutedForeground: '#8E9FA8',

  // Accent colors
  accent: '#1F3757',
  accentForeground: '#FFFFFF',

  // Destructive colors
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',

  // Borders & inputs
  border: '#223B5E',
  input: 'rgba(255, 255, 255, 0.08)',
  ring: '#0099FF',

  // Text color roles
  text: '#FFFFFF',
  textMuted: '#8E9FA8',

  // Core color mappings
  tint: '#0099FF',
  icon: '#8E9FA8',
  tabIconDefault: '#8E9FA8',
  tabIconSelected: '#0099FF',

  // Default buttons, links, Send button, selected tabs (Sky Blue)
  blue: '#0099FF',

  // Success states, FaceTime buttons, completed tasks (Teal/Green)
  green: '#10B981',

  // Delete buttons, error states, critical alerts
  red: '#EF4444',

  // VoiceOver highlights, warning states
  orange: '#F59E0B',

  // Notes app accent, Reminders highlights
  yellow: '#FBBF24',

  // Pink accent color
  pink: '#EC4899',

  // Purple accent
  purple: '#8B5CF6',

  // Teal accent
  teal: '#14B8A6',

  // Indigo accent
  indigo: '#6366F1',
};

export const darkColors = {
  // Matching dark theme palette
  background: '#091526',
  foreground: '#FFFFFF',

  // Dark slate cards
  card: '#0F233C',
  cardForeground: '#FFFFFF',

  // Popovers
  popover: '#0F233C',
  popoverForeground: '#FFFFFF',

  // Primary sky blue
  primary: '#0099FF',
  primaryForeground: '#FFFFFF',

  // Secondary slate blue
  secondary: '#182F4D',
  secondaryForeground: '#FFFFFF',

  // Muted states
  muted: 'rgba(255, 255, 255, 0.06)',
  mutedForeground: '#7B8C9C',

  // Accent colors
  accent: '#182F4D',
  accentForeground: '#FFFFFF',

  // Destructive colors
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',

  // Borders & inputs
  border: '#1E3554',
  input: 'rgba(255, 255, 255, 0.06)',
  ring: '#0099FF',

  // Text colors
  text: '#FFFFFF',
  textMuted: '#7B8C9C',

  // Core color mappings
  tint: '#0099FF',
  icon: '#7B8C9C',
  tabIconDefault: '#7B8C9C',
  tabIconSelected: '#0099FF',

  // Color classes
  blue: '#0099FF',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F59E0B',
  yellow: '#FBBF24',
  pink: '#EC4899',
  purple: '#8B5CF6',
  teal: '#14B8A6',
  indigo: '#6366F1',
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};
