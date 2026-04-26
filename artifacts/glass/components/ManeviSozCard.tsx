import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { GlassCard } from "@/components/GlassCard";
import { useManeviSoz } from "@/hooks/useManeviSoz";

interface Props {
  onPress?: () => void;
}

export function ManeviSozCard({ onPress }: Props) {
  const soz = useManeviSoz();

  return (
    <Animated.View entering={FadeInDown.duration(700).delay(120)}>
      <GlassCard radius={28} variant="solid" style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="sparkles" size={14} color="#FFD9A8" />
          </View>
          <Text style={styles.label}>Manevî Söz</Text>
          <View style={styles.widgetBadge}>
            <Ionicons name="apps" size={10} color="rgba(255,217,168,0.9)" />
            <Text style={styles.widgetBadgeText}>WIDGET</Text>
          </View>
        </View>

        <Animated.View key={soz.id} entering={FadeIn.duration(550)}>
          <Text style={styles.quote}>{soz.text}</Text>
          {soz.attribution ? (
            <Text style={styles.attribution}>— {soz.attribution}</Text>
          ) : null}
        </Animated.View>

        {onPress ? (
          <Pressable
            onPress={onPress}
            hitSlop={10}
            style={({ pressed }) => [
              styles.viewAll,
              { opacity: pressed ? 0.55 : 1 },
            ]}
          >
            <Text style={styles.viewAllText}>Tüm Sözler</Text>
            <Ionicons name="chevron-forward" size={12} color="rgba(255,255,255,0.7)" />
          </Pressable>
        ) : null}
      </GlassCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 22,
    paddingHorizontal: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,217,168,0.14)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.4)",
  },
  label: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#ffffff",
    letterSpacing: 2.4,
    textTransform: "uppercase",
  },
  widgetBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: "rgba(255,217,168,0.12)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.32)",
  },
  widgetBadgeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: "#FFD9A8",
    letterSpacing: 1.2,
  },
  quote: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    lineHeight: 28,
    color: "#ffffff",
    textAlign: "center",
    fontStyle: "italic",
    paddingHorizontal: 4,
  },
  attribution: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#FFD9A8",
    textAlign: "center",
    marginTop: 10,
    letterSpacing: 0.6,
  },
  viewAll: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 14,
    paddingVertical: 4,
  },
  viewAllText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1,
  },
});
