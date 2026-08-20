import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { CORNERS, FONT_SIZE, HEIGHT } from "@/theme/globals";
import { Search, X } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface SearchBarProps extends Omit<TextInputProps, "style"> {
  loading?: boolean;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
}

export function SearchBar({
  loading = false,
  onSearch,
  onClear,
  showClearButton = true,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  placeholder = "Search...",
  value,
  onChangeText,
  onSubmitEditing,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(value || "");

  const cardColor = useColor("card");
  const textColor = useColor("text");
  const muted = useColor("textMuted");
  const icon = useColor("icon");

  const handleTextChange = useCallback(
    (text: string) => {
      setInternalValue(text);
      onChangeText?.(text);
    },
    [onChangeText],
  );

  const handleSubmitEditing = useCallback(
    (event: Parameters<NonNullable<TextInputProps["onSubmitEditing"]>>[0]) => {
      const query = event.nativeEvent.text.trim();

      if (query) {
        onSearch?.(query);
      }

      onSubmitEditing?.(event);
    },
    [onSearch, onSubmitEditing],
  );

  const handleClear = useCallback(() => {
    setInternalValue("");
    onChangeText?.("");
    onClear?.();
  }, [onChangeText, onClear]);

  const baseStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cardColor,
    height: HEIGHT,
    paddingHorizontal: 16,
    borderRadius: CORNERS,
  };

  const baseInputStyle: TextStyle = {
    flex: 1,
    fontSize: FONT_SIZE,
    color: textColor,
    marginHorizontal: 8,
  };

  const displayValue = value !== undefined ? value : internalValue;
  const showClear = showClearButton && displayValue.length > 0;

  return (
    <View style={[baseStyle, containerStyle]}>
      {leftIcon || <Icon name={Search} size={16} color={muted} />}

      <TextInput
        {...props}
        ref={undefined}
        style={[baseInputStyle, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={muted}
        value={displayValue}
        onChangeText={handleTextChange}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="search"
      />

      {loading && (
        <ActivityIndicator
          size="small"
          color={muted}
          style={{ marginRight: 4 }}
        />
      )}

      {showClear && !loading && (
        <TouchableOpacity
          onPress={handleClear}
          style={{
            backgroundColor: icon,
            padding: 4,
            borderRadius: CORNERS,
            opacity: 0.6,
          }}
          activeOpacity={0.7}
        >
          <Icon name={X} size={16} color={cardColor} strokeWidth={2} />
        </TouchableOpacity>
      )}

      {rightIcon && !showClear && !loading && rightIcon}
    </View>
  );
}
// SearchBar with suggestions dropdown
interface SearchBarWithSuggestionsProps extends SearchBarProps {
  suggestions?: string[];
  onSuggestionPress?: (suggestion: string) => void;
  maxSuggestions?: number;
  showSuggestions?: boolean;
}

export function SearchBarWithSuggestions({
  suggestions = [],
  onSuggestionPress,
  maxSuggestions = 5,
  showSuggestions = true,
  containerStyle,
  ...searchBarProps
}: SearchBarWithSuggestionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardColor = useColor("card");
  const borderColor = useColor("border");

  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion
        .toLowerCase()
        .includes((searchBarProps.value || "").toLowerCase()),
    )
    .slice(0, maxSuggestions);

  const shouldShowSuggestions =
    showSuggestions &&
    isExpanded &&
    filteredSuggestions.length > 0 &&
    (searchBarProps.value || "").length > 0;

  const handleSuggestionPress = (suggestion: string) => {
    onSuggestionPress?.(suggestion);
    setIsExpanded(false);
  };

  return (
    <View style={[{ width: "100%" }, containerStyle]}>
      <SearchBar
        {...searchBarProps}
        onFocus={(e) => {
          setIsExpanded(true);
          searchBarProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          // Delay hiding suggestions to allow for suggestion tap
          setTimeout(() => setIsExpanded(false), 150);
          searchBarProps.onBlur?.(e);
        }}
      />

      {/* Suggestions Dropdown */}
      {shouldShowSuggestions && (
        <View
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: cardColor,
            marginTop: 8,
            borderRadius: 12,
            maxHeight: 200,
            zIndex: 999,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={`${suggestion}-${index}`}
              onPress={() => handleSuggestionPress(suggestion)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth:
                  index < filteredSuggestions.length - 1 ? 0.6 : 0,
                borderBottomColor: borderColor,
              }}
              activeOpacity={0.7}
            >
              <Text>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
