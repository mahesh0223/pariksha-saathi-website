import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

const TOKEN_KEY = 'ps_auth_token';
const EMAIL_KEY = 'ps_auth_email';

interface AuthState {
  token: string | null;
  email: string | null;
  setSession: (token: string, email: string) => void;
  clearSession: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

// Minimal for now - full register/login/change-password/delete-account UI lands later. This just
// gives every other module (the sync queue, progress API calls) a stable place to read "are we
// signed in right now," so they don't need rewiring once the real auth screen exists.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [email, setEmail] = useState<string | null>(() => localStorage.getItem(EMAIL_KEY));

  const value = useMemo<AuthState>(
    () => ({
      token,
      email,
      setSession: (newToken, newEmail) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(EMAIL_KEY, newEmail);
        setToken(newToken);
        setEmail(newEmail);
      },
      clearSession: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(EMAIL_KEY);
        setToken(null);
        setEmail(null);
      },
    }),
    [token, email],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
