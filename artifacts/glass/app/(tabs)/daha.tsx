import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlassCard } from "@/components/GlassCard";
import { useI18n } from "@/context/I18nContext";
import { useReligious } from "@/context/ReligiousContext";
import type { TKey } from "@/lib/i18n";

interface MenuItem {
  key: string;
  icon: keyof typeof import("@expo/vector-icons/build/Ionicons").default.glyphMap;
  titleKey: TKey;
  descKey: TKey;
  route: string;
  accent: string;
  premium?: boolean;
}

const MENU: MenuItem[] = [
  {
    key: "coach",
    icon: "sparkles",
    titleKey: "menuCoach",
    descKey: "menuCoachDesc",
    route: "/koc",
    accent: "#F4C97A",
  },
  {
    key: "community",
    icon: "people",
    titleKey: "menuCommunity",
    descKey: "menuCommunityDesc",
    route: "/topluluk",
    accent: "#9DD9C2",
  },
  {
    key: "widget",
    icon: "color-palette",
    titleKey: "menuWidget",
    descKey: "menuWidgetDesc",
    route: "/widget-studio",
    accent: "#C29DD9",
  },
  {
    key: "settings",
    icon: "settings",
    titleKey: "menuSettings",
    descKey: "menuSettingsDesc",
    route: "/ayarlar",
    accent: "#A9B5D9",
  },
];

export default function DahaScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const { isPremium } = useReligious();

  const handlePress = (route: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as never);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 130 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{t("moreTitle")}</Text>
      <Text style={styles.subtitle}>{t("moreSubtitle")}</Text>

      <View style={styles.list}>
        {MENU.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => handlePress(item.route)}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
          >
            <GlassCard radius={22} style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: `${item.accent}1F`, borderColor: `${item.accent}55` }]}>
                <Ionicons name={item.icon} size={22} color={item.accent} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{t(item.titleKey)}</Text>
                <Text style={styles.rowDesc}>{t(item.descKey)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.45)" />
            </GlassCard>
          </Pressable>
        ))}
      </View>

      <GlassCard radius={22} style={styles.premiumCard}>
        <View style={styles.premiumHeader}>
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={16} color="#FFD9A8" />
          </View>
          <Text style={styles.premiumTitle}>{t("premiumTitle")}</Text>
        </View>
        <Text style={styles.premiumSubtitle}>{t("premiumSubtitle")}</Text>
        <View style={styles.premiumState}>
          <Ionicons
            name={isPremium ? "checkmark-circle" : "ellipse-outline"}
            size={16}
            color={isPremium ? "#7BE8A6" : "rgba(255,255,255,0.55)"}
          />
          <Text style={[styles.premiumStateText, { color: isPremium ? "#7BE8A6" : "rgba(255,255,255,0.7)" }]}>
            {isPremium ? t("settingsPremiumActive") : t("settingsPremiumGo")}
          </Text>
        </View>
        {!isPremium && (
          <Pressable
            onPress={() => handlePress("/ayarlar")}
            style={({ pressed }) => [
              styles.premiumCta,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.premiumCtaText}>{t("settingsPremiumGo")}</Text>
            <Ionicons name="arrow-forward" size={14} color="#1a1033" />
          </Pressable>
        )}
      </GlassCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18 },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    marginBottom: 20,
  },
  list: { gap: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  rowText: { flex: 1 },
  rowTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#ffffff",
    marginBottom: 2,
  },
  rowDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 16,
  },
  premiumCard: {
    marginTop: 20,
    padding: 18,
  },
  premiumHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  premiumBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,217,168,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.4)",
  },
  premiumTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  premiumSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 12,
  },
  premiumState: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  premiumStateText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
  premiumCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFE6C9",
  },
  premiumCtaText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#1a1033",
    letterSpacing: 0.4,
  },
});
