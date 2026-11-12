"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { tr } from "@/content/es-en";

export type Lang = "es" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Inline translation: t("Texto en español", "English text"). Si falta el inglés usa el diccionario. */
  t: (es: string, en?: string) => string;
};

const LangContext = createContext<Ctx | null>(null);
const KEY = "woway.lang.v1";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved === "en" || saved === "es") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (es: string, en?: string) => (lang === "en" ? (en ?? tr(es)) : es),
    }),
    [lang, setLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
