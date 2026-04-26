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
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

import { GlassCard } from "@/components/GlassCard";
import { useI18n } from "@/context/I18nContext";
import { useTTS } from "@/hooks/useTTS";
import {
  MOODS,
  MOOD_CONTENT,
  type MoodId,
  getSuggestionForMood,
} from "@/constants/moods";

export default function KocScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, lang } = useI18n();
  const { isSpeaking, speak, stop } = useTTS();
  const [selected, setSelected] = useState<MoodId | null>(null);
  const [rotation, setRotation] = useState(0);

  const suggestion = useMemo(() => {
    if (!selected) return null;
    return getSuggestionForMood(selected, rotation);
  }, [selected, rotation]);

  const displayText =
    lang === "en" && suggestion?.textEn ? suggestion.textEn : suggestion?.text;
  const displayGuidance =
    lang === "en" && suggestion?.guidanceEn
      ? suggestion.guidanceEn
      : suggestion?.guidance;

  const onSelect = (moodId: MoodId) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    stop();
    setSelected(moodId);
    setRotation(Math.floor(Date.now() / (1000 * 60)));
  };

  const onAnother = () => {
    if (!selected) return;
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    const list = MOOD_CONTENT[selected];
    if (list && list.length > 1) {
      setRotation((r) => r + 1);
    }
  };

  const onSpeak = () => {
    if (!suggestion) return;
    if (isSpeaking) {
      stop();
      return;
    }
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    const speakLang = lang === "en" ? "en-US" : "tr-TR";
    const body = `${displayText ?? ""}. ${displayGuidance ?? ""}`;
    speak(body, { language: speakLang });
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 120 },
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
          <Text style={styles.title}>{t("coachTitle")}</Text>
          <Text style={styles.subtitle}>{t("coachSubtitle")}</Text>
        </View>
      </View>

      <View style={styles.moodGrid}>
        {MOODS.map((mood) => {
          const active = selected === mood.id;
          return (
            <Pressable
              key={mood.id}
              onPress={() => onSelect(mood.id)}
              style={({ pressed }) => [
                styles.moodChip,
                {
                  borderColor: active ? mood.accent : "rgba(255,255,255,0.18)",
                  backgroundColor: active
                    ? `${mood.accent}22`
                    : "rgba(255,255,255,0.06)",
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                },
              ]}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text
                style={[
                  styles.moodLabel,
                  { color: active ? "#ffffff" : "rgba(255,255,255,0.78)" },
                ]}
              >
                {t(mood.labelKey)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {suggestion && (
        <Animated.View
          key={`${selected}-${rotation}`}
          entering={SlideInDown.duration(420).springify().damping(18)}
        >
          <GlassCard radius={24} style={styles.suggestionCard}>
            {suggestion.arabic && (
              <Text style={styles.arabic}>{suggestion.arabic}</Text>
            )}
            <Text style={styles.verse}>"{displayText}"</Text>
            <Text style={styles.reference}>— {suggestion.reference}</Text>

            <View style={styles.divider} />

            <View style={styles.guidanceRow}>
              <Ionicons name="leaf-outline" size={16} color="#9DD9C2" />
              <Text style={styles.guidance}>{displayGuidance}</Text>
            </View>

            <View style={styles.actionsRow}>
              <Pressable
                onPress={onSpeak}
                style={({ pressed }) => [
                  styles.actionBtn,
                  styles.actionPrimary,
                  { opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <Ionicons
                  name={isSpeaking ? "stop" : "volume-high"}
                  size={16}
                  color="#1a1033"
                />
                <Text style={styles.actionPrimaryText}>
                  {isSpeaking ? t("coachStop") : t("coachListenAudio")}
                </Text>
              </Pressable>
              <Pressable
                onPress={onAnother}
                style={({ pressed }) => [
                  styles.actionBtn,
                  styles.actionSecondary,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Ionicons name="refresh" size={16} color="#ffffff" />
                <Text style={styles.actionSecondaryText}>
                  {t("coachAnotherSuggestion")}
                </Text>
              </Pressable>
            </View>
          </GlassCard>
        </Animated.View>
      )}

      {!suggestion && (
        <Animated.View entering={FadeIn.duration(400)}>
          <GlassCard radius={20} style={styles.emptyCard}>
            <Ionicons name="sparkles-outline" size={28} color="rgba(255,255,255,0.55)" />
            <Text style={styles.emptyText}>
              {lang === "en"
                ? "Pick how you feel and receive a verse and guidance for this moment."
                : "Hâlini seç; sana bu an için bir ayet ve rehber sunulsun."}
            </Text>
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
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: "#ffffff",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 22,
  },
  moodChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
  },
  moodEmoji: { fontSize: 18 },
  moodLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
  suggestionCard: { padding: 22 },
  arabic: {
    fontSize: 22,
    color: "#FFD9A8",
    textAlign: "right",
    lineHeight: 36,
    marginBottom: 14,
    fontFamily: Platform.OS === "ios" ? "Geeza Pro" : "serif",
  },
  verse: {
    fontFamily: "Inter_500Medium",
    fontSize: 17,
    lineHeight: 26,
    color: "#ffffff",
    marginBottom: 8,
  },
  reference: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 16,
  },
  guidanceRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 18,
  },
  guidance: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: "rgba(255,255,255,0.85)",
  },
  actionsRow: { flexDirection: "row", gap: 10 },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    flex: 1,
  },
  actionPrimary: { backgroundColor: "#FFE6C9" },
  actionPrimaryText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#1a1033",
    letterSpacing: 0.3,
  },
  actionSecondary: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.2)",
  },
  actionSecondaryText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12.5,
    color: "#ffffff",
  },
  emptyCard: {
    padding: 26,
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
});
