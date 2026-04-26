import React, { useMemo } from "react";
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

import { AyetCard } from "@/components/AyetCard";
import { DigitalClock } from "@/components/DigitalClock";
import { GlassCard } from "@/components/GlassCard";
import { ManeviSozCard } from "@/components/ManeviSozCard";
import {
  getAyetOfTheDay,
  SURELER_META,
  type SurahMeta,
} from "@/constants/content";
import { useReligious } from "@/context/ReligiousContext";
import { useI18n } from "@/context/I18nContext";

function SureRow({
  sure,
  index,
  onPress,
}: {
  sure: SurahMeta;
  index: number;
  onPress: () => void;
}) {
  return (
    <Animated.View entering={FadeInDown.duration(360).delay(Math.min(280, index * 14))}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          opacity: pressed ? 0.55 : 1,
          backgroundColor: pressed ? "rgba(255,255,255,0.06)" : "transparent",
        })}
      >
        <View style={rowStyles.row}>
          <View style={rowStyles.numberCircle}>
            <Text style={rowStyles.number}>{sure.no}</Text>
          </View>
          <View style={rowStyles.titleCol}>
            <Text style={rowStyles.title} numberOfLines={1}>
              {sure.turkish} Suresi
            </Text>
            <Text style={rowStyles.subtitle} numberOfLines={1}>
              {sure.meaning} · {sure.ayetCount} ayet · {sure.type}
            </Text>
          </View>
          <Text style={rowStyles.arabic}>{sure.arabic}</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color="rgba(255,255,255,0.45)"
            style={{ marginLeft: 6 }}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function KuranTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { use24Hour } = useReligious();
  const { t } = useI18n();
  const ayet = useMemo(() => getAyetOfTheDay(), []);

  const features: {
    key: string;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    accent: string;
    route: string;
  }[] = [
    { key: "coach", icon: "sparkles", label: t("menuCoach"), accent: "#F4C97A", route: "/koc" },
    { key: "community", icon: "people", label: t("menuCommunity"), accent: "#9DD9C2", route: "/topluluk" },
    { key: "widget", icon: "color-palette", label: t("menuWidget"), accent: "#C29DD9", route: "/widget-studio" },
  ];

  const goFeature = (route: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as never);
  };

  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? Math.max(insets.top, 67) + 8 : insets.top + 12;
  const bottomPad = isWeb ? 84 + 110 : insets.bottom + 110;

  const openSure = (sure: SurahMeta) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(`/surah/${sure.no}`);
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
      <View style={styles.header}>
        <Text style={styles.appLabel}>Bismillah</Text>
        <Text style={styles.greeting}>Hoş geldin</Text>
      </View>

      <View style={styles.clockWrap}>
        <DigitalClock use24Hour={use24Hour} />
      </View>

      <AyetCard ayet={ayet} />

      <Animated.View entering={FadeInDown.duration(420).delay(120)}>
        <View style={styles.featureRow}>
          {features.map((f) => (
            <Pressable
              key={f.key}
              onPress={() => goFeature(f.route)}
              style={({ pressed }) => [
                styles.featureBtn,
                {
                  borderColor: `${f.accent}55`,
                  backgroundColor: `${f.accent}12`,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                },
              ]}
            >
              <Ionicons name={f.icon} size={18} color={f.accent} />
              <Text style={styles.featureLabel} numberOfLines={1}>
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      <ManeviSozCard onPress={() => router.push("/sozler")} />

      <Animated.View entering={FadeInDown.duration(500).delay(250)}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sureler</Text>
          <Text style={styles.sectionCount}>{SURELER_META.length}</Text>
          <View style={styles.sectionLine} />
        </View>
      </Animated.View>

      <GlassCard radius={28} variant="solid" style={styles.listCard}>
        {SURELER_META.map((sure, idx) => (
          <View key={sure.no}>
            <SureRow sure={sure} index={idx} onPress={() => openSure(sure)} />
            {idx < SURELER_META.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </GlassCard>

      <View style={styles.footer}>
        <Ionicons name="moon" size={14} color="rgba(255,255,255,0.55)" />
        <Text style={styles.footerText}>Allah, bizimle beraberdir</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 18, gap: 18 },
  header: { alignItems: "center", marginBottom: 4 },
  appLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "#FFD9A8",
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  greeting: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.78)",
    marginTop: 4,
  },
  clockWrap: { paddingVertical: 4 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#ffffff",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  sectionCount: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "#FFD9A8",
    letterSpacing: 1.2,
  },
  sectionLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  featureRow: {
    flexDirection: "row",
    gap: 10,
  },
  featureBtn: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  featureLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11.5,
    color: "#ffffff",
    letterSpacing: 0.2,
  },
  listCard: { paddingVertical: 6, paddingHorizontal: 0 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 18,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingTop: 8,
    paddingBottom: 4,
  },
  footerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.5,
    fontStyle: "italic",
  },
});

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 12,
  },
  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.25)",
  },
  number: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#ffffff",
  },
  titleCol: { flex: 1 },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#ffffff",
    letterSpacing: 0.2,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
  arabic: {
    fontFamily: "Inter_500Medium",
    fontSize: 17,
    color: "#ffffff",
  },
});
