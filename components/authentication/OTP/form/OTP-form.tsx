import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { InputOTP } from "@/components/ui/input-otp";
import { useState } from "react";
import { useColor } from "@/hooks/useColor";

export function OTPForm() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const primary = useColor("primary");

  const handleVerify = async () => {
    if (otp.length < 6) {
      setError("Please enter the full 6-digit code");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // TODO: replace with real OTP verification call
      console.log("Verifying OTP:", otp);
      router.push("/(auth)/reset-password");
    } catch (err) {
      setError("Invalid code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 6-digit OTP input */}
      <View style={styles.field}>
        <InputOTP
          length={6}
          value={otp}
          onChangeText={(value) => {
            setOtp(value);
            if (error) setError("");
          }}
          slotStyle={{
            borderRadius: 18,
            borderWidth: 0.2,
            width: 50,
            height: 50,
            borderColor: error ? "#EF4444" : undefined,
          }}
          showCursor={false}
          onComplete={(value) => {
            console.log("OTP Complete:", value);
          }}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      {/* Submit button */}
      <Button variant="default" onPress={handleVerify} disabled={isSubmitting}>
        {isSubmitting ? "Verifying..." : "Verify and Continue"}
      </Button>

      {/* Resend code prompt */}
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>
          If you didn&apos;t receive a code?{" "}
          <Text style={[styles.footerHighligh, { color: primary }]}>
            Send it again
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 24,
  },
  field: {
    gap: 12,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    textAlign: "center",
  },
  footerContainer: {
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginBottom: "5%",
  },
  footer: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "5%",
  },
  footerHighligh: {
    fontWeight: "700",
    textDecorationLine: "underline",
    fontSize: 12,
    textAlign: "center",
    marginBottom: "5%",
    marginLeft: 5,
  },
});
