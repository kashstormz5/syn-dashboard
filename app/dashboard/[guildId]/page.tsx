import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SynControlPanel } from "@/components/syn-control-panel";
import { createFallbackGuild, getRequiredGuild } from "@/lib/discord";
import { getGuildSettingsSafe } from "@/lib/guild-settings";

type GuildDashboardPageProps = {
  params: Promise<{
    guildId: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function GuildDashboardPage({
  params,
  searchParams
}: GuildDashboardPageProps) {
  const session = await auth();
  if (!session?.accessToken) {
    redirect("/");
  }
  const { guildId } = await params;
  await searchParams;
  const [guild, settingsResult] = await Promise.all([
    getRequiredGuild(session.accessToken, guildId),
    getGuildSettingsSafe(guildId)
  ]);
  const resolvedGuild = guild ?? createFallbackGuild(guildId);

  return (
    <>
      <SynControlPanel guild={resolvedGuild} initialSettings={settingsResult.settings} />
    </>
  );
}
