import { redirect } from "next/navigation";

type GuildModulesPageProps = {
  params: Promise<{
    guildId: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function GuildModulesPage({
  params
}: GuildModulesPageProps) {
  const { guildId } = await params;
  redirect(`/dashboard/${guildId}`);
}
