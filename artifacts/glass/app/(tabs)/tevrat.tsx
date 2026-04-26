import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlassCard } from "@/components/GlassCard";
import { PremiumLockOverlay } from "@/components/PremiumLockOverlay";
import { TEVRAT_BOOKS } from "@/constants/content";
import { useReligious } from "@/context/ReligiousContext";

export default function TevratTab() {
  const { isPremium } = useReligious();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (!isPremium) {
    return (
      <PremiumLockOverlay
        contentName="Tevrat"
        description="Tevrat'ın tam metnine, Türkçe tercümeleri ve tefsirleriyle birlikte erişmek için Premium üyeliğe geçin."
      />
    );
  }

  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? Math.max(insets.top, 67) + 8 : insets.top + 12;
  const bottomPad = isWeb ? 84 + 110 : insets.bottom + 110;

  const openBook = (id: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(`/scripture/tevrat/${id}`);
  };

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
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={11} color="#1a1033" />
            <Text style={styles.premiumBadgeText}>PREMIUM AKTİF</Text>
          </View>
          <Text style={styles.appLabel}>Eski Ahit</Text>
          <Text style={styles.title}>Tevrat</Text>
          <Text style={styles.subtitle}>
            {TEVRAT_BOOKS.length} kitap · Reklamsız okuma
          </Text>
        </View>
      </Animated.View>

      <View style={styles.list}>
        {TEVRAT_BOOKS.map((book, idx) => {
          const totalVerses = book.chapters.reduce(
            (a, c) => a + c.verses.length,
            0,
          );
          return (
            <Animated.View
              key={book.id}
              entering={FadeInDown.duration(450).delay(120 + idx * 50)}
            >
              <Pressable
                onPress={() => openBook(book.id)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                })}
              >
                <GlassCard radius={24} variant="solid" style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.iconCircle}>
                      <Ionicons name="library" size={16} color="#ffffff" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{book.shortName}</Text>
                      <Text style={styles.cardRef}>{book.fullName}</Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color="rgba(255,255,255,0.55)"
                    />
                  </View>
                  <Text style={styles.description}>{book.description}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaPill}>
                      {book.chapters.length} bölüm
                    </Text>
                    <Text style={styles.metaPill}>{totalVerses} ayet</Text>
                  </View>
                </GlassCard>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 18, gap: 14 },
  header: { alignItems: "center", marginBottom: 6 },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "#FFE6C9",
    marginBottom: 12,
  },
  premiumBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "#1a1033",
    letterSpacing: 1,
  },
  appLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "#FFD9A8",
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 36,
    color: "#ffffff",
    marginTop: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    marginTop: 4,
    fontStyle: "italic",
    textAlign: "center",
  },
  list: { gap: 12 },
  card: { paddingVertical: 18, paddingHorizontal: 20 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.25)",
  },
  cardTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    color: "#ffffff",
    letterSpacing: 0.2,
  },
  cardRef: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#FFD9A8",
    marginTop: 2,
    letterSpacing: 0.3,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(255,255,255,0.78)",
    marginTop: 12,
  },
  metaRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  metaPill: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "rgba(255,255,255,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
});
