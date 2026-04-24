import { connectToDatabase } from "@/lib/mongodb";
import { GuildLog } from "@/models/guild-log";
import {
  defaultModules,
  GuildModules,
  GuildSettings
} from "@/models/guild-settings";

export type GuildSettingsValues = {
  guildId: string;
  prefix: string;
  ownerId: string;
  adminRoleId: string;
  logChannelId: string;
  welcomeMessage: string;
  updatedBy: string;
};

export type GuildModuleValues = {
  guildId: string;
  modules: GuildModules;
  updatedBy: string;
};

export type GuildLogValues = {
  guildId: string;
  actorId: string;
  actorName: string;
  source?: "dashboard" | "bot";
  level?: "info" | "success" | "warning" | "error";
  action: string;
  details: string;
};

export async function getGuildSettings(guildId: string) {
  await connectToDatabase();

  const doc = await GuildSettings.findOne({ guildId }).lean<{
    guildId: string;
    prefix: string;
    ownerId: string;
    adminRoleId: string;
    logChannelId: string;
    welcomeMessage: string;
    modules?: Partial<GuildModules>;
  } | null>();

  if (!doc) {
    return {
      guildId,
      prefix: "!",
      ownerId: "",
      adminRoleId: "",
      logChannelId: "",
      welcomeMessage: "Welcome to the server.",
      modules: defaultModules
    };
  }

  return {
    guildId: doc.guildId,
    prefix: doc.prefix,
    ownerId: doc.ownerId,
    adminRoleId: doc.adminRoleId,
    logChannelId: doc.logChannelId,
    welcomeMessage: doc.welcomeMessage,
    modules: {
      ...defaultModules,
      ...doc.modules
    }
  };
}

export async function upsertGuildSettings(values: GuildSettingsValues) {
  await connectToDatabase();

  return GuildSettings.findOneAndUpdate(
    { guildId: values.guildId },
    {
      $set: {
        prefix: values.prefix,
        ownerId: values.ownerId,
        adminRoleId: values.adminRoleId,
        logChannelId: values.logChannelId,
        welcomeMessage: values.welcomeMessage,
        updatedBy: values.updatedBy
      }
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );
}

export async function upsertGuildModules(values: GuildModuleValues) {
  await connectToDatabase();

  return GuildSettings.findOneAndUpdate(
    { guildId: values.guildId },
    {
      $set: {
        modules: values.modules,
        updatedBy: values.updatedBy
      }
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );
}

export async function createGuildLog(values: GuildLogValues) {
  await connectToDatabase();

  return GuildLog.create({
    source: "dashboard",
    level: "info",
    ...values
  });
}

export async function getGuildLogs(guildId: string, limit = 30) {
  await connectToDatabase();

  const docs = await GuildLog.find({ guildId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<
      {
        action: string;
        actorName: string;
        source: "dashboard" | "bot";
        level: "info" | "success" | "warning" | "error";
        details: string;
        createdAt: Date;
      }[]
    >();

  return docs;
}
