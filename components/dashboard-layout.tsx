import { Sidebar, SidebarModule } from "@/components/sidebar";

type DashboardLayoutProps = {
  activeModule: SidebarModule;
  children: React.ReactNode;
  guildName: string;
  onModuleChange: (module: SidebarModule) => void;
};

export function DashboardLayout({
  activeModule,
  children,
  guildName,
  onModuleChange
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-panel-950">
      <Sidebar
        activeModule={activeModule}
        guildName={guildName}
        onSelect={onModuleChange}
      />
      <div className="px-4 py-4 lg:ml-72 lg:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
