import { StyleSheet, View, TextInput } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Badge } from "@/components/ui/badge";
import { useColor } from "@/hooks/useColor";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordData } from "@/schemas/auth";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { label: "8+ Characters", test: (p) => p.length >= 8 },
  { label: "Capital Letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Number", test: (p) => /[0-9]/.test(p) },
  { label: "One Symbol", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export function ResetPasswordForm() {
  const textColor = useColor("text");
  const primary = useColor("primary");
  const backgroundColor = useColor("background");
  const borderColor = useColor("border");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: ResetPasswordData) => {
    console.log("Password reset:", data);
    router.push("/(auth)/sign-in");
  };

  return (
    <View style={styles.container}>
      {/* New password */}
      <View style={styles.field}>
        <Text style={styles.label}>NEW PASSWORD</Text>
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
              placeholder="••••••••"
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

      {/* Password requirement badges — now reactive to input */}
      <View style={styles.passwordRequirements}>
        {PASSWORD_REQUIREMENTS.map((req) => {
          const met = req.test(passwordValue || "");
          return (
            <Badge
              key={req.label}
              variant={met ? "default" : "outline"}
              style={{ paddingHorizontal: 16, paddingVertical: 8 }}
              textStyle={{ fontSize: 12 }}
            >
              {req.label}
            </Badge>
          );
        })}
      </View>

      {/* Confirm password */}
      <View style={styles.field}>
        <Text style={styles.label}>CONFIRM PASSWORD</Text>
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
              placeholder="••••••••"
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
        variant="default"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update Password"}
      </Button>

      <Text style={[styles.footerText, { color: textColor }]}>
        Having trouble?{" "}
        <Text style={[styles.footerLinkText, { color: primary }]}>
          Contact Support
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: { borderColor: "#EF4444" },
  errorText: { color: "#EF4444", fontSize: 13 },
  passwordRequirements: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  footerText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  footerLinkText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
