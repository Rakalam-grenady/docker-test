import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface RefreshResponse {
  access_token: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/login`,
    credentials
  );
  
  const { access_token, refresh_token } = response.data;
  
  // Stocker access_token en mémoire (Zustand)
  useAuthStore.getState().setAccessToken(access_token);
  
  // Stocker refresh_token en localStorage
  localStorage.setItem("refresh_token", refresh_token);
  
  return response.data;
}

export async function refreshToken(): Promise<string> {
  const refresh_token = localStorage.getItem("refresh_token");
  
  if (!refresh_token) {
    throw new Error("No refresh token available");
  }
  
  const response = await axios.post<RefreshResponse>(
    `${API_URL}/auth/refresh`,
    { refresh_token }
  );
  
  const { access_token } = response.data;
  
  // Mettre à jour l'access_token en mémoire
  useAuthStore.getState().setAccessToken(access_token);
  
  return access_token;
}

export function logout() {
  useAuthStore.getState().logout();
}

