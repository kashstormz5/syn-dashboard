import { saveGuildSettings } from "@/app/dashboard/[guildId]/actions";
import { DiscordGuild } from "@/lib/discord";

type GuildDashboardFormProps = {
  guild: DiscordGuild;
  initialSettings: {
    guildId: string;
    prefix: string;
    ownerId: string;
    adminRoleId: string;
    logChannelId: string;
    welcomeMessage: string;
  };
};

export function GuildDashboardForm({
  guild,
  initialSettings
}: GuildDashboardFormProps) {
  return (
    <form action={saveGuildSettings} className="form">
      <input name="guildId" type="hidden" value={initialSettings.guildId} />

      <div className="panel-grid">
        <section className="card settings-card info-panel">
          <p className="section-kicker">Server info</p>
          <div className="panel-heading">
            <div>
              <h2>{guild.name}</h2>
              <p className="helper">
                A quick summary of the server and who can manage it from this
                workspace.
              </p>
            </div>
            <span className="card-badge">{guild.owner ? "Owner" : "Manager"}</span>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Server ID</span>
              <strong>{guild.id}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Access</span>
              <strong>{guild.owner ? "Owner" : "Manager"}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Dashboard section</span>
              <strong>Core bot controls</strong>
            </div>
          </div>
        </section>

        <section className="card settings-card">
          <p className="section-kicker">Bot stuff</p>
          <div className="panel-heading">
            <div>
              <h2>Core bot settings</h2>
              <p className="helper">
                Update the values your team is most likely to reach for day to
                day.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <div className="field field-emphasis">
              <label htmlFor="prefix">Command Prefix</label>
              <input
                defaultValue={initialSettings.prefix}
                id="prefix"
                maxLength={5}
                name="prefix"
                placeholder="!"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="ownerId">Owner</label>
              <input
                defaultValue={initialSettings.ownerId}
                id="ownerId"
                name="ownerId"
                placeholder="Discord user ID"
              />
            </div>

            <div className="field">
              <label htmlFor="adminRoleId">Admin Role</label>
              <input
                defaultValue={initialSettings.adminRoleId}
                id="adminRoleId"
                name="adminRoleId"
                placeholder="Discord role ID"
              />
            </div>

            <div className="field">
              <label htmlFor="logChannelId">Log Channel</label>
              <input
                defaultValue={initialSettings.logChannelId}
                id="logChannelId"
                name="logChannelId"
                placeholder="Discord channel ID"
              />
            </div>

            <div className="field field-wide">
              <label htmlFor="welcomeMessage">Welcome Message</label>
              <textarea
                defaultValue={initialSettings.welcomeMessage}
                id="welcomeMessage"
                name="welcomeMessage"
                placeholder="Welcome to the server."
              />
            </div>
          </div>
        </section>
      </div>

      <div className="inline">
        <button className="button" type="submit">
          Save dashboard settings
        </button>
      </div>
    </form>
  );
}
