"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { content, type Dict, type Locale } from "@/lib/content";

/* ------------------------------- language -------------------------------- */

type LangValue = {
  locale: Locale;
  toggleLocale: () => void;
  t: Dict;
};

const LangContext = createContext<LangValue | null>(null);

export const LANG_KEY = "vf-lang";
export const THEME_KEY = "vf-theme";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Server and first client render always use "ar" so hydration matches; the
  // stored preference is applied right after mount.
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "ar") setLocale(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem(LANG_KEY, locale);
  }, [locale]);

  const toggleLocale = useCallback(
    () => setLocale((l) => (l === "ar" ? "en" : "ar")),
    [],
  );

  return (
    <LangContext.Provider value={{ locale, toggleLocale, t: content[locale] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}

/* --------------------------------- theme --------------------------------- */

type Theme = "dark" | "light";

type ThemeValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Matches the `dark` class rendered on <html> by default in the layout.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((v) => (v === "dark" ? "light" : "dark")),
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
