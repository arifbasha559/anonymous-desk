import { api, saveTokens, clearTokens, getAccessToken } from "./client";

export async function register({ email, password, industry, jobTitle, yearsExp }) {
  const data = await api.post(
    "/auth/register",
    { email, password, industry, jobTitle, yearsExp },
    { auth: false }
  );
  await saveTokens(data);
  return data;
}

export async function login({ email, password }) {
  
  const data = await api.post("/auth/login", { email, password }, { auth: false });
  await saveTokens(data);
  return data;
}

export async function logout() {
  const token = await getAccessToken();
  if (token) {
    await api.post("/auth/token/revoke", {}).catch(() => {});
  }
  await clearTokens();
}

export async function updateIndustry({ industry, jobTitle, yearsExp }) {
  return api.patch("/auth/profile/industry", { industry, jobTitle, yearsExp });
}

export async function isLoggedIn() {
  const token = await getAccessToken();
  return Boolean(token);
}
