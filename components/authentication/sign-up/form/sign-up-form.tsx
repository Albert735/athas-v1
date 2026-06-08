import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text, View } from "react-native";

export function SignUpForm() {
  return (
    <View>
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Button>Sign Up</Button>
    </View>
  );
}
