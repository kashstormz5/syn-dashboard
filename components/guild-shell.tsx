"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiscordGuild, getDiscordGuildIconUrl } from "@/lib/discord";

const navItems = [
  { href: "", label: "Dashboard", index: "01" },
  { href: "/modules", label: "Modules", index: "02" },
  { href: "/logs", label: "Logs", index: "03" }
];

type GuildShellProps = {
  guild: DiscordGuild;
  children: React.ReactNode;
};

export function GuildShell({ guild, children }: GuildShellProps) {
  const iconUrl = getDiscordGuildIconUrl(guild);
  const pathname = usePathname();

  return (
    <div className="guild-layout">
      <aside className="guild-sidebar card">
        <div className="sidebar-top">
          <Link className="sidebar-back" href="/dashboard">
            All servers
          </Link>
          <span className="sidebar-caption">Server workspace</span>
        </div>
        <div className="sidebar-guild">
          <div className="guild-avatar guild-avatar-large">
            {iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={guild.name} src={iconUrl} />
            ) : (
              guild.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h2>{guild.name}</h2>
            <p className="helper">
              {guild.owner ? "Owner access" : "Manage Server access"}
            </p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const href = `/dashboard/${guild.id}${item.href}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.label}
                className={isActive ? "sidebar-link active" : "sidebar-link"}
                href={href}
              >
                <span className="sidebar-index">{item.index}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-foot card">
          <p className="section-kicker">Live setup</p>
          <strong>MongoDB-backed</strong>
          <p className="helper">
            Settings and activity stay synced across dashboard changes and bot
            log events.
          </p>
        </div>
      </aside>

      <section className="guild-content">{children}</section>
    </div>
  );
}
