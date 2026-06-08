import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text, View } from "react-native";

export function SignInForm() {
  return (
    <View>
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Button>Sign In</Button>
    </View>
  );
}
