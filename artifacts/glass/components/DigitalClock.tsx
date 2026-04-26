import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const TURKISH_DAYS = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

const TURKISH_MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

interface DigitalClockProps {
  use24Hour?: boolean;
}

export function DigitalClock({ use24Hour = true }: DigitalClockProps) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const displayHours = use24Hour ? hours : hours % 12 || 12;
  const ampm = hours >= 12 ? "ÖS" : "ÖÖ";

  const hh = String(displayHours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");

  const dayName = TURKISH_DAYS[now.getDay()];
  const dateStr = `${now.getDate()} ${TURKISH_MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <Animated.View entering={FadeIn.duration(700)} style={styles.container}>
      <View style={styles.timeRow}>
        <Text style={styles.time}>{hh}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.time}>{mm}</Text>
        {!use24Hour && <Text style={styles.ampm}>{ampm}</Text>}
      </View>
      <Text style={styles.dayName}>{dayName}</Text>
      <Text style={styles.date}>{dateStr}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  time: {
    fontFamily: "Inter_700Bold",
    fontSize: 96,
    color: "#ffffff",
    letterSpacing: -4,
    textShadowColor: "rgba(255,255,255,0.35)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  colon: {
    fontFamily: "Inter_500Medium",
    fontSize: 80,
    color: "rgba(255,255,255,0.6)",
    paddingHorizontal: 4,
  },
  ampm: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    color: "rgba(255,255,255,0.7)",
    marginLeft: 8,
    letterSpacing: 2,
  },
  dayName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    color: "#ffffff",
    marginTop: 6,
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  date: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
    letterSpacing: 0.5,
  },
});
