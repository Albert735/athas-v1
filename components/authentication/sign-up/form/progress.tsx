import { View, StyleSheet, Animated } from "react-native";

type ProgressProps = {
  currentStep: number;
};

export function Progress({ currentStep }: ProgressProps) {
  const steps = [1, 2];

  const primaryColor = "#000";
  const mutedColor = "#D1D5DB";

  return (
    <View style={styles.progressContainer}>
      {steps.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.progressDot,
            {
              width: index + 1 === currentStep ? 24 : 8,
              backgroundColor:
                index + 1 === currentStep ? primaryColor : mutedColor,
              opacity: index + 1 === currentStep ? 1 : 0.4,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },

  progressDot: {
    height: 8,
    borderRadius: 999,
  },
});
