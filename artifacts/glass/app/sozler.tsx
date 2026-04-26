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
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlassCard } from "@/components/GlassCard";
import { MANEVI_SOZLER } from "@/constants/maneviSozler";

export default function SozlerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? Math.max(insets.top, 67) + 8 : insets.top + 12;
  const bottomPad = isWeb ? 60 : insets.bottom + 32;

  return (
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
      </View>

      <Animated.View entering={FadeInDown.duration(500)}>
        <View style={styles.header}>
          <View style={styles.iconBig}>
            <Ionicons name="sparkles" size={26} color="#FFD9A8" />
          </View>
          <Text style={styles.title}>Manevî Sözler</Text>
          <Text style={styles.subtitle}>
            Ana ekran widget'ında dönüşümlü gösterilen ilham veren sözler
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.widgetPill}>
              <Ionicons name="apps" size={11} color="#FFD9A8" />
              <Text style={styles.widgetPillText}>HOME WIDGET</Text>
            </View>
            <Text style={styles.countText}>{MANEVI_SOZLER.length} söz</Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.list}>
        {MANEVI_SOZLER.map((soz, idx) => (
          <Animated.View
            key={soz.id}
            entering={FadeInDown.duration(300).delay(Math.min(360, idx * 18))}
          >
            <GlassCard radius={20} variant="solid" style={styles.card}>
              <View style={styles.numberCircle}>
                <Text style={styles.number}>{idx + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.quoteText}>{soz.text}</Text>
                {soz.attribution ? (
                  <Text style={styles.attrText}>— {soz.attribution}</Text>
                ) : null}
              </View>
            </GlassCard>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingHorizontal: 18, gap: 14 },
  headerBar: { flexDirection: "row", alignItems: "center" },
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
  header: { alignItems: "center", marginBottom: 6 },
  iconBig: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,217,168,0.14)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.4)",
    marginBottom: 14,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 30,
    color: "#ffffff",
    letterSpacing: 0.4,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.78)",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 16,
    lineHeight: 19,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
  },
  widgetPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "rgba(255,217,168,0.14)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.4)",
  },
  widgetPillText: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    color: "#FFD9A8",
    letterSpacing: 1.2,
  },
  countText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1,
  },
  list: { gap: 10 },
  card: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  numberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.2)",
  },
  number: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: "#FFD9A8",
  },
  quoteText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    lineHeight: 22,
    color: "#ffffff",
  },
  attrText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "#FFD9A8",
    marginTop: 6,
    letterSpacing: 0.4,
  },
});
