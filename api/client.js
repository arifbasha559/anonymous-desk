import * as SecureStore from "expo-secure-store";

// Configure via EXPO_PUBLIC_API_URL in a .env file (Expo reads this at build time).
// Falls back to localhost for the simulator; use your machine's LAN IP for a real device.
const API_BASE = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/api/v1";

const ACCESS_KEY = "ad_access_token";
const REFRESH_KEY = "ad_refresh_token";

export async function getAccessToken() {
  return SecureStore.getItemAsync(ACCESS_KEY);
}

export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_KEY);
}

export async function saveTokens({ accessToken, refreshToken }) {
  await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
  if (refreshToken) await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
}

export async function clearTokens() {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}

class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Core request helper. Automatically attaches the bearer token, and on a 401
 * makes one attempt to refresh the token pair before retrying the original
 * request — so a short-lived access token expiring mid-session is invisible
 * to the rest of the app.
 */
async function request(path, { method = "GET", body, query, auth = true, retry = true } = {}) {
  let url = `${API_BASE}${path}`;
  if (query) {
    const qs = new URLSearchParams(
      Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== "")
    ).toString();
    if (qs) url += `?${qs}`;
  }

  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = await getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401 && retry && auth) {
      const refreshed = await tryRefresh();
      if (refreshed) {
        return request(path, { method, body, query, auth, retry: false });
      }
    }
    throw new ApiError(
      res.status,
      json?.error?.code || "ERROR",
      json?.error?.message || "Something went wrong",
      json?.error?.details
    );
  }

  return json.data;
}

async function tryRefresh() {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    const json = await res.json();
    if (!res.ok) return false;
    await saveTokens(json.data);
    return true;
  } catch {
    return false;
  }
}

export const api = {
  get: (path, query) => request(path, { method: "GET", query }),
  post: (path, body, opts) => request(path, { method: "POST", body, ...opts }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export { ApiError };
