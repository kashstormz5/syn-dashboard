import Link from "next/link";
import { auth, signIn } from "@/auth";
import { getMissingEnvVars } from "@/lib/env";

export default async function LoginPage() {
  const session = await auth();
  const missingEnvVars = getMissingEnvVars();

  if (session?.user) {
    return (
      <main className="min-h-screen px-4 py-6 lg:px-8 lg:py-10">
        <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <section className="surface flex flex-col justify-center gap-8 p-8 lg:p-12">
            <span className="inline-flex w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
              Connected
            </span>
            <div className="max-w-2xl">
              <h1 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
                Syn is ready for your next server.
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">
                Jump straight into your bot control panel and keep settings,
                automations, and logging in one polished workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-syn-500 px-5 text-sm font-semibold text-white shadow-lg shadow-syn-500/20 transition hover:bg-syn-400"
                href="/dashboard"
              >
                Open dashboard
              </Link>
            </div>
          </section>

          <aside className="surface flex flex-col justify-between gap-6 p-8 lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Syn control
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                Modern Discord bot control panel.
              </h2>
            </div>
            <div className="grid gap-4">
              {["Overview", "Moderation", "Welcome Messages", "Logging"].map((item) => (
                <div
                  className="surface-muted flex items-center justify-between p-4"
                  key={item}
                >
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                  <span className="rounded-full bg-syn-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-syn-200">
                    ready
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 lg:px-8 lg:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <section className="surface flex flex-col justify-center gap-8 p-8 lg:p-12">
          <span className="inline-flex w-fit rounded-full bg-syn-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-syn-200">
            Syn Dashboard
          </span>
          <div className="max-w-2xl">
            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Modern bot control for every Discord server.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-400 md:text-lg">
              Sign in with Discord and open a clean control panel for moderation,
              welcomes, logging, roles, and server settings.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              Discord OAuth
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              Tailwind UI
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              Mongo-ready
            </span>
          </div>

          {missingEnvVars.length > 0 ? (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
              Missing environment variables: {missingEnvVars.join(", ")}.
            </div>
          ) : null}

          <form
            action={async () => {
              "use server";
              await signIn("discord", { redirectTo: "/dashboard" });
            }}
          >
            <button
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-syn-500 px-5 text-sm font-semibold text-white shadow-lg shadow-syn-500/20 transition hover:bg-syn-400 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={missingEnvVars.length > 0}
              type="submit"
            >
              Continue with Discord
            </button>
          </form>
        </section>

        <aside className="surface flex flex-col gap-6 p-8 lg:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Modules
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              A dashboard that feels like a real bot product.
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              "Overview",
              "Moderation",
              "Welcome Messages",
              "Logging",
              "Auto Roles",
              "Server Settings"
            ].map((item, index) => (
              <div className="surface-muted flex items-center justify-between p-4" key={item}>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    0{index + 1}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-200">{item}</p>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-syn-500/10" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
