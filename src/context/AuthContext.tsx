"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { AddressEntry } from "@/lib/types";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  addressBook?: AddressEntry[];
  wishlist?: string[]; // product slugs
};

type AuthContextType = {
  user: User | null;
  isAuthOpen: boolean;
  authMode: "login" | "register";
  redirectAfterAuth: string | null;
  openAuth: (mode?: "login" | "register", redirectTo?: string) => void;
  closeAuth: () => void;
  setAuthMode: (mode: "login" | "register") => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => void;
  logout: () => void;
  // Address book
  addAddress: (addr: AddressEntry) => void;
  updateAddress: (addr: AddressEntry) => void;
  removeAddress: (id: string) => void;
  // Wishlist
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
};

export type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("devoiler-user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (user) {
        localStorage.setItem("devoiler-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("devoiler-user");
      }
    }
  }, [user, mounted]);

  const openAuth = useCallback((mode: "login" | "register" = "login", redirectTo?: string) => {
    setAuthMode(mode);
    setRedirectAfterAuth(redirectTo ?? null);
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setIsAuthOpen(false), []);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Mock login — in production, this would call an API
    const users = JSON.parse(localStorage.getItem("devoiler-users") || "[]");
    const found = users.find((u: User & { password: string }) => u.email === email);
    if (found) {
      const { password: _pw, ...userData } = found;
      void _pw;
      setUser(userData);
      setIsAuthOpen(false);
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    // Mock register — in production, this would call an API
    const users = JSON.parse(localStorage.getItem("devoiler-users") || "[]");
    if (users.find((u: User) => u.email === data.email)) {
      return false; // email already exists
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
    };

    users.push({ ...newUser, password: data.password });
    localStorage.setItem("devoiler-users", JSON.stringify(users));
    setUser(newUser);
    setIsAuthOpen(false);
    return true;
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("devoiler-user");
  }, []);

  const addAddress = useCallback((addr: AddressEntry) => {
    setUser((prev) => {
      if (!prev) return null;
      const book = prev.addressBook || [];
      return { ...prev, addressBook: [...book, addr] };
    });
  }, []);

  const updateAddress = useCallback((addr: AddressEntry) => {
    setUser((prev) => {
      if (!prev) return null;
      const book = (prev.addressBook || []).map((a) => (a.id === addr.id ? addr : a));
      return { ...prev, addressBook: book };
    });
  }, []);

  const removeAddress = useCallback((id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const book = (prev.addressBook || []).filter((a) => a.id !== id);
      return { ...prev, addressBook: book };
    });
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const wl = prev.wishlist || [];
      const exists = wl.includes(slug);
      return { ...prev, wishlist: exists ? wl.filter((s) => s !== slug) : [...wl, slug] };
    });
  }, []);

  const isInWishlist = useCallback(
    (slug: string) => {
      return (user?.wishlist || []).includes(slug);
    },
    [user?.wishlist]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthOpen,
        authMode,
        redirectAfterAuth,
        openAuth,
        closeAuth,
        setAuthMode,
        login,
        register,
        updateProfile,
        logout,
        addAddress,
        updateAddress,
        removeAddress,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
