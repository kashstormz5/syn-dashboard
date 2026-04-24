"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getGuildById, getUserGuilds } from "@/lib/discord";
import {
  createGuildLog,
  upsertGuildControlPanel,
  upsertGuildModules,
  upsertGuildSettings
} from "@/lib/guild-settings";
import {
  defaultControlPanel,
  defaultModules,
  GuildControlPanel,
  GuildModules
} from "@/models/guild-settings";

export async function saveGuildSettings(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id || !session.accessToken) {
    redirect("/");
  }

  const guildId = String(formData.get("guildId") ?? "");
const prefix = String(formData.get("prefix") ?? "!")
  .trim()
  .slice(0, 5) || "!";
  const ownerId = String(formData.get("ownerId") ?? "").trim().slice(0, 64);
  const adminRoleId = String(formData.get("adminRoleId") ?? "").trim().slice(0, 64);
  const logChannelId = String(formData.get("logChannelId") ?? "").trim().slice(0, 64);
  const welcomeMessage = String(formData.get("welcomeMessage") ?? "")
    .trim()
    .slice(0, 2000);

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

function limitText(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function getBooleanValue(value: unknown, fallback: boolean) {
  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return fallback;
}

export async function saveControlPanelSettings(input: {
  guildId: string;
  settings: GuildControlPanel & {
    prefix: string;
    ownerId: string;
    adminRoleId: string;
    logChannelId: string;
    welcomeMessage: string;
  };
}) {
  const session = await auth();

  if (!session?.user?.id || !session.accessToken) {
    redirect("/");
  }

  const guildId = String(input.guildId ?? "");

  if (!guildId) {
    throw new Error("Guild id is required.");
  }

  const guilds = await getUserGuilds(session.accessToken);
  const guild = getGuildById(guilds, guildId);

  if (!guild) {
    throw new Error("You do not have access to update this guild.");
  }

  const settings = input.settings;
  const prefix = limitText(settings.prefix || "!", 5) || "!";
  const ownerId = limitText(settings.ownerId, 64);
  const adminRoleId = limitText(settings.adminRoleId, 64);
  const logChannelId = limitText(settings.logChannelId, 64);
  const welcomeMessage = limitText(settings.welcomeMessage, 2000);

  const controlPanel: GuildControlPanel = {
    moderation: {
      antiSpam: getBooleanValue(
        settings.moderation?.antiSpam,
        defaultControlPanel.moderation.antiSpam
      ),
      autoDeleteInvites: getBooleanValue(
        settings.moderation?.autoDeleteInvites,
        defaultControlPanel.moderation.autoDeleteInvites
      ),
      modAction:
        limitText(settings.moderation?.modAction, 32) ||
        defaultControlPanel.moderation.modAction,
      modAlertChannel: limitText(settings.moderation?.modAlertChannel, 64),
      auditLogs: getBooleanValue(
        settings.moderation?.auditLogs,
        defaultControlPanel.moderation.auditLogs
      )
    },
    welcome: {
      enabled: getBooleanValue(
        settings.welcome?.enabled,
        defaultControlPanel.welcome.enabled
      ),
      channelId: limitText(settings.welcome?.channelId, 64),
      message: limitText(settings.welcome?.message, 2000) || welcomeMessage
    },
    logging: {
      enabled: getBooleanValue(
        settings.logging?.enabled,
        defaultControlPanel.logging.enabled
      ),
      channelId: limitText(settings.logging?.channelId, 64) || logChannelId,
      mode:
        limitText(settings.logging?.mode, 32) ||
        defaultControlPanel.logging.mode,
      includeDashboardChanges: getBooleanValue(
        settings.logging?.includeDashboardChanges,
        defaultControlPanel.logging.includeDashboardChanges
      )
    },
    autoRoles: {
      enabled: getBooleanValue(
        settings.autoRoles?.enabled,
        defaultControlPanel.autoRoles.enabled
      ),
      roleId: limitText(settings.autoRoles?.roleId, 64) || adminRoleId,
      delay:
        limitText(settings.autoRoles?.delay, 32) ||
        defaultControlPanel.autoRoles.delay
    },
    server: {
      language:
        limitText(settings.server?.language, 32) ||
        defaultControlPanel.server.language,
      timezone:
        limitText(settings.server?.timezone, 64) ||
        defaultControlPanel.server.timezone,
      accentColor:
        limitText(settings.server?.accentColor, 16) ||
        defaultControlPanel.server.accentColor
    }
  };

  await upsertGuildSettings({
    guildId,
    prefix,
    ownerId,
    adminRoleId,
    logChannelId,
    welcomeMessage,
    updatedBy: session.user.id
  });

  await upsertGuildControlPanel({
    guildId,
    controlPanel,
    updatedBy: session.user.id
  });

  await createGuildLog({
    guildId,
    actorId: session.user.id,
    actorName: session.user.name ?? "Discord User",
    source: "dashboard",
    level: "success",
    action: "Control panel settings updated",
    details: `Saved Syn panel settings for overview, moderation, welcome, logging, auto roles, and server preferences.`
  });

  return {
    ok: true
  };
}
