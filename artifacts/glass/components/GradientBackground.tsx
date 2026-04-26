import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

import { useReligious } from "@/context/ReligiousContext";

export function GradientBackground() {
  const { theme } = useReligious();

  const getThemeImage = () => {
    switch (theme) {
      case "sunrise":
        return require("@/assets/images/bg-sunrise.png");
      case "ocean":
        return require("@/assets/images/bg-ocean.png");
      case "aurora":
        return require("@/assets/images/bg-aurora.png");
      case "spiritual":
      default:
        return require("@/assets/images/bg-spiritual.png");
    }
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#03050f" }]} />
      <Image
        source={getThemeImage()}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={400}
      />
      <View style={[StyleSheet.absoluteFill, styles.overlay]} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(2,4,18,0.55)",
  },
});
