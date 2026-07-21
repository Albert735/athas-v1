import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
} from "react-native";
import { useColor } from "@/hooks/useColor";

export interface BottomSheetProps {
  isVisible?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showHandle?: boolean;
}

export function BottomSheet({
  isVisible = true,
  onClose,
  children,
  style,
  showHandle = true,
}: BottomSheetProps) {
  const cardColor = useColor("card");
  const handleColor = useColor("icon") || "#D1D5DB";

  if (!isVisible) return null;

  return (
    <View style={[styles.container, { backgroundColor: cardColor }, style]}>
      {showHandle && (
        <View style={styles.handleContainer}>
          <View style={[styles.handle, { backgroundColor: handleColor }]} />
        </View>
      )}
      {children}
    </View>
  );
}

export const BottomSheetWrapper = BottomSheet;
export type BottomSheetWrapperProps = BottomSheetProps;

export interface BottomSheetModalProps extends BottomSheetProps {
  onClose: () => void;
}

export function BottomSheetModal({
  isVisible = false,
  onClose,
  children,
  style,
  showHandle = true,
}: BottomSheetModalProps) {
  const cardColor = useColor("card");
  const handleColor = useColor("icon") || "#D1D5DB";

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={[styles.modalSheet, { backgroundColor: cardColor }, style]}>
        {showHandle && (
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: handleColor }]} />
          </View>
        )}
        {children}
      </View>
    </Modal>
  );
}

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 8,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    opacity: 0.5,
  },
});
