import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="shell">
      <div className="container">
        <section className="card settings-card stack">
          <h1 className="page-title">Server not found</h1>
          <p className="muted">
            The selected guild could not be accessed with the current Discord
            session.
          </p>
          <div>
            <Link className="button" href="/dashboard">
              Return to dashboard
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
