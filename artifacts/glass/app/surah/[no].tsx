import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlassCard } from "@/components/GlassCard";
import { PaymentModal } from "@/components/PaymentModal";
import { getSurahMeta } from "@/constants/sureler";
import { useReligious, FREE_AUDIO_LIMIT } from "@/context/ReligiousContext";
import { useSurahContent } from "@/hooks/useSurahContent";
import { useSurahAudio } from "@/hooks/useSurahAudio";

export default function SurahReadScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { no } = useLocalSearchParams<{ no: string }>();
  const sureNo = Number(no);
  const meta = getSurahMeta(sureNo);

  const { isPremium, audioRemaining, audioLocked, consumeAudioPlay } =
    useReligious();
  const { data, loading, error, refetch } = useSurahContent(sureNo);
  const audio = useSurahAudio(sureNo);

  const [paymentVisible, setPaymentVisible] = useState(false);
  const [showAudioLock, setShowAudioLock] = useState(false);

  useEffect(() => {
    return () => {
      audio.stop();
    };
  }, []);

  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? Math.max(insets.top, 67) + 8 : insets.top + 12;
  const bottomPad = isWeb ? 60 : insets.bottom + 32;

  if (!meta) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Sure bulunamadı.</Text>
        <Pressable onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Geri dön</Text>
        </Pressable>
      </View>
    );
  }

  const handlePlay = async () => {
    if (audio.isPlaying) {
      audio.pause();
      return;
    }
    if (audioLocked) {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
      setShowAudioLock(true);
      return;
    }
    const ok = consumeAudioPlay();
    if (!ok) {
      setShowAudioLock(true);
      return;
    }
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await audio.play();
  };

  const audioBtnLabel = audio.isLoading
    ? "Yükleniyor..."
    : audio.isPlaying
      ? "Duraklat"
      : audioLocked
        ? "Kilitli"
        : isPremium
          ? "Sesli Dinle"
          : `Sesli Dinle (${audioRemaining}/${FREE_AUDIO_LIMIT})`;

  const audioIconName = audio.isLoading
    ? "hourglass-outline"
    : audio.isPlaying
      ? "pause"
      : audioLocked
        ? "lock-closed"
        : "play";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: topPad, paddingBottom: bottomPad },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBar}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={({ pressed }) => [
              styles.backBtn,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons name="chevron-back" size={20} color="#ffffff" />
            <Text style={styles.backText}>Geri</Text>
          </Pressable>

          <Pressable
            onPress={handlePlay}
            disabled={audio.isLoading}
            style={({ pressed }) => [
              styles.audioBtn,
              audioLocked && styles.audioBtnLocked,
              {
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <Ionicons
              name={audioIconName}
              size={14}
              color={audioLocked ? "rgba(255,255,255,0.85)" : "#1a1033"}
            />
            <Text
              style={[
                styles.audioBtnText,
                audioLocked && styles.audioBtnTextLocked,
              ]}
            >
              {audioBtnLabel}
            </Text>
          </Pressable>
        </View>

        <Animated.View entering={FadeInDown.duration(500)}>
          <GlassCard radius={28} variant="solid" style={styles.titleCard}>
            <View style={styles.numberBig}>
              <Text style={styles.numberBigText}>{meta.no}</Text>
            </View>
            <Text style={styles.surahArabic}>{meta.arabic}</Text>
            <Text style={styles.surahName}>{meta.turkish} Suresi</Text>
            <Text style={styles.surahMeta}>
              {meta.meaning} · {meta.ayetCount} ayet · {meta.type}
            </Text>
          </GlassCard>
        </Animated.View>

        {audio.error ? (
          <GlassCard radius={20} variant="solid" style={styles.errorCard}>
            <Ionicons name="alert-circle-outline" size={16} color="#FFD9A8" />
            <Text style={styles.errorText}>Ses yüklenirken hata oluştu</Text>
          </GlassCard>
        ) : null}

        {loading && !data ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color="#FFD9A8" />
            <Text style={styles.loadingText}>Tam metin yükleniyor...</Text>
          </View>
        ) : null}

        {error && !data ? (
          <GlassCard radius={24} variant="solid" style={styles.errorBlock}>
            <Ionicons name="cloud-offline-outline" size={28} color="#FFD9A8" />
            <Text style={styles.errorBlockTitle}>İçerik yüklenemedi</Text>
            <Text style={styles.errorBlockBody}>{error}</Text>
            <Pressable
              onPress={refetch}
              style={({ pressed }) => [
                styles.retryBtn,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Ionicons name="refresh" size={14} color="#1a1033" />
              <Text style={styles.retryBtnText}>Tekrar Dene</Text>
            </Pressable>
          </GlassCard>
        ) : null}

        {data ? (
          <View style={styles.ayetList}>
            {data.ayahs.map((ayah, idx) => (
              <Animated.View
                key={ayah.numberInSurah}
                entering={FadeInDown.duration(360).delay(Math.min(280, idx * 18))}
              >
                <GlassCard radius={24} variant="solid" style={styles.ayetCard}>
                  <View style={styles.ayetHeader}>
                    <View style={styles.ayetNumber}>
                      <Text style={styles.ayetNumberText}>
                        {ayah.numberInSurah}
                      </Text>
                    </View>
                    <View style={styles.ayetDivider} />
                  </View>
                  <Text style={styles.arabic}>{ayah.arabic}</Text>
                  <View style={styles.softDivider} />
                  <Text style={styles.translation}>{ayah.turkish}</Text>
                </GlassCard>
              </Animated.View>
            ))}
          </View>
        ) : null}
      </ScrollView>

      {showAudioLock && (
        <Animated.View
          entering={FadeIn.duration(220)}
          style={StyleSheet.absoluteFill}
          pointerEvents="box-none"
        >
          <Pressable
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(2,4,18,0.7)" },
            ]}
            onPress={() => setShowAudioLock(false)}
          />
          <View style={lockStyles.center} pointerEvents="box-none">
            <View style={lockStyles.cardWrap}>
              <GlassCard radius={28} variant="solid" style={lockStyles.card}>
                <View style={lockStyles.iconBadge}>
                  <Ionicons name="volume-mute" size={28} color="#ffffff" />
                </View>
                <Text style={lockStyles.title}>Ses Kilidi</Text>
                <Text style={lockStyles.body}>
                  Ücretsiz {FREE_AUDIO_LIMIT} hak doldu. Tüm surelere ve
                  sınırsız sesli okumaya Premium ile erişin.
                </Text>
                <Pressable
                  onPress={() => {
                    setShowAudioLock(false);
                    setPaymentVisible(true);
                  }}
                  style={({ pressed }) => [
                    lockStyles.cta,
                    { opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <Ionicons name="star" size={14} color="#1a1033" />
                  <Text style={lockStyles.ctaText}>Premium'a Geç</Text>
                </Pressable>
                <Pressable
                  onPress={() => setShowAudioLock(false)}
                  style={({ pressed }) => [
                    lockStyles.dismiss,
                    { opacity: pressed ? 0.6 : 1 },
                  ]}
                >
                  <Text style={lockStyles.dismissText}>Şimdi Değil</Text>
                </Pressable>
              </GlassCard>
            </View>
          </View>
        </Animated.View>
      )}

      <PaymentModal
        visible={paymentVisible}
        onDismiss={() => setPaymentVisible(false)}
        title="Premium Üyelik"
        subtitle="Tüm sureleri sınırsız sesli dinlemek ve tüm kutsal kitapları okumak için ödeme yapın."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 18, gap: 16 },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingRight: 8,
  },
  backText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#ffffff",
  },
  audioBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#FFE6C9",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.4)",
  },
  audioBtnLocked: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderColor: "rgba(255,255,255,0.25)",
  },
  audioBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#1a1033",
    letterSpacing: 0.3,
  },
  audioBtnTextLocked: { color: "rgba(255,255,255,0.85)" },
  titleCard: {
    alignItems: "center",
    paddingVertical: 28,
  },
  numberBig: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,217,168,0.15)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.45)",
    marginBottom: 14,
  },
  numberBigText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#FFD9A8",
  },
  surahArabic: {
    fontFamily: "Inter_500Medium",
    fontSize: 38,
    color: "#ffffff",
    marginBottom: 6,
  },
  surahName: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: "#ffffff",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  surahMeta: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
  },
  errorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  errorText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#FFD9A8",
  },
  loadingBox: {
    paddingVertical: 30,
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
  },
  errorBlock: {
    paddingVertical: 28,
    alignItems: "center",
    gap: 10,
  },
  errorBlockTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#ffffff",
  },
  errorBlockBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.78)",
    textAlign: "center",
    paddingHorizontal: 12,
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#FFE6C9",
    marginTop: 6,
  },
  retryBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#1a1033",
  },
  ayetList: { gap: 12 },
  ayetCard: {
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  ayetHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  ayetNumber: {
    minWidth: 28,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.25)",
  },
  ayetNumberText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#ffffff",
  },
  ayetDivider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  arabic: {
    fontFamily: "Inter_500Medium",
    fontSize: 24,
    lineHeight: 42,
    color: "#ffffff",
    textAlign: "right",
    marginBottom: 4,
  },
  softDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginVertical: 12,
  },
  translation: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    lineHeight: 23,
    color: "#ffffff",
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  notFoundText: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#ffffff",
  },
  backLink: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  backLinkText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#FFD9A8",
  },
});

const lockStyles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  cardWrap: { width: "100%", maxWidth: 360 },
  card: { paddingVertical: 28, paddingHorizontal: 24, alignItems: "center" },
  iconBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.35)",
    marginBottom: 16,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 8,
  },
  body: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 24,
    backgroundColor: "#FFE6C9",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.45)",
  },
  ctaText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#1a1033",
  },
  dismiss: { marginTop: 12, paddingVertical: 8 },
  dismissText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
  },
});
