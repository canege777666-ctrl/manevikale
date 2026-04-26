import { Platform, StyleSheet, View, ViewProps } from "react-native";
import { BlurView } from "expo-blur";
import React from "react";

interface GlassCardProps extends ViewProps {
  intensity?: number;
  radius?: number;
  variant?: "default" | "solid";
}

export function GlassCard({
  children,
  style,
  intensity,
  radius = 24,
  variant = "default",
  ...props
}: GlassCardProps) {
  const isAndroid = Platform.OS === "android";
  const finalIntensity = intensity ?? (isAndroid ? 90 : 70);

  const overlayBg =
    variant === "solid"
      ? "rgba(8,12,30,0.65)"
      : "rgba(15,20,40,0.55)";

  return (
    <View style={[styles.container, { borderRadius: radius }, style]} {...props}>
      <BlurView
        intensity={finalIntensity}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: radius, overflow: "hidden" }]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: overlayBg, borderRadius: radius },
        ]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  content: {
    padding: 20,
  },
});
