import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlassCard } from "@/components/GlassCard";
import { PaymentModal } from "@/components/PaymentModal";

interface PremiumLockOverlayProps {
  contentName: string;
  description: string;
}

export function PremiumLockOverlay({
  contentName,
  description,
}: PremiumLockOverlayProps) {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topInset = isWeb ? Math.max(insets.top, 67) : insets.top;
  const bottomInset = isWeb ? 84 + 24 : insets.bottom + 84;

  const [paymentVisible, setPaymentVisible] = useState(false);

  const openPayment = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setPaymentVisible(true);
  };

  return (
    <View style={styles.root}>
      <Animated.View
        entering={FadeIn.duration(400)}
        style={[StyleSheet.absoluteFill, styles.scrim]}
      >
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
      </Animated.View>

      <View
        style={[
          styles.centerWrap,
          { paddingTop: topInset, paddingBottom: bottomInset },
        ]}
      >
        <Animated.View
          entering={ZoomIn.duration(500).springify().damping(14)}
          style={styles.cardWrap}
        >
          <GlassCard radius={32} variant="solid" style={styles.card}>
            <View style={styles.lockBadge}>
              <Ionicons name="lock-closed" size={28} color="#ffffff" />
            </View>

            <Text style={styles.title}>Premium İçerik</Text>

            <Text style={styles.body}>
              Bu içerik Premium üyeler içindir
            </Text>

            <Text style={styles.subBody}>{description}</Text>

            <View style={styles.divider} />

            <View style={styles.featureRow}>
              <Ionicons name="sparkles" size={14} color="#FFD9A8" />
              <Text style={styles.feature}>{contentName} tam metni</Text>
            </View>
            <View style={styles.featureRow}>
              <Ionicons name="sparkles" size={14} color="#FFD9A8" />
              <Text style={styles.feature}>Reklamsız okuma deneyimi</Text>
            </View>
            <View style={styles.featureRow}>
              <Ionicons name="sparkles" size={14} color="#FFD9A8" />
              <Text style={styles.feature}>Sınırsız sesli dinleme</Text>
            </View>

            <Pressable
              onPress={openPayment}
              style={({ pressed }) => [
                styles.cta,
                {
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <View style={styles.ctaInner}>
                <Ionicons name="star" size={16} color="#1a1033" />
                <Text style={styles.ctaText}>Premium'a Geç</Text>
              </View>
            </Pressable>

            <Text style={styles.footnote}>İstediğin zaman iptal edebilirsin</Text>
          </GlassCard>
        </Animated.View>
      </View>

      <PaymentModal
        visible={paymentVisible}
        onDismiss={() => setPaymentVisible(false)}
        title="Premium Üyelik"
        subtitle={`${contentName} dahil tüm kutsal kitaplara ve sınırsız sesli okumaya erişim için ödeme yapın.`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrim: {
    backgroundColor: "rgba(2,4,18,0.55)",
  },
  centerWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  cardWrap: {
    width: "100%",
    maxWidth: 380,
  },
  card: {
    paddingVertical: 32,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  lockBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.35)",
    marginBottom: 18,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  body: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 22,
  },
  subBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.22)",
    width: "100%",
    marginBottom: 18,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  feature: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.95)",
  },
  cta: {
    marginTop: 22,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.45)",
    backgroundColor: "#FFE6C9",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ctaText: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#1a1033",
    letterSpacing: 0.3,
  },
  footnote: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
    marginTop: 14,
    letterSpacing: 0.3,
  },
});
