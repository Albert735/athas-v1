import { View, StyleSheet, TextInput } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColor } from "@/hooks/useColor";
import { stepOneSchema, type StepOneData } from "@/schemas/auth";

type Props = {
  onNext: (data: StepOneData) => void;
};

export function StepOne({ onNext }: Props) {
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: { fullName: "", email: "", universityId: "" },
  });

  return (
    <View style={styles.container}>
      {/* Full Name */}
      <View style={styles.field}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                { backgroundColor, color: textColor, borderColor },
                errors.fullName && styles.inputError,
              ]}
              placeholder="Ama Ella"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.fullName.message}</Text>
        )}
      </View>

      {/* Email */}
      <View style={styles.field}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                { backgroundColor, color: textColor, borderColor },
                errors.email && styles.inputError,
              ]}
              placeholder="student@ug.edu.gh"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      {/* University ID */}
      <View style={styles.field}>
        <Controller
          control={control}
          name="universityId"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                { backgroundColor, color: textColor, borderColor },
                errors.universityId && styles.inputError,
              ]}
              placeholder="1119086"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.universityId && (
          <Text style={styles.errorText}>{errors.universityId.message}</Text>
        )}
      </View>

      <Button style={styles.button} onPress={handleSubmit(onNext)}>
        Next →
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
  button: { height: 50, marginTop: 12, marginBottom: 24 },
});
