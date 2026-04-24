import { connectToDatabase } from "@/lib/mongodb";
import { GuildLog } from "@/models/guild-log";
import {
  defaultControlPanel,
  defaultModules,
  GuildControlPanel,
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

export type GuildControlPanelValues = {
  guildId: string;
  controlPanel: GuildControlPanel;
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
    controlPanel?: Partial<GuildControlPanel>;
  } | null>();

  if (!doc) {
    return {
      guildId,
      prefix: "!",
      ownerId: "",
      adminRoleId: "",
      logChannelId: "",
      welcomeMessage: "Welcome to the server.",
      modules: defaultModules,
      controlPanel: defaultControlPanel
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
    },
    controlPanel: {
      ...defaultControlPanel,
      ...doc.controlPanel,
      moderation: {
        ...defaultControlPanel.moderation,
        ...doc.controlPanel?.moderation
      },
      welcome: {
        ...defaultControlPanel.welcome,
        ...doc.controlPanel?.welcome
      },
      logging: {
        ...defaultControlPanel.logging,
        ...doc.controlPanel?.logging
      },
      autoRoles: {
        ...defaultControlPanel.autoRoles,
        ...doc.controlPanel?.autoRoles
      },
      server: {
        ...defaultControlPanel.server,
        ...doc.controlPanel?.server
      }
    }
  };
}

export async function getGuildSettingsSafe(guildId: string) {
  try {
    const settings = await getGuildSettings(guildId);
    return {
      settings,
      error: null
    };
  } catch (error) {
    console.error("Guild settings fetch failed:", error);
    return {
      settings: {
        guildId,
        prefix: "!",
        ownerId: "",
        adminRoleId: "",
        logChannelId: "",
        welcomeMessage: "Welcome to the server.",
        modules: defaultModules,
        controlPanel: defaultControlPanel
      },
      error:
        "MongoDB could not return this server's saved settings right now. Check your database connection and Atlas network access."
    };
  }
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

export async function upsertGuildControlPanel(values: GuildControlPanelValues) {
  await connectToDatabase();

  return GuildSettings.findOneAndUpdate(
    { guildId: values.guildId },
    {
      $set: {
        controlPanel: values.controlPanel,
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

export async function getGuildLogsSafe(guildId: string, limit = 30) {
  try {
    const logs = await getGuildLogs(guildId, limit);
    return {
      logs,
      error: null
    };
  } catch (error) {
    console.error("Guild logs fetch failed:", error);
    return {
      logs: [] as Awaited<ReturnType<typeof getGuildLogs>>,
      error:
        "MongoDB could not return this server's logs right now. Check your database connection and Atlas network access."
    };
  }
}
