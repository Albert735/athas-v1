import { View, StyleSheet, Animated } from "react-native";

type ProgressProps = {
  currentStep: number; // The active step (1-indexed)
};

/**
 * Progress — A dot-style step indicator for multi-step forms.
 *
 * Renders one dot per step. The active step's dot is wider (pill shape)
 * and fully opaque, while inactive dots are small circles at reduced opacity.
 *
 * Visual behaviour:
 *   Active dot:   width 24, black, full opacity
 *   Inactive dot: width 8,  grey,  40% opacity
 */
export function Progress({ currentStep }: ProgressProps) {
  // Define the total number of steps in the sign-up flow
  const steps = [1, 2];

  // Dot colours
  const primaryColor = "#000"; // Active step
  const mutedColor = "#D1D5DB"; // Inactive step (light grey)

  return (
    <View style={styles.progressContainer}>
      {steps.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.progressDot,
            {
              // Active dot stretches to a pill, inactive stays circular
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

/* ─── Styles ─────────────────────────────────────────── */

const styles = StyleSheet.create({
  /** Horizontally centered row of dots */
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },

  /** Base dot shape — height is fixed, width varies per active state */
  progressDot: {
    height: 8,
    borderRadius: 999, // Fully rounded (pill / circle)
  },
});
