import React from "react";
import { StyleSheet, Pressable, PressableProps, Text } from "react-native";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";

interface GlassButtonProps extends PressableProps {
  title: string;
  intensity?: number;
  radius?: number;
}

export function GlassButton({ title, style, intensity = 50, radius = 24, onPress, ...props }: GlassButtonProps) {
  const handlePress = (e: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress(e);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { borderRadius: radius, opacity: pressed ? 0.7 : 1 },
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      onPress={handlePress}
      {...props}
    >
      <BlurView
        intensity={intensity}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: radius, overflow: "hidden" }]}
      />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
