import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";

import { GlassCard } from "@/components/GlassCard";
import { useI18n } from "@/context/I18nContext";
import { getAnonId } from "@/lib/anonId";
import {
  createPrayer,
  listPrayers,
  reactToPrayer,
  type Prayer,
} from "@/services/prayerApi";

function formatRelative(ts: number, lang: "tr" | "en"): string {
  const diffSec = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (diffSec < 60) return lang === "en" ? `${diffSec}s ago` : `${diffSec}s önce`;
  const m = Math.floor(diffSec / 60);
  if (m < 60) return lang === "en" ? `${m}m ago` : `${m}d önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return lang === "en" ? `${h}h ago` : `${h}sa önce`;
  const d = Math.floor(h / 24);
  return lang === "en" ? `${d}d ago` : `${d}g önce`;
}

export default function ToplulukScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, lang } = useI18n();
  const [anonId, setAnonId] = useState<string>("");
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const id = await getAnonId();
      if (!active) return;
      setAnonId(id);
      load(id);
    })();
    return () => {
      active = false;
    };
  }, []);

  const load = useCallback(async (id: string) => {
    try {
      setError(null);
      const data = await listPrayers(id);
      setPrayers(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Bağlantı hatası";
      setError(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    if (!anonId) return;
    setRefreshing(true);
    load(anonId);
  }, [anonId, load]);

  const submit = async () => {
    if (!anonId || draft.trim().length < 4 || posting) return;
    setPosting(true);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    try {
      const created = await createPrayer(anonId, draft);
      setPrayers((curr) => [created, ...curr]);
      setDraft("");
      setComposing(false);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Hata";
      setError(msg);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } finally {
      setPosting(false);
    }
  };

  const react = async (id: string, reaction: "amen" | "heart") => {
    if (!anonId) return;
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setPrayers((curr) =>
      curr.map((p) => {
        if (p.id !== id) return p;
        if (reaction === "amen") {
          const has = p.hasAmened;
          return {
            ...p,
            hasAmened: !has,
            amenCount: has ? Math.max(0, p.amenCount - 1) : p.amenCount + 1,
          };
        }
        const has = p.hasHearted;
        return {
          ...p,
          hasHearted: !has,
          heartCount: has ? Math.max(0, p.heartCount - 1) : p.heartCount + 1,
        };
      }),
    );
    try {
      await reactToPrayer(anonId, id, reaction);
    } catch {
      setPrayers((curr) =>
        curr.map((p) => {
          if (p.id !== id) return p;
          if (reaction === "amen") {
            const has = !p.hasAmened;
            return {
              ...p,
              hasAmened: !p.hasAmened,
              amenCount: has ? Math.max(0, p.amenCount - 1) : p.amenCount + 1,
            };
          }
          const has = !p.hasHearted;
          return {
            ...p,
            hasHearted: !p.hasHearted,
            heartCount: has ? Math.max(0, p.heartCount - 1) : p.heartCount + 1,
          };
        }),
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 130 },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
            colors={["#FFD9A8"]}
          />
        }
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
            <Text style={styles.title}>{t("communityTitle")}</Text>
            <Text style={styles.subtitle}>{t("communitySubtitle")}</Text>
          </View>
        </View>

        {composing ? (
          <Animated.View entering={SlideInUp.duration(280)}>
            <GlassCard radius={20} style={styles.composeCard}>
              <Text style={styles.composeLabel}>{t("communityShare")}</Text>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                placeholder={t("communityPlaceholder")}
                placeholderTextColor="rgba(255,255,255,0.45)"
                style={styles.composeInput}
                multiline
                maxLength={500}
                selectionColor="#FFD9A8"
              />
              <View style={styles.composeActions}>
                <Pressable
                  onPress={() => {
                    setComposing(false);
                    setDraft("");
                  }}
                  style={({ pressed }) => [
                    styles.composeBtn,
                    styles.composeCancel,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Text style={styles.composeCancelText}>{t("communityCancel")}</Text>
                </Pressable>
                <Pressable
                  onPress={submit}
                  disabled={posting || draft.trim().length < 4}
                  style={({ pressed }) => [
                    styles.composeBtn,
                    styles.composeSubmit,
                    {
                      opacity:
                        posting || draft.trim().length < 4
                          ? 0.5
                          : pressed
                            ? 0.85
                            : 1,
                    },
                  ]}
                >
                  {posting ? (
                    <ActivityIndicator color="#1a1033" size="small" />
                  ) : (
                    <>
                      <Ionicons name="paper-plane" size={14} color="#1a1033" />
                      <Text style={styles.composeSubmitText}>
                        {t("communityPost")}
                      </Text>
                    </>
                  )}
                </Pressable>
              </View>
            </GlassCard>
          </Animated.View>
        ) : (
          <Pressable
            onPress={() => {
              if (Platform.OS !== "web") {
                Haptics.selectionAsync();
              }
              setComposing(true);
            }}
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
          >
            <GlassCard radius={18} style={styles.composeStub}>
              <Ionicons name="add-circle" size={20} color="#FFD9A8" />
              <Text style={styles.composeStubText}>{t("communityShare")}</Text>
            </GlassCard>
          </Pressable>
        )}

        {error && (
          <GlassCard radius={16} style={styles.errorCard}>
            <Ionicons name="cloud-offline" size={16} color="#F4A97A" />
            <Text style={styles.errorText}>
              {t("communityOnlineHint")}
            </Text>
          </GlassCard>
        )}

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color="#FFD9A8" />
            <Text style={styles.loadingText}>{t("communityLoading")}</Text>
          </View>
        ) : prayers.length === 0 ? (
          <GlassCard radius={20} style={styles.emptyCard}>
            <Ionicons name="people-outline" size={28} color="rgba(255,255,255,0.55)" />
            <Text style={styles.emptyText}>{t("communityEmpty")}</Text>
          </GlassCard>
        ) : (
          <View style={styles.list}>
            {prayers.map((p, idx) => (
              <Animated.View
                key={p.id}
                entering={FadeIn.duration(280).delay(Math.min(idx * 30, 240))}
              >
                <GlassCard radius={20} style={styles.prayerCard}>
                  <Text style={styles.prayerText}>{p.text}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.timeText}>
                      {formatRelative(p.createdAt, lang)}
                    </Text>
                    <View style={styles.reactRow}>
                      <Pressable
                        onPress={() => react(p.id, "amen")}
                        style={({ pressed }) => [
                          styles.reactBtn,
                          {
                            backgroundColor: p.hasAmened
                              ? "rgba(255,217,168,0.18)"
                              : "rgba(255,255,255,0.06)",
                            borderColor: p.hasAmened
                              ? "rgba(255,217,168,0.55)"
                              : "rgba(255,255,255,0.15)",
                            opacity: pressed ? 0.7 : 1,
                          },
                        ]}
                      >
                        <Text style={styles.reactEmoji}>🤲</Text>
                        <Text
                          style={[
                            styles.reactLabel,
                            { color: p.hasAmened ? "#FFD9A8" : "rgba(255,255,255,0.78)" },
                          ]}
                        >
                          {t("communityAmen")} {p.amenCount}
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => react(p.id, "heart")}
                        style={({ pressed }) => [
                          styles.reactBtn,
                          {
                            backgroundColor: p.hasHearted
                              ? "rgba(244,169,199,0.18)"
                              : "rgba(255,255,255,0.06)",
                            borderColor: p.hasHearted
                              ? "rgba(244,169,199,0.55)"
                              : "rgba(255,255,255,0.15)",
                            opacity: pressed ? 0.7 : 1,
                          },
                        ]}
                      >
                        <Ionicons
                          name={p.hasHearted ? "heart" : "heart-outline"}
                          size={14}
                          color={p.hasHearted ? "#F4A9C7" : "rgba(255,255,255,0.78)"}
                        />
                        <Text
                          style={[
                            styles.reactLabel,
                            { color: p.hasHearted ? "#F4A9C7" : "rgba(255,255,255,0.78)" },
                          ]}
                        >
                          {p.heartCount}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </GlassCard>
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18 },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 16,
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
  title: { fontFamily: "Inter_700Bold", fontSize: 26, color: "#ffffff" },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
  composeStub: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 14,
  },
  composeStubText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#ffffff",
  },
  composeCard: { padding: 18, marginBottom: 14, gap: 10 },
  composeLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.7)",
  },
  composeInput: {
    minHeight: 92,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: 14,
    color: "#ffffff",
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.18)",
    textAlignVertical: "top",
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : {}),
  },
  composeActions: { flexDirection: "row", gap: 10 },
  composeBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  composeCancel: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.2)",
  },
  composeCancelText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#ffffff",
  },
  composeSubmit: { backgroundColor: "#FFE6C9" },
  composeSubmitText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#1a1033",
    letterSpacing: 0.4,
  },
  errorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  errorText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
  },
  loadingWrap: { alignItems: "center", paddingVertical: 32, gap: 10 },
  loadingText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  emptyCard: { padding: 26, alignItems: "center", gap: 12 },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  list: { gap: 12 },
  prayerCard: { padding: 16 },
  prayerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: "#ffffff",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  timeText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
  },
  reactRow: { flexDirection: "row", gap: 8 },
  reactBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
  reactEmoji: { fontSize: 13 },
  reactLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
});
