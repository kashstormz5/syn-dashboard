"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getGuildById, getUserGuilds } from "@/lib/discord";
import {
  createGuildLog,
  upsertGuildModules,
  upsertGuildSettings
} from "@/lib/guild-settings";
import { defaultModules, GuildModules } from "@/models/guild-settings";

export async function saveGuildSettings(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id || !session.accessToken) {
    redirect("/");
  }

  const guildId = String(formData.get("guildId") ?? "");
  const prefix = String(formData.get("prefix") ?? "!")
    .trim()
    .slice(0, 5) || "!";
  const ownerId = String(formData.get("ownerId") ?? "").trim();
  const adminRoleId = String(formData.get("adminRoleId") ?? "").trim();
  const logChannelId = String(formData.get("logChannelId") ?? "");
  const welcomeMessage = String(formData.get("welcomeMessage") ?? "");

  if (!guildId) {
    throw new Error("Guild id is required.");
  }

  const guilds = await getUserGuilds(session.accessToken);
  const guild = getGuildById(guilds, guildId);

  if (!guild) {
    throw new Error("You do not have access to update this guild.");
  }

  await upsertGuildSettings({
    guildId,
    prefix,
    ownerId,
    adminRoleId,
    logChannelId,
    welcomeMessage,
    updatedBy: session.user.id
  });

  await createGuildLog({
    guildId,
    actorId: session.user.id,
    actorName: session.user.name ?? "Discord User",
    source: "dashboard",
    level: "success",
    action: "Dashboard settings updated",
    details: `Prefix set to ${prefix}, owner set to ${ownerId || "not set"}, admin role set to ${adminRoleId || "not set"}.`
  });

  redirect(`/dashboard/${guildId}?saved=dashboard`);
}

function getModuleValue(formData: FormData, key: keyof GuildModules) {
  return formData.get(key) === "on";
}

export async function saveGuildModules(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id || !session.accessToken) {
    redirect("/");
  }

  const guildId = String(formData.get("guildId") ?? "");

  if (!guildId) {
    throw new Error("Guild id is required.");
  }

  const guilds = await getUserGuilds(session.accessToken);
  const guild = getGuildById(guilds, guildId);

  if (!guild) {
    throw new Error("You do not have access to update this guild.");
  }

  const modules: GuildModules = {
    autoMod: getModuleValue(formData, "autoMod"),
    autoRole: getModuleValue(formData, "autoRole"),
    welcomeMessages: getModuleValue(formData, "welcomeMessages"),
    moderationLogs: getModuleValue(formData, "moderationLogs"),
    inviteTracking: getModuleValue(formData, "inviteTracking"),
    suggestions: getModuleValue(formData, "suggestions")
  };

  await upsertGuildModules({
    guildId,
    modules,
    updatedBy: session.user.id
  });

  const changedModules = Object.entries(modules)
    .filter(([key, value]) => value !== defaultModules[key as keyof GuildModules])
    .map(([key, value]) => `${key}: ${value ? "on" : "off"}`)
    .join(", ");

  await createGuildLog({
    guildId,
    actorId: session.user.id,
    actorName: session.user.name ?? "Discord User",
    source: "dashboard",
    level: "success",
    action: "Modules updated",
    details: changedModules || "All modules are currently at their default values."
  });

  redirect(`/dashboard/${guildId}/modules?saved=1`);
}
