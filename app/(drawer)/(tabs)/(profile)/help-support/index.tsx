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
import { MiniCard } from "@/components/profile/help-and-support/mini-card";

export default function HelpSupport() {
  const icon = useColor("icon");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textMuted = useColor("textMuted");
  const cardColor = useColor("card");
  const borderColor = useColor("border");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Help & Support" showBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SearchBar
          placeholder="Search for anything..."
          onSearch={(query) => console.log(query)}
          loading={false}
          rightIcon={<Mic size={18} color={icon} />}
        />
        <Pressable
          style={[styles.card, { backgroundColor: cardColor, borderColor }]}
        >
          <Headset size={24} color={icon} />
          <Text style={[styles.title, { color: textColor }]}>
            Live Concierge
          </Text>
          <Text style={[styles.description, { color: textMuted }]}>
            Instant human assistance for navigation issues
          </Text>
        </Pressable>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.cardButton,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            <Mail size={24} color={icon} />
            <View>
              <Text style={[styles.title, { color: textColor }]}>
                Email Desk
              </Text>
              <Text style={[styles.description, { color: textMuted }]}>
                Fast Response
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.cardButton,
              { backgroundColor: cardColor, borderColor },
            ]}
          >
            <Info size={24} color={icon} />
            <View>
              <Text style={[styles.title, { color: textColor }]}>
                Report Map Error
              </Text>
              <Text style={[styles.description, { color: textMuted }]}>
                Submit Feedback
              </Text>
            </View>
          </Pressable>
        </View>

        <FlatList
          data={HS_CARD_DATA}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          style={[
            styles.cardContainer,
            { backgroundColor: cardColor, borderColor },
          ]}
          renderItem={({ item }) => (
            <MiniCard
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          )}
        />

        <View style={styles.section}>
          <Text style={[styles.title, { color: textColor }]}>
            Frequently Asked Questions
          </Text>
          <FlatList
            data={FAQData}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Collapsible title={item.question}>
                <Text style={[styles.description, { color: textMuted }]}>
                  {item.answer}
                </Text>
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
    borderRadius: 30,
    borderWidth: 1,
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
    borderRadius: 30,
    borderWidth: 1,
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
    borderRadius: 30,
    borderWidth: 1,
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
  },

  description: {
    fontSize: 12,
  },

  section: {
    marginVertical: 20,
    gap: 16,
  },

  resourcesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },
});
