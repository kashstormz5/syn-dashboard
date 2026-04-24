import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { GuildShell } from "@/components/guild-shell";
import { createFallbackGuild, getRequiredGuild } from "@/lib/discord";

type GuildLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    guildId: string;
  }>;
};

export default async function GuildLayout({
  children,
  params
}: GuildLayoutProps) {
  const session = await auth();

  if (!session?.accessToken) {
    redirect("/");
  }

  const { guildId } = await params;
  const guild = (await getRequiredGuild(session.accessToken, guildId)) ?? createFallbackGuild(guildId);

  return (
    <main className="shell">
      <div className="container">
        <GuildShell guild={guild}>
          {children}
        </GuildShell>
      </div>
    </main>
  );
}
