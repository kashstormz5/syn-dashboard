export default function DashboardLoading() {
  return (
    <main className="shell">
      <div className="container stack">
        <section className="dashboard-hero card skeleton-panel">
          <div className="skeleton-block skeleton-title" />
          <div className="skeleton-block skeleton-stat" />
        </section>

        <section className="grid guild-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <article className="card guild-card skeleton-panel" key={index}>
              <div className="skeleton-row">
                <div className="skeleton-avatar" />
                <div className="skeleton-stack">
                  <div className="skeleton-block skeleton-line" />
                  <div className="skeleton-block skeleton-line short" />
                </div>
              </div>
              <div className="skeleton-block skeleton-button" />
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
