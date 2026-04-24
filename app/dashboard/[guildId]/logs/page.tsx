import { LogList } from "@/components/log-list";
import { getGuildLogsSafe } from "@/lib/guild-settings";

type GuildLogsPageProps = {
  params: Promise<{
    guildId: string;
  }>;
};

export default async function GuildLogsPage({ params }: GuildLogsPageProps) {
  const { guildId } = await params;
  const logsResult = await getGuildLogsSafe(guildId);

  return (
    <>
      <header className="workspace-header card">
        <div>
          <p className="section-kicker">Logs</p>
          <h1 className="workspace-title">Recent activity</h1>
          <p className="helper">
            Follow both dashboard changes and bot events in a single running
            history for this server.
          </p>
        </div>
      </header>

      {logsResult.error ? <div className="error">{logsResult.error}</div> : null}

      <LogList logs={logsResult.logs} />
    </>
  );
}
