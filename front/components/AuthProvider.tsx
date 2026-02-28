"use client";

import { useEffect } from "react";
import { initAuth } from "@/lib/auth-init";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAuth();
  }, []);

  return <>{children}</>;
}

