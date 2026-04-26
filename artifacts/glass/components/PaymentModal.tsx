import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
} from "react-native-reanimated";

import { useReligious } from "@/context/ReligiousContext";
import { useI18n } from "@/context/I18nContext";

type Step = "form" | "processing" | "success";

interface PaymentModalProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  subtitle?: string;
}

function detectBrand(digits: string): "visa" | "mastercard" | "amex" | "troy" | "generic" {
  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^9792/.test(digits)) return "troy";
  return "generic";
}

function formatCard(raw: string) {
  return raw.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function isValidExpiry(value: string) {
  const m = value.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const month = parseInt(m[1]!, 10);
  const year = 2000 + parseInt(m[2]!, 10);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expEnd = new Date(year, month, 0, 23, 59, 59);
  return expEnd >= now;
}

export function PaymentModal({
  visible,
  onDismiss,
  title,
  subtitle,
}: PaymentModalProps) {
  const { setPremium } = useReligious();
  const { t } = useI18n();
  const [step, setStep] = useState<Step>("form");
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      setStep("form");
      setCard("");
      setName("");
      setExpiry("");
      setCvv("");
      setErrorKey(null);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  const cardDigits = card.replace(/\D/g, "");
  const brand = useMemo(() => detectBrand(cardDigits), [cardDigits]);
  const cvvLen = brand === "amex" ? 4 : 3;
  const cardOk = cardDigits.length >= 13 && cardDigits.length <= 19;
  const nameOk = name.trim().length >= 3;
  const expiryOk = isValidExpiry(expiry);
  const cvvOk = cvv.length === cvvLen;
  const canPay = cardOk && nameOk && expiryOk && cvvOk;

  const resolvedTitle = title ?? t("premiumTitle");
  const resolvedSubtitle = subtitle ?? t("premiumSubtitle");

  const handlePay = () => {
    if (!cardOk) {
      setErrorKey("payInvalidCard");
      return;
    }
    if (!expiryOk) {
      setErrorKey("payInvalidExpiry");
      return;
    }
    if (!cvvOk) {
      setErrorKey("payInvalidCvv");
      return;
    }
    setErrorKey(null);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setStep("processing");
    timerRef.current = setTimeout(() => {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setPremium(true);
      setStep("success");
    }, 2800);
  };

  const handleClose = () => {
    if (step === "processing") return;
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Animated.View
          entering={FadeIn.duration(220)}
          exiting={FadeOut.duration(180)}
          style={StyleSheet.absoluteFill}
        >
          <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, styles.scrim]} />
        </Animated.View>

        <View style={styles.center}>
          <Animated.View
            entering={ZoomIn.duration(360).springify().damping(16)}
            style={styles.cardWrap}
          >
            <View style={styles.card}>
              <BlurView
                intensity={Platform.OS === "android" ? 100 : 80}
                tint="dark"
                style={[StyleSheet.absoluteFill, { borderRadius: 28 }]}
              />
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: "rgba(8,12,30,0.82)", borderRadius: 28 },
                ]}
              />

              <ScrollView
                style={styles.cardInner}
                contentContainerStyle={{ paddingBottom: 4 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {step === "form" && (
                  <FormStep
                    title={resolvedTitle}
                    subtitle={resolvedSubtitle}
                    card={card}
                    onCardChange={(v) => setCard(formatCard(v))}
                    name={name}
                    onNameChange={setName}
                    expiry={expiry}
                    onExpiryChange={(v) => setExpiry(formatExpiry(v))}
                    cvv={cvv}
                    onCvvChange={(v) => setCvv(v.replace(/\D/g, "").slice(0, cvvLen))}
                    cvvLen={cvvLen}
                    canPay={canPay}
                    onPay={handlePay}
                    onCancel={handleClose}
                    brand={brand}
                    errorKey={errorKey}
                    t={t}
                  />
                )}
                {step === "processing" && <ProcessingStep t={t} />}
                {step === "success" && <SuccessStep onDone={onDismiss} t={t} />}
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

interface FormStepProps {
  title: string;
  subtitle: string;
  card: string;
  onCardChange: (v: string) => void;
  name: string;
  onNameChange: (v: string) => void;
  expiry: string;
  onExpiryChange: (v: string) => void;
  cvv: string;
  onCvvChange: (v: string) => void;
  cvvLen: number;
  canPay: boolean;
  onPay: () => void;
  onCancel: () => void;
  brand: ReturnType<typeof detectBrand>;
  errorKey: string | null;
  t: (k: never) => string;
}

function FormStep(props: FormStepProps) {
  const { t } = props;
  const T = t as unknown as (k: string) => string;
  const brandLabel: Record<ReturnType<typeof detectBrand>, string> = {
    visa: "VISA",
    mastercard: "Mastercard",
    amex: "AMEX",
    troy: "Troy",
    generic: "Card",
  };
  return (
    <>
      <View style={styles.headerRow}>
        <View style={styles.iconBadge}>
          <Ionicons name="star" size={20} color="#FFD9A8" />
        </View>
        <Pressable
          onPress={props.onCancel}
          hitSlop={10}
          style={({ pressed }) => [styles.closeBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <Ionicons name="close" size={20} color="rgba(255,255,255,0.85)" />
        </Pressable>
      </View>

      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>

      <View style={styles.demoTag}>
        <Ionicons name="shield-checkmark" size={12} color="#FFD9A8" />
        <Text style={styles.demoText}>{T("paySecure")}</Text>
      </View>

      <Text style={styles.label}>{T("payCardNumber")}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name="card-outline" size={18} color="rgba(255,255,255,0.6)" />
        <TextInput
          value={props.card}
          onChangeText={props.onCardChange}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="number-pad"
          maxLength={23}
          style={styles.input}
          selectionColor="#FFD9A8"
          autoComplete="cc-number"
        />
        <Text style={styles.brandTag}>{brandLabel[props.brand]}</Text>
      </View>

      <Text style={styles.label}>{T("payCardName")}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name="person-outline" size={18} color="rgba(255,255,255,0.6)" />
        <TextInput
          value={props.name}
          onChangeText={(v) => props.onNameChange(v.toUpperCase())}
          placeholder="AHMET YILMAZ"
          placeholderTextColor="rgba(255,255,255,0.4)"
          autoCapitalize="characters"
          style={styles.input}
          selectionColor="#FFD9A8"
          maxLength={40}
          autoComplete="cc-name"
        />
      </View>

      <View style={styles.dualRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{T("payExpiry")}</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="calendar-outline" size={18} color="rgba(255,255,255,0.6)" />
            <TextInput
              value={props.expiry}
              onChangeText={props.onExpiryChange}
              placeholder="MM/YY"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="number-pad"
              maxLength={5}
              style={styles.input}
              selectionColor="#FFD9A8"
              autoComplete="cc-exp"
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{T("payCvv")}</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed" size={18} color="rgba(255,255,255,0.6)" />
            <TextInput
              value={props.cvv}
              onChangeText={props.onCvvChange}
              placeholder={"•".repeat(props.cvvLen)}
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="number-pad"
              maxLength={props.cvvLen}
              secureTextEntry
              style={styles.input}
              selectionColor="#FFD9A8"
              autoComplete="cc-csc"
            />
          </View>
        </View>
      </View>

      {props.errorKey && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={14} color="#F4A97A" />
          <Text style={styles.errorText}>{T(props.errorKey)}</Text>
        </View>
      )}

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>{T("payTotal")}</Text>
        <Text style={styles.priceValue}>₺49,90</Text>
      </View>

      <Pressable
        onPress={props.onPay}
        disabled={!props.canPay}
        style={({ pressed }) => [
          styles.payBtn,
          {
            opacity: !props.canPay ? 0.45 : pressed ? 0.85 : 1,
            transform: [{ scale: pressed && props.canPay ? 0.98 : 1 }],
          },
        ]}
      >
        <Ionicons name="lock-closed" size={14} color="#1a1033" />
        <Text style={styles.payText}>{T("payButton")}</Text>
      </Pressable>

      <View style={styles.brandStrip}>
        <Text style={styles.brandStripLabel}>PayTR</Text>
        <Text style={styles.brandStripDot}>·</Text>
        <Text style={styles.brandStripLabel}>VISA</Text>
        <Text style={styles.brandStripDot}>·</Text>
        <Text style={styles.brandStripLabel}>Mastercard</Text>
        <Text style={styles.brandStripDot}>·</Text>
        <Text style={styles.brandStripLabel}>Troy</Text>
      </View>

      <Text style={styles.disclaimer}>
        Demo · Hiçbir kart bilgisi işlenmez veya saklanmaz. PayTR entegrasyonuna hazır.
      </Text>
    </>
  );
}

function ProcessingStep({ t }: { t: (k: never) => string }) {
  const T = t as unknown as (k: string) => string;
  return (
    <Animated.View entering={FadeIn.duration(220)} style={styles.statusWrap}>
      <ActivityIndicator size="large" color="#FFD9A8" />
      <Text style={styles.statusTitle}>{T("payProcessing")}</Text>
      <Text style={styles.statusSub}>
        Bankanızla iletişim kuruluyor, lütfen bekleyin.
      </Text>
    </Animated.View>
  );
}

function SuccessStep({
  onDone,
  t,
}: {
  onDone: () => void;
  t: (k: never) => string;
}) {
  const T = t as unknown as (k: string) => string;
  return (
    <Animated.View entering={FadeIn.duration(280)} style={styles.statusWrap}>
      <Animated.View
        entering={ZoomIn.duration(420).springify().damping(10)}
        style={styles.successBadge}
      >
        <Ionicons name="checkmark" size={36} color="#0a1f0e" />
      </Animated.View>
      <Text style={styles.successTitle}>{T("paySuccess")}</Text>
      <Text style={styles.successSub}>{T("paySuccessBody")}</Text>

      <View style={styles.featList}>
        {[
          "premiumFeatureFullText",
          "premiumFeatureUnlimitedAudio",
          "premiumFeatureExclusiveThemes",
          "premiumFeatureCoachAudio",
        ].map((k) => (
          <View key={k} style={styles.featRow}>
            <Ionicons name="checkmark-circle" size={14} color="#7BE8A6" />
            <Text style={styles.featText}>{T(k)}</Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={onDone}
        style={({ pressed }) => [
          styles.doneBtn,
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Text style={styles.doneText}>{T("payClose")}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrim: { backgroundColor: "rgba(2,4,18,0.55)" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 18 },
  cardWrap: { width: "100%", maxWidth: 440, maxHeight: "92%" },
  card: {
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.45,
    shadowRadius: 26,
    elevation: 18,
  },
  cardInner: { padding: 22 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,217,168,0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.4)",
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  title: { fontFamily: "Inter_700Bold", fontSize: 21, color: "#ffffff", marginBottom: 4 },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    lineHeight: 18,
    color: "rgba(255,255,255,0.78)",
    marginBottom: 12,
  },
  demoTag: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "rgba(255,217,168,0.1)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,217,168,0.35)",
    marginBottom: 16,
  },
  demoText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "#FFD9A8",
    letterSpacing: 0.5,
  },
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 10.5,
    color: "rgba(255,255,255,0.65)",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 6,
    marginTop: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.18)",
  },
  input: {
    flex: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 14.5,
    color: "#ffffff",
    letterSpacing: 0.8,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : {}),
  },
  brandTag: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "rgba(255,217,168,0.9)",
    letterSpacing: 1,
  },
  dualRow: { flexDirection: "row", gap: 10 },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  errorText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#F4A97A",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.15)",
    marginTop: 14,
    marginBottom: 16,
  },
  priceLabel: { fontFamily: "Inter_500Medium", fontSize: 13, color: "rgba(255,255,255,0.7)" },
  priceValue: { fontFamily: "Inter_700Bold", fontSize: 17, color: "#ffffff" },
  payBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFE6C9",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.5)",
  },
  payText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14.5,
    color: "#1a1033",
    letterSpacing: 0.5,
  },
  brandStrip: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },
  brandStripLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: 1.3,
  },
  brandStripDot: {
    fontSize: 10,
    color: "rgba(255,255,255,0.35)",
  },
  disclaimer: {
    fontFamily: "Inter_400Regular",
    fontSize: 10.5,
    color: "rgba(255,255,255,0.45)",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 14,
  },
  statusWrap: { alignItems: "center", paddingVertical: 22 },
  statusTitle: { fontFamily: "Inter_700Bold", fontSize: 20, color: "#ffffff", marginTop: 18 },
  statusSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  successBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#7BE8A6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7BE8A6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 8,
  },
  successTitle: { fontFamily: "Inter_700Bold", fontSize: 20, color: "#ffffff", marginTop: 16 },
  successSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.78)",
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 14,
    lineHeight: 19,
  },
  featList: { width: "100%", marginTop: 22, gap: 8 },
  featRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
  },
  doneBtn: {
    marginTop: 22,
    width: "100%",
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.3)",
  },
  doneText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#ffffff",
    letterSpacing: 0.3,
  },
});
