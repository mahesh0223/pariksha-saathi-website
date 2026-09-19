import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

const KEY = 'ps_language';

export type LanguageCode = 'en' | 'hi';

interface LanguageState {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageState | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(
    () => (localStorage.getItem(KEY) as LanguageCode | null) ?? 'en',
  );

  const value = useMemo<LanguageState>(
    () => ({
      language,
      setLanguage: (lang) => {
        localStorage.setItem(KEY, lang);
        setLanguageState(lang);
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageState {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
