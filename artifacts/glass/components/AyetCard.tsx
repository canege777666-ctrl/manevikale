import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { GlassCard } from "@/components/GlassCard";
import { Ayet } from "@/constants/content";

interface AyetCardProps {
  ayet: Ayet;
}

export function AyetCard({ ayet }: AyetCardProps) {
  return (
    <Animated.View entering={FadeInDown.duration(700).delay(150)}>
      <GlassCard radius={28} style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="book-outline" size={16} color="#ffffff" />
          </View>
          <Text style={styles.label}>Günün Ayeti</Text>
        </View>

        <Text style={styles.arabic} numberOfLines={3} adjustsFontSizeToFit>
          {ayet.arabic}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.translation}>{ayet.turkish}</Text>

        <Text style={styles.reference}>{ayet.reference}</Text>
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
    marginBottom: 16,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.3)",
  },
  label: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  arabic: {
    fontFamily: "Inter_500Medium",
    fontSize: 26,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 44,
    marginVertical: 12,
    textShadowColor: "rgba(255,255,255,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginVertical: 14,
  },
  translation: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: "#ffffff",
    lineHeight: 24,
    textAlign: "center",
    fontStyle: "italic",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  reference: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
    textAlign: "center",
    marginTop: 14,
    letterSpacing: 1,
  },
});
