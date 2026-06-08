import { StyleSheet, Text, View } from "react-native";

export default function GuestScreen() {
  return (
    <View style={styles.container}>
      <Text>Guest Mode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
