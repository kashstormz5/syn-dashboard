import Link from "next/link";
import { auth, signIn } from "@/auth";
import { getMissingEnvVars } from "@/lib/env";

export default async function LoginPage() {
  const session = await auth();
  const missingEnvVars = getMissingEnvVars();

  if (session?.user) {
    return (
      <main className="shell">
        <div className="container">
          <section className="marketing-shell">
            <div className="marketing-copy card">
              <span className="pill">Connected</span>
              <h1>Control your Discord bot from a cleaner home base.</h1>
              <p>
                Your workspace is ready. Jump back into your guild dashboard to
                manage modules, view activity, and tune core bot settings.
              </p>
              <div className="inline">
                <Link className="button" href="/dashboard">
                  Open dashboard
                </Link>
              </div>
            </div>

            <aside className="marketing-panel card">
              <div className="preview-window">
                <div className="preview-topbar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="preview-stack">
                  <div className="preview-block accent" />
                  <div className="preview-grid">
                    <div className="preview-block" />
                    <div className="preview-block" />
                  </div>
                  <div className="preview-line long" />
                  <div className="preview-line" />
                  <div className="preview-line short" />
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="shell">
      <div className="container">
        <section className="marketing-shell">
          <div className="marketing-copy card">
            <span className="pill">Syn Dashboard</span>
            <h1>Make your bot feel like it has a real admin panel.</h1>
            <p>
              Sign in with Discord, choose a server, manage modules, and review
              live activity in one clean interface backed by MongoDB Atlas.
            </p>

            <div className="feature-row">
              <div className="feature-chip">Discord OAuth</div>
              <div className="feature-chip">Guild settings</div>
              <div className="feature-chip">Bot logs</div>
            </div>

            {missingEnvVars.length > 0 ? (
              <div className="error">
                Missing environment variables: {missingEnvVars.join(", ")}. Add
                them to `.env.local` before using Discord login.
              </div>
            ) : null}

            <form
              action={async () => {
                "use server";
                await signIn("discord", { redirectTo: "/dashboard" });
              }}
            >
              <button
                className="button"
                disabled={missingEnvVars.length > 0}
                type="submit"
              >
                Continue with Discord
              </button>
            </form>

            <p className="helper">
              Designed for a lightweight MVP today, with room for channels,
              permissions, moderation, and bot analytics next.
            </p>
          </div>

          <aside className="marketing-panel card">
            <div className="signal-card">
              <p className="section-kicker">Workspace preview</p>
              <h2>One place for settings, modules, and logs.</h2>
              <div className="signal-grid">
                <div className="signal-tile">
                  <span>01</span>
                  <strong>Dashboard</strong>
                  <p>Server identity and core bot controls.</p>
                </div>
                <div className="signal-tile">
                  <span>02</span>
                  <strong>Modules</strong>
                  <p>Turn major systems on or off quickly.</p>
                </div>
                <div className="signal-tile">
                  <span>03</span>
                  <strong>Logs</strong>
                  <p>Track bot activity and admin changes.</p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
