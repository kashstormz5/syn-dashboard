type LogListProps = {
  logs: {
    action: string;
    actorName: string;
    source: "dashboard" | "bot";
    level: "info" | "success" | "warning" | "error";
    details: string;
    createdAt: Date;
  }[];
};

function formatTimestamp(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function getBadgeClass(level: LogListProps["logs"][number]["level"]) {
  if (level === "success") {
    return "log-badge success";
  }

  if (level === "warning") {
    return "log-badge warning";
  }

  if (level === "error") {
    return "log-badge error";
  }

  return "log-badge";
}

export function LogList({ logs }: LogListProps) {
  return (
    <section className="card settings-card">
      <p className="section-kicker">Logs</p>
      <div className="panel-heading">
        <div>
          <h2>Recent dashboard activity</h2>
          <p className="helper">
            A combined feed for dashboard updates and bot events, designed to
            read like a proper admin timeline.
          </p>
        </div>
        <span className="card-badge">{logs.length} entries</span>
      </div>

      <div className="log-list">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <article className="log-row" key={`${log.action}-${index}`}>
              <div className={getBadgeClass(log.level)}>
                {log.action.charAt(0)}
              </div>
              <div className="log-copy">
                <strong>{log.action}</strong>
                <p className="helper">{log.details}</p>
              </div>
              <div className="log-meta">
                <span className="log-source">
                  {log.source === "bot" ? "Bot event" : "Dashboard event"}
                </span>
                <span>{log.actorName || "Unknown user"}</span>
                <span>{formatTimestamp(log.createdAt)}</span>
              </div>
            </article>
          ))
        ) : (
          <div className="notice">
            No logs yet. Saving dashboard settings or sending bot log events
            will create entries here.
          </div>
        )}
      </div>
    </section>
  );
}
