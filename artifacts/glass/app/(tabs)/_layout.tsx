import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { useReligious } from "@/context/ReligiousContext";
import { useI18n } from "@/context/I18nContext";

interface TabIconProps {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  color: string;
  locked?: boolean;
}

function TabIcon({ name, focused, color, locked }: TabIconProps) {
  return (
    <View style={iconStyles.wrap}>
      {focused && <View style={iconStyles.glow} />}
      <Ionicons name={name} size={focused ? 23 : 21} color={color} />
      {locked && (
        <View style={iconStyles.lockBadge}>
          <Ionicons name="lock-closed" size={9} color="#1a1033" />
        </View>
      )}
    </View>
  );
}

function TabLabel({
  label,
  focused,
  locked,
}: {
  label: string;
  focused: boolean;
  locked?: boolean;
}) {
  return (
    <View style={labelStyles.row}>
      <Text
        style={[
          labelStyles.text,
          { color: focused ? "#ffffff" : "rgba(255,255,255,0.6)" },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
      {locked && (
        <Ionicons
          name="lock-closed"
          size={9}
          color={focused ? "#FFD9A8" : "rgba(255,217,168,0.7)"}
          style={{ marginLeft: 3 }}
        />
      )}
    </View>
  );
}

export default function TabLayout() {
  const isWeb = Platform.OS === "web";
  const { isPremium } = useReligious();
  const { t } = useI18n();
  const showLock = !isPremium;

  return (
    <Tabs
      screenListeners={{
        tabPress: () => {
          if (Platform.OS !== "web") {
            Haptics.selectionAsync();
          }
        },
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          left: 12,
          right: 12,
          bottom: isWeb ? 24 : 22,
          height: 70,
          borderRadius: 28,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: "rgba(255,255,255,0.18)",
          elevation: 0,
          paddingTop: 10,
          paddingBottom: 10,
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 22,
          shadowOffset: { width: 0, height: 8 },
        },
        tabBarItemStyle: { marginTop: 0 },
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <BlurView
              intensity={Platform.OS === "android" ? 95 : 75}
              tint="dark"
              style={[StyleSheet.absoluteFill, { borderRadius: 28, overflow: "hidden" }]}
            />
            <View
              style={[
                StyleSheet.absoluteFill,
                { borderRadius: 28, backgroundColor: "rgba(8,12,30,0.55)" },
              ]}
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Kur'an",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="book" focused={focused} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Kur'an" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="incil"
        options={{
          title: "İncil",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bookmark" focused={focused} color={color} locked={showLock} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel label="İncil" focused={focused} locked={showLock} />
          ),
        }}
      />
      <Tabs.Screen
        name="tevrat"
        options={{
          title: "Tevrat",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="library" focused={focused} color={color} locked={showLock} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Tevrat" focused={focused} locked={showLock} />
          ),
        }}
      />
      <Tabs.Screen
        name="dualar"
        options={{
          title: "Dualar",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="heart" focused={focused} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel label="Dualar" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="daha"
        options={{
          title: t("moreTitle"),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="apps" focused={focused} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel label={t("moreTitle")} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const iconStyles = StyleSheet.create({
  wrap: { width: 36, height: 28, alignItems: "center", justifyContent: "center" },
  glow: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    top: -4,
  },
  lockBadge: {
    position: "absolute",
    right: -2,
    top: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FFD9A8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.5)",
  },
});

const labelStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  text: {
    fontFamily: "Inter_500Medium",
    fontSize: 10.5,
    letterSpacing: 0.2,
  },
});
