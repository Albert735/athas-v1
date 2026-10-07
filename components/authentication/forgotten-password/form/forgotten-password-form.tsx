import { View, StyleSheet, TextInput } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColor } from "@/hooks/useColor";
import { forgotPasswordSchema, type ForgotPasswordData } from "@/schemas/auth";
import { useAuth } from "@/providers/auth-context";
import { getAuthErrorMessage } from "@/services/auth-service";
import { useToast } from "@/components/ui/toast";

export function ForgottenPasswordForm() {
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await resetPassword(data.email);

      // Firebase emails a reset link (no numeric OTP), so we skip the
      // /otp and /reset-password screens and send the student back to sign in.
      toast({
        title: "Check your email",
        description: `If an account exists for ${data.email}, a reset link is on its way.`,
        variant: "success",
      });
      router.replace("/(auth)/sign-in");
    } catch (error) {
      toast({
        title: "Couldn't send reset link",
        description: getAuthErrorMessage(error),
        variant: "error",
      });
    }
  };

  return (
    <View style={styles.container}>
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
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Button
          variant="default"
          icon={SendHorizontal}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  field: {
    gap: 24,
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
});
