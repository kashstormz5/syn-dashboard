"use client";

const modules = [
  "Overview",
  "Moderation",
  "Welcome Messages",
  "Logging",
  "Auto Roles",
  "Server Settings"
] as const;

export type SidebarModule = (typeof modules)[number];

type SidebarProps = {
  activeModule: SidebarModule;
  guildName: string;
  onSelect: (module: SidebarModule) => void;
};

export function Sidebar({
  activeModule,
  guildName,
  onSelect
}: SidebarProps) {
  return (
    <>
      <aside className="surface fixed left-0 top-0 hidden h-screen w-72 flex-col justify-between border-r border-white/10 bg-panel-950/90 p-6 lg:flex">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-syn-500/15 text-lg font-bold text-syn-200">
              S
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Syn Control
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                {guildName}
              </h1>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {modules.map((module, index) => {
              const isActive = activeModule === module;

              return (
                <button
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-syn-500 text-white shadow-lg shadow-syn-500/20"
                      : "bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]"
                  }`}
                  key={module}
                  onClick={() => onSelect(module)}
                  type="button"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-inherit/80">
                    0{index + 1}
                  </span>
                  <span>{module}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="surface-muted flex flex-col gap-3 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Syn Bot
          </p>
          <p className="text-sm leading-6 text-slate-400">
            Clean MVP layout for module controls. Wire each control to MongoDB when
            you are ready.
          </p>
        </div>
      </aside>

      <div className="surface-muted flex gap-2 overflow-x-auto p-2 lg:hidden">
        {modules.map((module) => {
          const isActive = activeModule === module;

          return (
            <button
              className={`whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-syn-500 text-white"
                  : "bg-white/[0.04] text-slate-300"
              }`}
              key={module}
              onClick={() => onSelect(module)}
              type="button"
            >
              {module}
            </button>
          );
        })}
      </div>
    </>
  );
}
