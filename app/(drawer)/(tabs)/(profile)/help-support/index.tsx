import { StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "@/components/ui/scroll-view";
import { Header } from "@/components/shared/screen/header";
import { SearchBar } from "@/components/ui/searchbar";
import { useColor } from "@/hooks/useColor";
import { Headset, Mic, Mail, Info } from "lucide-react-native";
import { Pressable } from "react-native";
import { FAQData } from "@/data/faq";
import { Collapsible } from "@/components/ui/collapsible";
import { HS_CARD_DATA } from "@/data/hs-card-data";
import { MiniCard } from "@/components/profile/Help-and-support/mini-card";

export default function HelpSupport() {
  const icon = useColor("icon");

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Help & Support" showBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SearchBar
          placeholder="Search for anything..."
          onSearch={(query) => console.log(query)}
          loading={false}
          rightIcon={<Mic size={18} color={icon} />}
        />
        <Pressable style={styles.card}>
          <Headset size={24} color={icon} />
          <Text style={styles.title}>Live Concierge</Text>
          <Text style={styles.description}>
            Instant human assistance for navigation issues
          </Text>
        </Pressable>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.cardButton}>
            <Mail size={24} color={icon} />
            <View>
              <Text style={styles.title}>Email Desk</Text>
              <Text style={styles.description}>Fast Response</Text>
            </View>
          </Pressable>

          <Pressable style={styles.cardButton}>
            <Info size={24} color={icon} />
            <View>
              <Text style={styles.title}>Report Map Error</Text>
              <Text style={styles.description}>Submit Feedback</Text>
            </View>
          </Pressable>
        </View>

        <FlatList
          data={HS_CARD_DATA}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          style={styles.cardContainer}
          renderItem={({ item }) => (
            <MiniCard
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          )}
        />

        <View style={styles.section}>
          <Text style={styles.title}>Frequently Asked Questions</Text>
          <FlatList
            data={FAQData}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Collapsible title={item.question}>
                <Text style={styles.description}>{item.answer}</Text>
              </Collapsible>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
    gap: 12,
  },

  card: {
    backgroundColor: "#F7F7F7",
    borderRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
    marginTop: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  },

  cardContainer: {
    gap: 12,
    backgroundColor: "#F7F7F7",
    borderRadius: 30,
    marginVertical: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },

  cardButton: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },

  description: {
    fontSize: 12,
    color: "#6B7280",
  },

  section: {
    marginVertical: 20,
    gap: 16,
  },

  resourcesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 20,
    marginBottom: 12,
  },
});
