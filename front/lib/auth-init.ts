"use client";

import { useAuthStore } from "@/store/auth.store";
import { refreshToken } from "./auth";

/**
 * Initialise l'authentification au démarrage de l'application
 * Si un refresh_token existe dans localStorage, tente de récupérer un nouvel access_token
 */
export async function initAuth(): Promise<void> {
  const refresh_token = localStorage.getItem("refresh_token");
  
  if (refresh_token) {
    try {
      await refreshToken();
    } catch (error) {
      // Si le refresh échoue, on nettoie
      useAuthStore.getState().logout();
    }
  }
}

