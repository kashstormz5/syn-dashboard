import { ModuleToggleForm } from "@/components/module-toggle-form";
import { getGuildSettingsSafe } from "@/lib/guild-settings";

type GuildModulesPageProps = {
  params: Promise<{
    guildId: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function GuildModulesPage({
  params,
  searchParams
}: GuildModulesPageProps) {
  const { guildId } = await params;
  const { saved } = await searchParams;
  const settingsResult = await getGuildSettingsSafe(guildId);

  return (
    <>
      <header className="workspace-header card">
        <div>
          <p className="section-kicker">Modules</p>
          <h1 className="workspace-title">Command controls</h1>
          <p className="helper">
            Choose which systems your bot should run in this guild, without
            digging through config files.
          </p>
        </div>
      </header>

      {saved === "1" ? <div className="notice">Modules updated.</div> : null}

      {settingsResult.error ? (
        <div className="error">{settingsResult.error}</div>
      ) : null}

      <ModuleToggleForm guildId={guildId} modules={settingsResult.settings.modules} />
    </>
  );
}
