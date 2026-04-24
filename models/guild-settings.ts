import { Schema, model, models } from "mongoose";

export const defaultModules = {
  autoMod: true,
  autoRole: false,
  welcomeMessages: true,
  moderationLogs: true,
  inviteTracking: false,
  suggestions: false
};

export type GuildModules = typeof defaultModules;

export const defaultControlPanel = {
  moderation: {
    antiSpam: true,
    autoDeleteInvites: false,
    modAction: "timeout",
    modAlertChannel: "",
    auditLogs: true
  },
  welcome: {
    enabled: true,
    channelId: "",
    message: "Welcome to the server."
  },
  logging: {
    enabled: true,
    channelId: "",
    mode: "important",
    includeDashboardChanges: true
  },
  autoRoles: {
    enabled: true,
    roleId: "",
    delay: "instant"
  },
  server: {
    language: "en",
    timezone: "europe-london",
    accentColor: "#5B7CFF"
  }
};

export type GuildControlPanel = typeof defaultControlPanel;

export type GuildSettingsDocument = {
  guildId: string;
  prefix: string;
  ownerId: string;
  adminRoleId: string;
  logChannelId: string;
  welcomeMessage: string;
  modules: GuildModules;
  controlPanel: GuildControlPanel;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
};

const modulesSchema = new Schema<GuildModules>(
  {
    autoMod: { type: Boolean, default: defaultModules.autoMod },
    autoRole: { type: Boolean, default: defaultModules.autoRole },
    welcomeMessages: {
      type: Boolean,
      default: defaultModules.welcomeMessages
    },
    moderationLogs: {
      type: Boolean,
      default: defaultModules.moderationLogs
    },
    inviteTracking: {
      type: Boolean,
      default: defaultModules.inviteTracking
    },
    suggestions: { type: Boolean, default: defaultModules.suggestions }
  },
  {
    _id: false
  }
);

const controlPanelSchema = new Schema<GuildControlPanel>(
  {
    moderation: {
      antiSpam: { type: Boolean, default: defaultControlPanel.moderation.antiSpam },
      autoDeleteInvites: {
        type: Boolean,
        default: defaultControlPanel.moderation.autoDeleteInvites
      },
      modAction: { type: String, default: defaultControlPanel.moderation.modAction },
      modAlertChannel: {
        type: String,
        default: defaultControlPanel.moderation.modAlertChannel
      },
      auditLogs: { type: Boolean, default: defaultControlPanel.moderation.auditLogs }
    },
    welcome: {
      enabled: { type: Boolean, default: defaultControlPanel.welcome.enabled },
      channelId: { type: String, default: defaultControlPanel.welcome.channelId },
      message: { type: String, default: defaultControlPanel.welcome.message }
    },
    logging: {
      enabled: { type: Boolean, default: defaultControlPanel.logging.enabled },
      channelId: { type: String, default: defaultControlPanel.logging.channelId },
      mode: { type: String, default: defaultControlPanel.logging.mode },
      includeDashboardChanges: {
        type: Boolean,
        default: defaultControlPanel.logging.includeDashboardChanges
      }
    },
    autoRoles: {
      enabled: { type: Boolean, default: defaultControlPanel.autoRoles.enabled },
      roleId: { type: String, default: defaultControlPanel.autoRoles.roleId },
      delay: { type: String, default: defaultControlPanel.autoRoles.delay }
    },
    server: {
      language: { type: String, default: defaultControlPanel.server.language },
      timezone: { type: String, default: defaultControlPanel.server.timezone },
      accentColor: { type: String, default: defaultControlPanel.server.accentColor }
    }
  },
  {
    _id: false
  }
);

const guildSettingsSchema = new Schema<GuildSettingsDocument>(
  {
    guildId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    prefix: {
      type: String,
      default: "!"
    },
    ownerId: {
      type: String,
      default: ""
    },
    adminRoleId: {
      type: String,
      default: ""
    },
    logChannelId: {
      type: String,
      default: ""
    },
    welcomeMessage: {
      type: String,
      default: "Welcome to the server."
    },
    modules: {
      type: modulesSchema,
      default: defaultModules
    },
    controlPanel: {
      type: controlPanelSchema,
      default: defaultControlPanel
    },
    updatedBy: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export const GuildSettings =
  models.GuildSettings ||
  model<GuildSettingsDocument>("GuildSettings", guildSettingsSchema);
