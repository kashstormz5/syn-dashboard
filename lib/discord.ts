import { cache } from "react";

export type DiscordGuild = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
};

const DISCORD_API_BASE = "https://discord.com/api/v10";
const MANAGE_GUILD_PERMISSION = BigInt(0x20);

export const getUserGuilds = cache(async (accessToken: string) => {
  const response = await fetch(`${DISCORD_API_BASE}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch guilds from Discord.");
  }

  const guilds = (await response.json()) as DiscordGuild[];

  return guilds.filter(
    (guild) =>
      guild.owner || (BigInt(guild.permissions ?? "0") & MANAGE_GUILD_PERMISSION) === MANAGE_GUILD_PERMISSION
  );
});

export function getGuildById(guilds: DiscordGuild[], guildId: string) {
  return guilds.find((guild) => guild.id === guildId);
}

export const getRequiredGuild = cache(
  async (accessToken: string, guildId: string) => {
    const guilds = await getUserGuilds(accessToken);
    return getGuildById(guilds, guildId) ?? null;
  }
);

export function getDiscordGuildIconUrl(guild: DiscordGuild) {
  if (!guild.icon) {
    return null;
  }

  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
}
