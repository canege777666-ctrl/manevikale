import React, { useMemo, useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn } from "react-native-reanimated";

import { GlassCard } from "@/components/GlassCard";
import { useI18n } from "@/context/I18nContext";
import { useReligious } from "@/context/ReligiousContext";
import {
  WIDGET_THEMES,
  WIDGET_FONTS,
  WIDGET_CATEGORIES,
  getThemeById,
  getFontById,
  getCategoryById,
  type WidgetFontId,
  type WidgetCategoryId,
} from "@/constants/widgetThemes";
import { MANEVI_SOZLER } from "@/constants/maneviSozler";

export default function WidgetStudioScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, lang } = useI18n();
  const { isPremium, widget, setWidget } = useReligious();
  const [savedFlash, setSavedFlash] = useState(false);

  const theme = getThemeById(widget.themeId);
  const font = getFontById(widget.fontId as WidgetFontId);
  const category = getCategoryById(widget.categoryId as WidgetCategoryId);

  const previewSoz = useMemo(() => {
    const idx =
      Math.floor(Date.now() / (1000 * 60 * 5)) % MANEVI_SOZLER.length;
    return MANEVI_SOZLER[idx]!;
  }, []);

  const tap = (h: () => void) => {
    if (Platform.OS !== "web") Haptics.selectionAsync();
    h();
  };

  const onSave = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
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
        <View style={styles.headerText}>
          <Text style={styles.title}>{t("widgetStudioTitle")}</Text>
          <Text style={styles.subtitle}>{t("widgetStudioSubtitle")}</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>{t("previewLabel")}</Text>
      <View style={styles.previewWrap}>
        <LinearGradient
          colors={theme.background}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.previewCard}
        >
          <View style={styles.previewHeader}>
            <Text style={[styles.previewBadge, { color: theme.accent }]}>
              {(lang === "en" ? category.nameEn : category.name).toUpperCase()}
            </Text>
            <Ionicons name="sparkles" size={14} color={theme.accent} />
          </View>
          <Text
            style={[
              styles.previewQuote,
              { color: theme.textColor, fontFamily: font.fontFamily },
            ]}
          >
            "{previewSoz.text}"
          </Text>
          {previewSoz.attribution && (
            <Text
              style={[
                styles.previewAttribution,
                { color: theme.mutedTextColor, fontFamily: font.fontFamily },
              ]}
            >
              — {previewSoz.attribution}
            </Text>
          )}
          <View style={styles.previewFooter}>
            <Text style={[styles.previewBrand, { color: theme.mutedTextColor }]}>
              Manevî Kale
            </Text>
            <View style={[styles.previewDot, { backgroundColor: theme.accent }]} />
          </View>
        </LinearGradient>
      </View>

      <Text style={styles.sectionLabel}>{t("themeLabel")}</Text>
      <View style={styles.row}>
        {WIDGET_THEMES.map((th) => {
          const active = widget.themeId === th.id;
          const locked = th.premium && !isPremium;
          return (
            <Pressable
              key={th.id}
              onPress={() =>
                tap(() => {
                  if (!locked) setWidget({ themeId: th.id });
                })
              }
              style={({ pressed }) => [
                styles.themeChip,
                {
                  borderColor: active ? th.accent : "rgba(255,255,255,0.15)",
                  opacity: locked ? 0.55 : pressed ? 0.85 : 1,
                },
              ]}
            >
              <LinearGradient
                colors={th.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.themeSwatch}
              >
                <View style={[styles.themeAccentDot, { backgroundColor: th.accent }]} />
              </LinearGradient>
              <View style={styles.themeMeta}>
                <Text style={styles.themeName}>{th.name}</Text>
                {locked && (
                  <View style={styles.themeLock}>
                    <Ionicons name="lock-closed" size={10} color="#FFD9A8" />
                    <Text style={styles.themeLockText}>{t("premiumThemeLock")}</Text>
                  </View>
                )}
              </View>
              {active && (
                <Ionicons name="checkmark-circle" size={18} color={th.accent} />
              )}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionLabel}>{t("fontLabel")}</Text>
      <View style={styles.optionRow}>
        {WIDGET_FONTS.map((f) => {
          const active = widget.fontId === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => tap(() => setWidget({ fontId: f.id }))}
              style={({ pressed }) => [
                styles.optionChip,
                {
                  borderColor: active ? "#FFD9A8" : "rgba(255,255,255,0.18)",
                  backgroundColor: active
                    ? "rgba(255,217,168,0.16)"
                    : "rgba(255,255,255,0.06)",
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  { fontFamily: f.fontFamily, color: active ? "#ffffff" : "rgba(255,255,255,0.78)" },
                ]}
              >
                {f.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionLabel}>{t("categoryLabel")}</Text>
      <View style={styles.optionRow}>
        {WIDGET_CATEGORIES.map((c) => {
          const active = widget.categoryId === c.id;
          return (
            <Pressable
              key={c.id}
              onPress={() => tap(() => setWidget({ categoryId: c.id }))}
              style={({ pressed }) => [
                styles.optionChip,
                {
                  borderColor: active ? "#FFD9A8" : "rgba(255,255,255,0.18)",
                  backgroundColor: active
                    ? "rgba(255,217,168,0.16)"
                    : "rgba(255,255,255,0.06)",
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: active ? "#ffffff" : "rgba(255,255,255,0.78)" },
                ]}
              >
                {lang === "en" ? c.nameEn : c.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={onSave}
        style={({ pressed }) => [
          styles.saveBtn,
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Ionicons name="checkmark" size={16} color="#1a1033" />
        <Text style={styles.saveText}>{t("saveSettings")}</Text>
      </Pressable>

      {savedFlash && (
        <Animated.View entering={FadeIn.duration(180)}>
          <GlassCard radius={14} style={styles.savedFlash}>
            <Ionicons name="checkmark-circle" size={14} color="#7BE8A6" />
            <Text style={styles.savedFlashText}>{t("settingsSaved")}</Text>
          </GlassCard>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18 },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 18,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  headerText: { flex: 1 },
  title: { fontFamily: "Inter_700Bold", fontSize: 24, color: "#ffffff" },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
  sectionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.6)",
    marginTop: 22,
    marginBottom: 10,
  },
  previewWrap: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  previewCard: { padding: 22, minHeight: 170 },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  previewBadge: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 1.6,
  },
  previewQuote: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "500",
    marginBottom: 10,
  },
  previewAttribution: { fontSize: 12, marginBottom: 8 },
  previewFooter: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previewBrand: { fontSize: 11, letterSpacing: 1, fontFamily: "Inter_500Medium" },
  previewDot: { width: 6, height: 6, borderRadius: 3 },
  row: { gap: 10 },
  themeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  themeSwatch: {
    width: 56,
    height: 40,
    borderRadius: 10,
    padding: 6,
    justifyContent: "flex-end",
  },
  themeAccentDot: { width: 8, height: 8, borderRadius: 4, alignSelf: "flex-end" },
  themeMeta: { flex: 1 },
  themeName: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: "#ffffff" },
  themeLock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  themeLockText: {
    fontFamily: "Inter_500Medium",
    fontSize: 10.5,
    color: "#FFD9A8",
    letterSpacing: 0.4,
  },
  optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  optionText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  saveBtn: {
    marginTop: 26,
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFE6C9",
  },
  saveText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#1a1033",
    letterSpacing: 0.4,
  },
  savedFlash: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: "center",
  },
  savedFlashText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12.5,
    color: "#7BE8A6",
  },
});
