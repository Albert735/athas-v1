import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  visible: boolean;
  images: any[];
  /** Which image to open on. */
  initialIndex?: number;
  onClose: () => void;
}

/**
 * Full-screen photo viewer: swipe between photos, pinch to zoom (iOS),
 * tap the ✕ or swipe down on the Android back gesture to close.
 */
export function ImageViewer({
  visible,
  images,
  initialIndex = 0,
  onClose,
}: Props) {
  const { width, height } = useWindowDimensions();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(initialIndex);

  // Jump to the tapped photo each time the viewer opens.
  useEffect(() => {
    if (!visible) return;

    setIndex(initialIndex);

    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({ index: initialIndex, animated: false });
    });
  }, [visible, initialIndex]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <FlatList
          ref={listRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => String(i)}
          getItemLayout={(_, i) => ({
            length: width,
            offset: width * i,
            index: i,
          })}
          onMomentumScrollEnd={handleScrollEnd}
          renderItem={({ item }) => (
            <ScrollView
              style={{ width, height }}
              contentContainerStyle={styles.page}
              maximumZoomScale={3}
              minimumZoomScale={1}
              centerContent
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <Image
                source={item}
                style={{ width, height: height * 0.8 }}
                contentFit="contain"
              />
            </ScrollView>
          )}
        />

        <SafeAreaView
          style={styles.topBar}
          edges={["top"]}
          pointerEvents="box-none"
        >
          {images.length > 1 ? (
            <View style={styles.counter}>
              <Text style={styles.counterText}>
                {index + 1} / {images.length}
              </Text>
            </View>
          ) : (
            <View />
          )}

          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Close photo"
          >
            <MaterialIcons name="close" size={22} color="#fff" />
          </Pressable>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
  },

  page: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  counter: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  counterText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
});
