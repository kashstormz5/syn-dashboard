import { saveGuildModules } from "@/app/dashboard/[guildId]/actions";
import { GuildModules } from "@/models/guild-settings";

const moduleLabels: { key: keyof GuildModules; title: string; description: string }[] = [
  {
    key: "autoMod",
    title: "Auto stuff",
    description: "Automatic moderation checks and safety actions."
  },
  {
    key: "autoRole",
    title: "Auto role",
    description: "Assign a role to new members."
  },
  {
    key: "welcomeMessages",
    title: "Welcome messages",
    description: "Send join messages using your welcome text."
  },
  {
    key: "moderationLogs",
    title: "Logs",
    description: "Track moderation actions and dashboard changes."
  },
  {
    key: "inviteTracking",
    title: "Invite tracking",
    description: "Watch invite usage and growth sources."
  },
  {
    key: "suggestions",
    title: "Suggestions",
    description: "Collect and manage suggestion-style commands."
  }
];

export function ModuleToggleForm({
  guildId,
  modules
}: {
  guildId: string;
  modules: GuildModules;
}) {
  return (
    <form action={saveGuildModules} className="form">
      <input name="guildId" type="hidden" value={guildId} />

      <section className="card settings-card">
        <p className="section-kicker">Modules</p>
        <div className="panel-heading">
          <div>
            <h2>Turn commands and systems on or off</h2>
            <p className="helper">
              Each module is stored in MongoDB so the workspace always reflects
              the current setup.
            </p>
          </div>
        </div>

        <div className="module-list">
          {moduleLabels.map((moduleItem) => (
            <label className="module-row" htmlFor={moduleItem.key} key={moduleItem.key}>
              <div>
                <strong>{moduleItem.title}</strong>
                <p className="helper">{moduleItem.description}</p>
              </div>
              <span className="toggle-wrap">
                <span className={modules[moduleItem.key] ? "toggle-pill on" : "toggle-pill"}>
                  {modules[moduleItem.key] ? "Enabled" : "Disabled"}
                </span>
                <input
                  defaultChecked={modules[moduleItem.key]}
                  id={moduleItem.key}
                  name={moduleItem.key}
                  type="checkbox"
                />
              </span>
            </label>
          ))}
        </div>
      </section>

      <div className="inline">
        <button className="button" type="submit">
          Save modules
        </button>
      </div>
    </form>
  );
}
