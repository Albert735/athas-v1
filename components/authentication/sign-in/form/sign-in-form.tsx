import { Button } from "@/components/ui/button";
import { StyleSheet, View, TextInput } from "react-native";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Checkbox } from "@/components/ui/checkbox";
import { useColor } from "@/hooks/useColor";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "@/schemas/auth";

export function SignInForm() {
  const primaryColor = useColor("primary");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");
  const [checked, setChecked] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignInFormData) => {
    console.log("Sign in data:", data);
    router.replace("/(drawer)/(tabs)/(home)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.fields}>
        {/* Email */}
        <View style={styles.fieldGroup}>
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
                placeholder="student@st.ug.edu.gh"
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

        {/* Password */}
        <View style={styles.fieldGroup}>
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

        {/* Remember me + Forgot password */}
        <View style={styles.row}>
          <View style={styles.rememberMe}>
            <Checkbox
              checked={checked}
              onCheckedChange={() => setChecked(!checked)}
            />
            <Text variant="caption" style={styles.rememberText}>
              Remember me
            </Text>
          </View>
          <Text
            variant="caption"
            style={[styles.forgotText, { color: primaryColor }]}
            onPress={() => router.push("/(auth)/forgotten-password")}
          >
            Forgot Password?
          </Text>
        </View>
      </View>

      <Button
        style={styles.button}
        variant="default"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 28,
    width: "100%",
  },
  fields: {
    gap: 16,
  },
  fieldGroup: {
    gap: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rememberText: {
    fontSize: 12,
  },
  forgotText: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  button: {
    height: 50,
  },
});
