import { StyleSheet, Text, View } from "react-native";
import { GraduationCap } from "lucide-react-native";

export function IDCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>STUDENT IDENTIFICATION</Text>

      <View style={styles.header}>
        <GraduationCap color="#000" size={24} />
        <Text>UNIVERSITY OF GHANA</Text>
      </View>

      <View style={styles.body}>
        <Text>11112222</Text>
        <Text>student@st.ug.edu.gh</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    height: 120,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
