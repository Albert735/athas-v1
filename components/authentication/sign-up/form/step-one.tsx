import { View, StyleSheet } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

/** Props received from the parent SignUpForm orchestrator */
type Props = {
  data: any; // Current form data object
  setData: any; // State updater for the shared form data
  onNext: () => void; // Callback to advance to step 2
};

/**
 * StepOne — First step of the sign-up flow.
 *
 * Collects the user's personal and institutional details:
 *   - Full name
 *   - Institutional email (e.g. student@ug.edu.gh)
 *   - University student ID number
 *
 * Each field updates the shared formData via a functional
 * state update to avoid stale closures.
 */
export function StepOne({ data, setData, onNext }: Props) {
  return (
    <View style={styles.container}>
      {/* Full name field */}
      <View style={styles.field}>
        <Text style={styles.label}>FULL NAME</Text>

        <Input
          placeholder="Ama Ella"
          value={data.fullName}
          onChangeText={(text) =>
            setData((prev: any) => ({
              ...prev,
              fullName: text,
            }))
          }
        />
      </View>

      {/* Institutional email field */}
      <View style={styles.field}>
        <Text style={styles.label}>INSTITUTIONAL EMAIL</Text>

        <Input
          placeholder="student@ug.edu.gh"
          value={data.email}
          onChangeText={(text) =>
            setData((prev: any) => ({
              ...prev,
              email: text,
            }))
          }
        />
      </View>

      {/* University ID field */}
      <View style={styles.field}>
        <Text style={styles.label}>UNIVERSITY ID</Text>

        <Input
          placeholder="1119086"
          value={data.universityId}
          onChangeText={(text) =>
            setData((prev: any) => ({
              ...prev,
              universityId: text,
            }))
          }
        />
      </View>

      {/* Proceed to step 2 (password creation) */}
      <Button style={styles.button} onPress={onNext}>
        Next →
      </Button>
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────── */

const styles = StyleSheet.create({
  /** Vertical stack with consistent spacing between fields */
  container: {
    gap: 20,
  },

  /** Individual field wrapper — label + input pair */
  field: {
    gap: 8,
  },

  /** Uppercase label styling for form field headers */
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  /** "Next" button — extra top margin separates it from the fields */
  button: {
    height: 50,
    marginTop: 12,
    marginBottom: 24,
  },
});
