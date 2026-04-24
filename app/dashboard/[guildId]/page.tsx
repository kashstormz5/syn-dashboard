import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { GuildDashboardForm } from "@/components/guild-dashboard-form";
import { getRequiredGuild } from "@/lib/discord";
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
  const { saved } = await searchParams;
  const [guild, settingsResult] = await Promise.all([
    getRequiredGuild(session.accessToken, guildId),
    getGuildSettingsSafe(guildId)
  ]);

  if (!guild) {
    notFound();
  }

  return (
    <>
      <header className="workspace-header card">
        <div>
          <p className="section-kicker">Dashboard</p>
          <h1 className="workspace-title">Server overview</h1>
          <p className="helper">
            Review the server profile and keep the most important bot settings
            easy to reach.
          </p>
        </div>
        <div className="header-chip">
          Signed in as {session.user?.name ?? "Discord User"}
        </div>
      </header>

      {saved === "dashboard" ? (
        <div className="notice">Dashboard settings saved.</div>
      ) : null}

      {settingsResult.error ? (
        <div className="error">{settingsResult.error}</div>
      ) : null}

      <GuildDashboardForm guild={guild} initialSettings={settingsResult.settings} />
    </>
  );
}
