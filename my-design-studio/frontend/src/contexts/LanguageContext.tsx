"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/translations";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: typeof translations.id;
  isLanguageSheetOpen: boolean;
  setLanguageSheetOpen: (open: boolean) => void;
  isWelcomePopupOpen: boolean;
  setWelcomePopupOpen: (open: boolean) => void;
  isCustomCursorEnabled: boolean;
  setCustomCursorEnabled: (enabled: boolean) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState("id");
  const [isClient, setIsClient] = useState(false);
  const [isLanguageSheetOpen, setLanguageSheetOpen] = useState(false);
  const [isWelcomePopupOpen, setWelcomePopupOpen] = useState(false);
  const [isCustomCursorEnabled, setCustomCursorEnabledState] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem("appLang");
    const hasSelectedLanguage = localStorage.getItem("language_selected");
    const savedCursor = localStorage.getItem("custom_cursor");
    
    if (savedCursor !== null) {
      setCustomCursorEnabledState(savedCursor === "true");
    }

    if (savedLang) {
      setLanguageState(savedLang);
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    }
    
    // Welcome popup dinonaktifkan atas permintaan user
    // if (!hasSelectedLanguage) {
    //   setWelcomePopupOpen(true);
    // }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("appLang", lang);
    localStorage.setItem("language_selected", "true");
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const setCustomCursorEnabled = (enabled: boolean) => {
    setCustomCursorEnabledState(enabled);
    localStorage.setItem("custom_cursor", enabled.toString());
  };

  const t = translations[language as keyof typeof translations] || translations.id;

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage, t, 
      isLanguageSheetOpen, setLanguageSheetOpen,
      isWelcomePopupOpen, setWelcomePopupOpen,
      isCustomCursorEnabled, setCustomCursorEnabled
    }}>
      <div style={{ visibility: isClient ? "visible" : "hidden", width: "100%", height: "100%" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
