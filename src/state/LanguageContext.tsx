import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

const KEY = 'ps_language';

export type LanguageCode = 'en' | 'hi';

interface LanguageState {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageState | null>(null);

// An explicit choice (stored by setLanguage) always wins. With none, a device whose first
// preferred language is Hindi starts in Hindi; the detected default is deliberately not stored,
// so it keeps following the device until the student picks a language themselves.
function initialLanguage(): LanguageCode {
  const stored = localStorage.getItem(KEY);
  if (stored === 'en' || stored === 'hi') return stored;
  const preferred = typeof navigator === 'undefined' ? '' : (navigator.languages?.[0] ?? navigator.language ?? '');
  return preferred.toLowerCase().startsWith('hi') ? 'hi' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage);

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
