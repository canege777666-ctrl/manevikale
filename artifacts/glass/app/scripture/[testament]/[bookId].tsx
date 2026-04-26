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
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GlassCard } from "@/components/GlassCard";
import {
  getIncilBook,
  getTevratBook,
  type ScriptureBook,
} from "@/constants/content";

export default function ScriptureBookScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { testament, bookId } = useLocalSearchParams<{
    testament: string;
    bookId: string;
  }>();

  const book: ScriptureBook | undefined =
    testament === "tevrat"
      ? getTevratBook(String(bookId))
      : getIncilBook(String(bookId));

  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? Math.max(insets.top, 67) + 8 : insets.top + 12;
  const bottomPad = isWeb ? 60 : insets.bottom + 32;

  if (!book) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Kitap bulunamadı.</Text>
        <Pressable onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Geri dön</Text>
        </Pressable>
      </View>
    );
  }

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
        <GlassCard radius={28} variant="solid" style={styles.titleCard}>
          <View style={styles.testamentBadge}>
            <Ionicons name="book" size={11} color="#FFD9A8" />
            <Text style={styles.testamentBadgeText}>
              {book.testament.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.bookName}>{book.shortName}</Text>
          <Text style={styles.bookFull}>{book.fullName}</Text>
          <Text style={styles.bookDesc}>{book.description}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaPill}>
              {book.chapters.length} bölüm
            </Text>
            <Text style={styles.metaPill}>
              {book.chapters.reduce((a, c) => a + c.verses.length, 0)} ayet
            </Text>
          </View>
        </GlassCard>
      </Animated.View>

      <View style={styles.chapterList}>
        {book.chapters.map((chapter, idx) => (
          <Animated.View
            key={chapter.no}
            entering={FadeInDown.duration(380).delay(120 + idx * 60)}
          >
            <GlassCard radius={24} variant="solid" style={styles.chapterCard}>
              <View style={styles.chapterHeader}>
                <View style={styles.chapterNumber}>
                  <Text style={styles.chapterNumberText}>{chapter.no}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.chapterLabel}>BÖLÜM {chapter.no}</Text>
                  <Text style={styles.chapterTitle}>{chapter.title}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.versesList}>
                {chapter.verses.map((verse) => (
                  <View key={verse.no} style={styles.verseRow}>
                    <Text style={styles.verseNo}>{verse.no}</Text>
                    <Text style={styles.verseText}>{verse.text}</Text>
                  </View>
                ))}
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
  content: { paddingHorizontal: 18, gap: 16 },
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
  titleCard: {
    alignItems: "center",
    paddingVertical: 28,
  },
  testamentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "rgba(255,217,168,0.14)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.4)",
    marginBottom: 14,
  },
  testamentBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "#FFD9A8",
    letterSpacing: 1.4,
  },
  bookName: {
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    color: "#ffffff",
    letterSpacing: 0.4,
  },
  bookFull: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#FFD9A8",
    marginTop: 4,
  },
  bookDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginTop: 12,
    paddingHorizontal: 8,
  },
  metaRow: { flexDirection: "row", gap: 8, marginTop: 14 },
  metaPill: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "rgba(255,255,255,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  chapterList: { gap: 14 },
  chapterCard: { paddingVertical: 18, paddingHorizontal: 20 },
  chapterHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  chapterNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,217,168,0.14)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.4)",
  },
  chapterNumberText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#FFD9A8",
  },
  chapterLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "#FFD9A8",
    letterSpacing: 1.6,
  },
  chapterTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    color: "#ffffff",
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginVertical: 14,
  },
  versesList: { gap: 12 },
  verseRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  verseNo: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: "#FFD9A8",
    minWidth: 22,
    textAlign: "right",
    paddingTop: 4,
  },
  verseText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    lineHeight: 24,
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
