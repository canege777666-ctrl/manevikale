import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlassCard } from "@/components/GlassCard";
import { DUALAR, Dua } from "@/constants/content";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function DuaItem({ dua, index }: { dua: Dua; index: number }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setOpen((v) => !v);
  };

  return (
    <Animated.View entering={FadeInDown.duration(450).delay(120 + index * 40)}>
      <GlassCard radius={24} style={duaStyles.card}>
        <Pressable
          onPress={toggle}
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          <View style={duaStyles.headerRow}>
            <View style={duaStyles.iconCircle}>
              <Ionicons name="rose" size={16} color="#ffffff" />
            </View>
            <View style={duaStyles.titleCol}>
              <Text style={duaStyles.title}>{dua.turkishTitle}</Text>
              <Text style={duaStyles.occasion}>{dua.occasion}</Text>
            </View>
            <Ionicons
              name={open ? "chevron-up" : "chevron-down"}
              size={18}
              color="rgba(255,255,255,0.7)"
            />
          </View>
        </Pressable>

        {open && (
          <View style={duaStyles.body}>
            <View style={duaStyles.divider} />
            <Text style={duaStyles.arabic}>{dua.arabic}</Text>
            <View style={duaStyles.divider} />
            <Text style={duaStyles.translation}>{dua.turkish}</Text>
          </View>
        )}
      </GlassCard>
    </Animated.View>
  );
}

export default function DualarTab() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? Math.max(insets.top, 67) + 8 : insets.top + 12;
  const bottomPad = isWeb ? 84 + 110 : insets.bottom + 110;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad, paddingBottom: bottomPad },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(500)}>
        <View style={styles.header}>
          <Text style={styles.appLabel}>Manevî</Text>
          <Text style={styles.title}>Dualar</Text>
          <Text style={styles.subtitle}>
            Günlük yaşamın her anı için sığınak
          </Text>
        </View>
      </Animated.View>

      <View style={styles.list}>
        {DUALAR.map((dua, idx) => (
          <DuaItem key={dua.id} dua={dua} index={idx} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    gap: 14,
  },
  header: {
    alignItems: "center",
    marginBottom: 6,
  },
  appLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "rgba(255,217,168,0.85)",
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 36,
    color: "#ffffff",
    marginTop: 6,
    letterSpacing: 0.5,
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    marginTop: 4,
    fontStyle: "italic",
  },
  list: {
    gap: 12,
  },
});

const duaStyles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.3)",
  },
  titleCol: {
    flex: 1,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#ffffff",
    letterSpacing: 0.2,
  },
  occasion: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
  body: {
    paddingTop: 6,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 14,
  },
  arabic: {
    fontFamily: "Inter_500Medium",
    fontSize: 22,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 38,
    textShadowColor: "rgba(255,255,255,0.25)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  translation: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.92)",
    lineHeight: 22,
    textAlign: "center",
    fontStyle: "italic",
  },
});
