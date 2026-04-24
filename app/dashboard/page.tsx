import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { getUserGuildsSafe } from "@/lib/discord";
import { GuildCard } from "@/components/guild-card";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.accessToken) {
    redirect("/");
  }

  const { guilds, error } = await getUserGuildsSafe(session.accessToken);

  return (
    <main className="min-h-screen px-4 py-6 lg:px-8 lg:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="surface flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Syn workspace
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              Choose a server to manage
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-400 lg:text-base">
              Open a polished control panel for moderation, welcome messages,
              logging, auto roles, and server-wide Syn settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="surface-muted px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Servers
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">{guilds.length}</p>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
                type="submit"
              >
                Sign out
              </button>
            </form>
          </div>
        </section>

        {guilds.length > 0 ? (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guilds.map((guild) => (
              <GuildCard key={guild.id} guild={guild} />
            ))}
          </section>
        ) : (
          <section className="surface p-6">
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
              {error ??
                "No guilds were returned. Make sure the Discord account has server access and the OAuth app includes the `guilds` scope."}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-syn-500 px-4 text-sm font-semibold text-white"
                href="/"
              >
                Back to login
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-slate-200"
                href="/dashboard"
              >
                Refresh
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
