import { View, StyleSheet, TextInput } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColor } from "@/hooks/useColor";
import { router } from "expo-router";
import { stepTwoSchema, type StepTwoData } from "@/schemas/auth";

type Props = {
  stepOneData: any;
  onBack: () => void;
};

export function StepTwo({ stepOneData, onBack }: Props) {
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: StepTwoData) => {
    const fullData = { ...stepOneData, ...data };
    console.log("Full sign up data:", fullData);
    router.push("/(auth)/profile-setup");
  };

  return (
    <View style={styles.container}>
      {/* Password */}
      <View style={styles.field}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                { backgroundColor, color: textColor, borderColor },
                errors.password && styles.inputError,
              ]}
              placeholder="Min. 8 characters"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>

      {/* Confirm Password */}
      <View style={styles.field}>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                { backgroundColor, color: textColor, borderColor },
                errors.confirmPassword && styles.inputError,
              ]}
              placeholder="Confirm password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}
      </View>

      <Button
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
  field: { gap: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: { borderColor: "#EF4444" },
  errorText: { color: "#EF4444", fontSize: 13 },
  button: { height: 50, marginTop: 12, marginBottom: 32 },
});
