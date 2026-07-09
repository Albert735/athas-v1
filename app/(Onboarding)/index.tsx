import { Onboarding, useOnboarding } from "@/components/ui/onboarding";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { router } from "expo-router";

export const OnboardingPresets = {
  welcome: [
    {
      id: "welcome",
      title: "Welcome to\nAthas",
      subtitle: "Step 1 / Navigation",
      description:
        "Your smart campus companion for navigating buildings,finding rooms and never being late to class",
      icon: <Text style={{ fontSize: 80 }}>👋</Text>,
    },
    {
      id: "features",
      title: "Ready to\nExplore",
      subtitle: "Step 2 / Explore",
      description:
        "Sync your timetable to automattically find the fastest routes to your next lecture including grass shortcuts and secret corridor links",
      icon: <Text style={{ fontSize: 80 }}>⚡</Text>,
    },
    {
      id: "personalize",
      title: "Smarter\nShortcuts",
      subtitle: "Step 3 / Paths",
      description:
        "Sync your timetable to automattically find the fastest routes to your next lecture including grass shortcuts and secret corridor links",
      icon: <Text style={{ fontSize: 80 }}>🎨</Text>,
    },
  ],
};

export default function OnboardingScreen() {
  const { hasCompletedOnboarding, skipOnboarding } = useOnboarding();

  if (hasCompletedOnboarding) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <Text variant="title">Welcome Back!</Text>
        <Text variant="body">You&apos;ve already completed the onboarding.</Text>
      </View>
    );
  }

  const completeOnboarding = () => {
    router.replace("/(auth)/sign-in");
  };

  return (
    <Onboarding
      steps={OnboardingPresets.welcome}
      onComplete={completeOnboarding}
      onSkip={completeOnboarding}
      showSkip={true}
      showProgress={true}
      swipeEnabled={true}
      primaryButtonText="Get Started"
      skipButtonText="Skip"
      nextButtonText="Next"
      //   backButtonText="Back"
    />
  );
}
