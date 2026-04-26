import React, { useState } from "react";
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
import { PaymentModal } from "@/components/PaymentModal";
import type { Lang } from "@/lib/i18n";

export default function AyarlarScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, lang, setLang } = useI18n();
  const { isPremium, setPremium, use24Hour, setUse24Hour } = useReligious();
  const [showPay, setShowPay] = useState(false);

  const tap = (fn: () => void) => {
    if (Platform.OS !== "web") Haptics.selectionAsync();
    fn();
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 130 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <Ionicons name="chevron-back" size={22} color="#ffffff" />
        </Pressable>
        <Text style={styles.title}>{t("settingsTitle")}</Text>
      </View>

      <Text style={styles.sectionLabel}>{t("settingsLanguage")}</Text>
      <GlassCard radius={18} style={styles.segmentRow}>
        {(["tr", "en"] as Lang[]).map((l) => {
          const active = lang === l;
          return (
            <Pressable
              key={l}
              onPress={() => tap(() => setLang(l))}
              style={({ pressed }) => [
                styles.segment,
                {
                  backgroundColor: active ? "#FFE6C9" : "transparent",
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: active ? "#1a1033" : "rgba(255,255,255,0.78)" },
                ]}
              >
                {l === "tr" ? t("languageTr") : t("languageEn")}
              </Text>
            </Pressable>
          );
        })}
      </GlassCard>

      <Text style={styles.sectionLabel}>{t("settingsClockFormat")}</Text>
      <GlassCard radius={18} style={styles.segmentRow}>
        {[true, false].map((v) => {
          const active = use24Hour === v;
          return (
            <Pressable
              key={v ? "24" : "12"}
              onPress={() => tap(() => setUse24Hour(v))}
              style={({ pressed }) => [
                styles.segment,
                {
                  backgroundColor: active ? "#FFE6C9" : "transparent",
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: active ? "#1a1033" : "rgba(255,255,255,0.78)" },
                ]}
              >
                {v ? t("settingsClock24") : t("settingsClock12")}
              </Text>
            </Pressable>
          );
        })}
      </GlassCard>

      <Text style={styles.sectionLabel}>{t("settingsPremium")}</Text>
      <GlassCard radius={20} style={styles.premiumCard}>
        <View style={styles.premiumHeader}>
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={18} color="#FFD9A8" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.premiumTitle}>{t("premiumTitle")}</Text>
            <Text style={styles.premiumSub}>{t("premiumSubtitle")}</Text>
          </View>
        </View>

        <View style={styles.featList}>
          {[
            "premiumFeatureFullText",
            "premiumFeatureUnlimitedAudio",
            "premiumFeatureExclusiveThemes",
            "premiumFeatureCoachAudio",
            "premiumFeatureAdFree",
          ].map((k) => (
            <View key={k} style={styles.featRow}>
              <Ionicons name="checkmark-circle" size={14} color="#7BE8A6" />
              <Text style={styles.featText}>
                {t(k as Parameters<typeof t>[0])}
              </Text>
            </View>
          ))}
        </View>

        {isPremium ? (
          <View style={styles.activeRow}>
            <Ionicons name="shield-checkmark" size={16} color="#7BE8A6" />
            <Text style={styles.activeText}>{t("settingsPremiumActive")}</Text>
            <Pressable
              onPress={() => tap(() => setPremium(false))}
              style={({ pressed }) => [
                styles.smallBtn,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={styles.smallBtnText}>Reset</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              if (Platform.OS !== "web") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
              setShowPay(true);
            }}
            style={({ pressed }) => [
              styles.payBtn,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Ionicons name="lock-open" size={14} color="#1a1033" />
            <Text style={styles.payText}>{t("settingsPremiumGo")}</Text>
          </Pressable>
        )}
      </GlassCard>

      <PaymentModal
        visible={showPay}
        onDismiss={() => setShowPay(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontFamily: "Inter_700Bold", fontSize: 26, color: "#ffffff" },
  sectionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.6)",
    marginTop: 18,
    marginBottom: 10,
  },
  segmentRow: { flexDirection: "row", padding: 4, gap: 4 },
  segment: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  premiumCard: { padding: 18 },
  premiumHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  premiumBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,217,168,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.4)",
  },
  premiumTitle: { fontFamily: "Inter_700Bold", fontSize: 17, color: "#ffffff" },
  premiumSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  featList: { gap: 8, marginBottom: 16 },
  featRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.88)",
  },
  payBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFE6C9",
  },
  payText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#1a1033",
    letterSpacing: 0.4,
  },
  activeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  activeText: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#7BE8A6",
  },
  smallBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.18)",
  },
  smallBtnText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },
});
