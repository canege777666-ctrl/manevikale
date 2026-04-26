import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GradientBackground } from "@/components/GradientBackground";
import { ReligiousProvider } from "@/context/ReligiousContext";
import { I18nProvider } from "@/context/I18nContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <I18nProvider>
          <ReligiousProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <KeyboardProvider>
                <StatusBar style="light" />
                <GradientBackground />
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "transparent" },
                    animation: "fade",
                  }}
                >
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen
                    name="surah/[no]"
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="scripture/[testament]/[bookId]"
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="sozler"
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="koc"
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="topluluk"
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="widget-studio"
                    options={{ animation: "slide_from_right" }}
                  />
                  <Stack.Screen
                    name="ayarlar"
                    options={{ animation: "slide_from_right" }}
                  />
                </Stack>
              </KeyboardProvider>
            </GestureHandlerRootView>
          </ReligiousProvider>
        </I18nProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
