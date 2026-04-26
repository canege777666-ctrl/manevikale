export interface WidgetTheme {
  id: string;
  name: string;
  premium: boolean;
  background: [string, string];
  accent: string;
  textColor: string;
  mutedTextColor: string;
}

export const WIDGET_THEMES: WidgetTheme[] = [
  {
    id: "midnight",
    name: "Gece Yarısı",
    premium: false,
    background: ["#1a0e3a", "#0a0820"],
    accent: "#FFD9A8",
    textColor: "#ffffff",
    mutedTextColor: "rgba(255,255,255,0.7)",
  },
  {
    id: "dawn",
    name: "Şafak",
    premium: false,
    background: ["#3a2a5c", "#1a1033"],
    accent: "#F4C97A",
    textColor: "#ffffff",
    mutedTextColor: "rgba(255,255,255,0.75)",
  },
  {
    id: "rose-gold",
    name: "Gül Altın",
    premium: true,
    background: ["#3d1a3a", "#1a0820"],
    accent: "#F4A9C7",
    textColor: "#ffffff",
    mutedTextColor: "rgba(255,255,255,0.78)",
  },
  {
    id: "emerald",
    name: "Zümrüt",
    premium: true,
    background: ["#0f3a2a", "#08201a"],
    accent: "#9DD9C2",
    textColor: "#ffffff",
    mutedTextColor: "rgba(255,255,255,0.78)",
  },
  {
    id: "royal",
    name: "Hâkânî",
    premium: true,
    background: ["#1a1a4a", "#08083a"],
    accent: "#A9B5D9",
    textColor: "#ffffff",
    mutedTextColor: "rgba(255,255,255,0.8)",
  },
];

export type WidgetFontId = "inter" | "serif" | "mono";

export interface WidgetFont {
  id: WidgetFontId;
  name: string;
  fontFamily: string;
}

export const WIDGET_FONTS: WidgetFont[] = [
  { id: "inter", name: "Inter (Modern)", fontFamily: "Inter_500Medium" },
  { id: "serif", name: "Serif (Klasik)", fontFamily: "serif" },
  { id: "mono", name: "Mono (Sade)", fontFamily: "monospace" },
];

export type WidgetCategoryId =
  | "all"
  | "patience"
  | "success"
  | "gratitude"
  | "hope"
  | "trust";

export interface WidgetCategory {
  id: WidgetCategoryId;
  name: string;
  nameEn: string;
}

export const WIDGET_CATEGORIES: WidgetCategory[] = [
  { id: "all", name: "Tümü", nameEn: "All" },
  { id: "patience", name: "Sabır", nameEn: "Patience" },
  { id: "success", name: "Başarı", nameEn: "Success" },
  { id: "gratitude", name: "Şükran", nameEn: "Gratitude" },
  { id: "hope", name: "Umut", nameEn: "Hope" },
  { id: "trust", name: "Tevekkül", nameEn: "Trust" },
];

export function getThemeById(id: string): WidgetTheme {
  return WIDGET_THEMES.find((t) => t.id === id) ?? WIDGET_THEMES[0]!;
}

export function getFontById(id: WidgetFontId): WidgetFont {
  return WIDGET_FONTS.find((f) => f.id === id) ?? WIDGET_FONTS[0]!;
}

export function getCategoryById(id: WidgetCategoryId): WidgetCategory {
  return WIDGET_CATEGORIES.find((c) => c.id === id) ?? WIDGET_CATEGORIES[0]!;
}
