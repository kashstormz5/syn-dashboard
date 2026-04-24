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
    <main className="shell">
      <div className="container stack">
        <section className="dashboard-hero card">
          <div className="dashboard-hero-copy">
            <p className="section-kicker">Control center</p>
            <h1 className="page-title">
              {session.user?.name ?? "Discord User"}&apos;s guild workspace
            </h1>
            <p className="helper">
              Pick a server to open its dashboard, manage modules, and inspect
              bot activity from one cleaner admin experience.
            </p>
          </div>

          <div className="dashboard-hero-actions">
            <div className="hero-stat">
              <span className="stat-label">Manageable servers</span>
              <strong>{guilds.length}</strong>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="button-secondary" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </section>

        {guilds.length > 0 ? (
          <section className="server-section">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Servers</p>
                <h2>Choose a server to manage</h2>
              </div>
            </div>

            <div className="grid guild-grid">
              {guilds.map((guild) => (
                <GuildCard key={guild.id} guild={guild} />
              ))}
            </div>
          </section>
        ) : (
          <section className="card settings-card">
            <div className="error">
              {error ??
                "No guilds were returned. Make sure the Discord account has server access and the OAuth app includes the `guilds` scope."}
            </div>
            <div className="inline" style={{ marginTop: 16 }}>
              <Link className="button" href="/">
                Back to login
              </Link>
              <Link className="button-secondary" href="/dashboard">
                Refresh
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
