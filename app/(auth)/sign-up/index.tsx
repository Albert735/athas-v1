import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SignUpForm } from "@/components/authentication/sign-up/form";
import { GraduationCap } from "lucide-react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.wrapper}
      >
        {/* Header */}
        <View style={styles.header}>
          <Button
            variant="outline"
            size="sm"
            onPress={() => router.push("/guest")}
          >
            Guest
          </Button>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <GraduationCap size={64} />

          <Text variant="subtitle" style={{ fontSize: 24, fontWeight: "600" }}>
            Athas
          </Text>

          <Text
            variant="caption"
            style={{
              opacity: 0.7,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Navigating your academic journey
          </Text>
        </View>
        <SignUpForm />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  hero: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 40,
    gap: 16,
  },
});
