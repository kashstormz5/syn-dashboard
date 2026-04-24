export default function GuildLoading() {
  return (
    <main className="shell">
      <div className="container">
        <div className="guild-layout">
          <aside className="guild-sidebar card skeleton-panel">
            <div className="skeleton-block skeleton-line short" />
            <div className="skeleton-row">
              <div className="skeleton-avatar large" />
              <div className="skeleton-stack">
                <div className="skeleton-block skeleton-line" />
                <div className="skeleton-block skeleton-line short" />
              </div>
            </div>
            <div className="skeleton-stack">
              <div className="skeleton-block skeleton-nav" />
              <div className="skeleton-block skeleton-nav" />
              <div className="skeleton-block skeleton-nav" />
            </div>
          </aside>

          <section className="guild-content">
            <section className="workspace-header card skeleton-panel">
              <div className="skeleton-stack">
                <div className="skeleton-block skeleton-line short" />
                <div className="skeleton-block skeleton-title" />
              </div>
              <div className="skeleton-block skeleton-chip" />
            </section>

            <section className="card settings-card skeleton-panel">
              <div className="skeleton-grid">
                <div className="skeleton-block skeleton-card" />
                <div className="skeleton-block skeleton-card" />
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
