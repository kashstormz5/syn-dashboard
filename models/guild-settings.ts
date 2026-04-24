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

export type GuildSettingsDocument = {
  guildId: string;
  prefix: string;
  ownerId: string;
  adminRoleId: string;
  logChannelId: string;
  welcomeMessage: string;
  modules: GuildModules;
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
