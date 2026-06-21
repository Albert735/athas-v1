import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScheduledClassListScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.day}>Mon</Text>
        <Text style={styles.date}>14</Text>
      </View>

      {/* active class card  */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: "#050505",
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 65,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  day: {
    fontSize: 10,
    fontWeight: "normal",
    color: "#fff",
  },
  date: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#fff",
  },
});
