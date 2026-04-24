import { Schema, model, models } from "mongoose";

export type GuildLogDocument = {
  guildId: string;
  actorId: string;
  actorName: string;
  source: "dashboard" | "bot";
  level: "info" | "success" | "warning" | "error";
  action: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
};

const guildLogSchema = new Schema<GuildLogDocument>(
  {
    guildId: {
      type: String,
      required: true,
      index: true
    },
    actorId: {
      type: String,
      default: ""
    },
    actorName: {
      type: String,
      default: ""
    },
    source: {
      type: String,
      enum: ["dashboard", "bot"],
      default: "dashboard"
    },
    level: {
      type: String,
      enum: ["info", "success", "warning", "error"],
      default: "info"
    },
    action: {
      type: String,
      required: true
    },
    details: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export const GuildLog =
  models.GuildLog || model<GuildLogDocument>("GuildLog", guildLogSchema);
