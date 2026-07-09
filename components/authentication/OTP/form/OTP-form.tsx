/**
 * OTP Form Component
 * Renders a 6-digit OTP input, a verify button, and a resend code link.
 * On successful verification, navigates to the reset-password screen.
 */
import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { InputOTP } from "@/components/ui/input-otp";
import { useState } from "react";
import { useColor } from "@/hooks/useColor";

export function OTPForm() {
  // Tracks the current OTP digits entered by the user
  const [otp, setOtp] = useState("");

  // Theme-aware primary color for slot borders
  const primary = useColor("primary");

  return (
    <View style={styles.container}>
      {/* 6-digit OTP input — each slot is a rounded box */}
      <View style={styles.field}>
        <InputOTP
          length={6}
          value={otp}
          onChangeText={setOtp}
          slotStyle={{
            borderRadius: 18,
            borderWidth: 0.2,
            width: 50,
            height: 50,
            borderColor: primary,
          }}
          showCursor={false}
          onComplete={(value) => {
            console.log("OTP Complete:", value);
          }}
        />
      </View>

      {/* Submit button — navigates to reset-password on press */}
      <Button
        variant="default"
        onPress={() => {
          router.push("/reset-password");
        }}
      >
        Verify and Continue
      </Button>

      {/* Resend code prompt */}
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>
          If you didn&apos;t receive a code?{" "}
          <Text style={styles.footerHighligh}> Send it again</Text>
        </Text>
      </View>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 24,
  },

  field: {
    gap: 24,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
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
    opacity: 0.5,
    marginBottom: "5%",
  },
  footerHighligh: {
    fontWeight: "700",
    textDecorationLine: "underline",
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: "5%",
    marginLeft: 5,
  },
});
