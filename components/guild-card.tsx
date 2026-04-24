import Link from "next/link";
import { DiscordGuild, getDiscordGuildIconUrl } from "@/lib/discord";

export function GuildCard({ guild }: { guild: DiscordGuild }) {
  const iconUrl = getDiscordGuildIconUrl(guild);

  return (
    <article className="surface flex flex-col gap-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-syn-500/15 text-lg font-bold text-syn-200">
            {iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={guild.name} className="h-full w-full object-cover" src={iconUrl} />
            ) : (
              guild.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{guild.name}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {guild.owner ? "Owner access" : "Manage Server access"}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-syn-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-syn-200">
          {guild.owner ? "Owner" : "Manager"}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm leading-6 text-slate-400">
          Open a clean Syn control panel for modules, server settings, and future
          Mongo-backed controls.
        </p>
        <Link
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-syn-500 px-4 text-sm font-semibold text-white shadow-lg shadow-syn-500/20 transition hover:bg-syn-400"
          href={`/dashboard/${guild.id}`}
        >
          Open workspace
        </Link>
      </div>
    </article>
  );
}
