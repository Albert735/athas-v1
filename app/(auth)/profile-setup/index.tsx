import { View, StyleSheet, Pressable, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Landmark, Map } from "lucide-react-native";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useMemo } from "react";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { schools } from "@/data/school";
import { departmentsBySchool } from "@/data/department";
import { router } from "expo-router";
import { useColor } from "@/hooks/useColor";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSetupSchema, type ProfileSetupData } from "@/schemas/profile";

const SPACING = 24;

const LEVELS = ["Year 1", "Year 2", "Year 3", "Year 4", "Post Graduate"];

export default function ProfileSetupScreen() {
  const iconColor = useColor("text");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSetupData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: { school: "", department: "", level: "" },
  });

  const selectedSchool = watch("school");

  const departments = useMemo(() => {
    if (!selectedSchool) return [];
    return departmentsBySchool[selectedSchool] ?? [];
  }, [selectedSchool]);

  const onSubmit = async (data: ProfileSetupData) => {
    console.log("Profile setup:", data);
    router.push("/(drawer)/(tabs)/(home)");
  };

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

          <View style={{ gap: 40 }}>
            {/* Department Card */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <Landmark size={20} color={iconColor} />
                <Text style={styles.sectionTitle}>Primary Department</Text>
              </View>

              <Text style={styles.description}>
                We&apos;ll use this to prioritize academic buildings and
                resources relevant to your field on your map.
              </Text>

              {/* School */}
              <View>
                <Text style={styles.label}>SCHOOL</Text>
                <Controller
                  control={control}
                  name="school"
                  render={({ field: { onChange, value } }) => (
                    <Combobox
                      value={value ? { value, label: value } : null}
                      onValueChange={(val) => {
                        onChange(val?.value || "");
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
                  )}
                />
                {errors.school && (
                  <Text style={styles.errorText}>{errors.school.message}</Text>
                )}
              </View>

              {/* Department */}
              <View>
                <Text style={styles.label}>DEPARTMENT</Text>
                <Controller
                  control={control}
                  name="department"
                  render={({ field: { onChange, value } }) => (
                    <Combobox
                      value={value ? { value, label: value } : null}
                      onValueChange={(val) => onChange(val?.value || "")}
                      disabled={!selectedSchool}
                    >
                      <ComboboxTrigger>
                        <ComboboxValue
                          placeholder={
                            selectedSchool
                              ? "Select department"
                              : "Select school first"
                          }
                        />
                      </ComboboxTrigger>
                      <ComboboxContent>
                        <ComboboxInput
                          placeholder={
                            selectedSchool ? "Search department..." : "Disabled"
                          }
                        />
                        <ComboboxList>
                          {!selectedSchool ? (
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
                  )}
                />
                {errors.department && (
                  <Text style={styles.errorText}>
                    {errors.department.message}
                  </Text>
                )}
              </View>
            </View>

            {/* Academic Standing */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <Map size={20} color={iconColor} />
                <Text style={styles.sectionTitle}>Academic Standing</Text>
              </View>

              <Controller
                control={control}
                name="level"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.chipContainer}>
                    {LEVELS.map((level) => {
                      const selected = value === level;
                      return (
                        <Pressable key={level} onPress={() => onChange(level)}>
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
                )}
              />
              {errors.level && (
                <Text style={styles.errorText}>{errors.level.message}</Text>
              )}
            </View>
          </View>
        </View>

        <Button
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Setting up..." : "Complete Setup"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING, alignItems: "center" },
  innerContainer: { gap: 16, width: "100%" },
  header: { gap: 8 },
  logo: { width: 40, height: 40 },
  title: { fontSize: 28, fontWeight: "700" },
  card: { gap: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "600" },
  description: { fontSize: 14, lineHeight: 22, opacity: 0.7 },
  button: { height: 52, marginTop: "auto" },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  chipText: { fontSize: 13, fontWeight: "600" },
  selectedChipText: { color: "#FFFFFF" },
  label: { fontSize: 13, fontWeight: "600", marginBottom: 6, opacity: 0.8 },
  errorText: { color: "#EF4444", fontSize: 13, marginTop: 6 },
});
