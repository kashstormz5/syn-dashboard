import Link from "next/link";
import { DiscordGuild, getDiscordGuildIconUrl } from "@/lib/discord";

export function GuildCard({ guild }: { guild: DiscordGuild }) {
  const iconUrl = getDiscordGuildIconUrl(guild);

  return (
    <article className="card guild-card">
      <div className="guild-card-top">
        <div className="guild-meta">
          <div className="guild-avatar">
            {iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={guild.name} src={iconUrl} />
            ) : (
              guild.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3>{guild.name}</h3>
            <p className="muted">
              {guild.owner ? "Owner access" : "Manage Server access"}
            </p>
          </div>
        </div>

        <span className="card-badge">
          {guild.owner ? "Owner" : "Manager"}
        </span>
      </div>

      <div className="guild-card-footer">
        <p className="helper">
          Open the server workspace to edit bot settings, modules, and logs.
        </p>
        <Link className="button" href={`/dashboard/${guild.id}`}>
          Open workspace
        </Link>
      </div>
    </article>
  );
}
