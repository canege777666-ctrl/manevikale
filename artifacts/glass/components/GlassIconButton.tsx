import React from "react";
import { StyleSheet, Pressable, PressableProps } from "react-native";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";

interface GlassIconButtonProps extends PressableProps {
  icon: React.ReactNode;
  intensity?: number;
  size?: number;
}

export function GlassIconButton({ icon, style, intensity = 50, size = 44, onPress, ...props }: GlassIconButtonProps) {
  const handlePress = (e: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress(e);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { width: size, height: size, borderRadius: size / 2, opacity: pressed ? 0.7 : 1 },
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      onPress={handlePress}
      {...props}
    >
      <BlurView
        intensity={intensity}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: size / 2, overflow: "hidden" }]}
      />
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
  },
});
