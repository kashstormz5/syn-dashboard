const requiredEnvKeys = [
  "AUTH_SECRET",
  "AUTH_DISCORD_ID",
  "AUTH_DISCORD_SECRET",
  "MONGODB_URI"
] as const;

export function getMissingEnvVars() {
  return requiredEnvKeys.filter((key) => !process.env[key]);
}

export function hasRequiredEnvVars() {
  return getMissingEnvVars().length === 0;
}

export function getAuthSecret() {
  if (process.env.AUTH_SECRET) {
    return process.env.AUTH_SECRET;
  }

  if (process.env.NODE_ENV !== "production") {
    return "dev-only-secret-change-me";
  }

  return undefined;
}
