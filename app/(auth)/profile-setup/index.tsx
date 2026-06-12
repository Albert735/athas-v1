import { View, StyleSheet, Pressable, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Landmark, Map } from "lucide-react-native";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo, useState } from "react";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  OptionType,
} from "@/components/ui/combobox";
import { schools } from "@/data/school";
import { departmentsBySchool } from "@/data/department";
import { router } from "expo-router";

const SPACING = 24;

export default function ProfileSetupScreen() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [school, setSchool] = useState<OptionType | null>(null);
  const [department, setDepartment] = useState<OptionType | null>(null);

  const departments = useMemo(() => {
    if (!school) return [];
    return departmentsBySchool[school.value] ?? [];
  }, [school]);

  const levels = ["Year 1", "Year 2", "Year 3", "Year 4", "Post Graduate"];

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.logo} />

      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 20,
        }}
      >
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Refine Your Map</Text>
          </View>

          <View style={{ gap: 66 }}>
            {/* Department Card */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <Landmark size={20} />
                <Text style={styles.sectionTitle}>Primary Department</Text>
              </View>

              <Text style={styles.description}>
                We'll use this to prioritize academic buildings and resources
                relevant to your field on your map.
              </Text>

              {/* School Combobox */}

              <View>
                <Text style={styles.label}>SCHOOL</Text>

                <Combobox
                  value={school}
                  onValueChange={(val) => {
                    setSchool(val);
                    setDepartment(null);
                  }}
                >
                  <ComboboxTrigger>
                    <ComboboxValue placeholder="Select your school" />
                  </ComboboxTrigger>

                  <ComboboxContent>
                    <ComboboxInput placeholder="Search school..." />

                    <ComboboxList>
                      <ComboboxEmpty>No school found</ComboboxEmpty>

                      {schools.map((s) => (
                        <ComboboxItem key={s.value} value={s.value}>
                          {s.label}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </View>

              {/* Department Combobox */}

              <View>
                <Text style={styles.label}>DEPARTMENT</Text>

                <Combobox
                  value={department}
                  onValueChange={setDepartment}
                  disabled={!school}
                >
                  <ComboboxTrigger>
                    <ComboboxValue
                      placeholder={
                        school ? "Select department" : "Select school first"
                      }
                    />
                  </ComboboxTrigger>

                  <ComboboxContent>
                    <ComboboxInput
                      placeholder={school ? "Search department..." : "Disabled"}
                    />

                    <ComboboxList>
                      {!school ? (
                        <ComboboxEmpty>Select a school first</ComboboxEmpty>
                      ) : departments.length === 0 ? (
                        <ComboboxEmpty>No departments found</ComboboxEmpty>
                      ) : (
                        departments.map((d) => (
                          <ComboboxItem key={d.value} value={d.value}>
                            {d.label}
                          </ComboboxItem>
                        ))
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </View>
            </View>

            {/* Academic Standing */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <Map size={20} />
                <Text style={styles.sectionTitle}>Academic Standing</Text>
              </View>

              <View style={styles.chipContainer}>
                {levels.map((level) => {
                  const selected = selectedLevel === level;

                  return (
                    <Pressable
                      key={level}
                      onPress={() => setSelectedLevel(level)}
                    >
                      <Badge
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                        }}
                        variant={selected ? "default" : "outline"}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            selected && styles.selectedChipText,
                          ]}
                        >
                          {level}
                        </Text>
                      </Badge>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <Button
          style={styles.button}
          onPress={() => {
            router.push("/(tabs)/(home)");
          }}
        >
          Complete Setup
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING,
    alignItems: "center",
  },

  innerContainer: {
    gap: 16,
    width: "100%",
  },

  header: {
    gap: 8,
  },

  logo: {
    width: 40,
    height: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  card: {
    gap: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.7,
  },

  button: {
    height: 52,
    marginTop: "auto",
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },

  selectedChipText: {
    color: "#FFFFFF",
  },
  form: {
    gap: 28,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    opacity: 0.8,
  },
});
