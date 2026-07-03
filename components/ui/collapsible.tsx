import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { ChevronDown } from "lucide-react-native";
import { PropsWithChildren, useState } from "react";
import { TouchableOpacity } from "react-native";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <View style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}>
          <Icon name={ChevronDown} size={18} />
        </View>

        <Text variant="subtitle">{title}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{
            marginTop: 6,
            marginLeft: 24,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
}
