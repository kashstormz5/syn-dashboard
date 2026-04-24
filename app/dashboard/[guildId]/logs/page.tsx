import { redirect } from "next/navigation";

type GuildLogsPageProps = {
  params: Promise<{
    guildId: string;
  }>;
};

export default async function GuildLogsPage({ params }: GuildLogsPageProps) {
  const { guildId } = await params;
  redirect(`/dashboard/${guildId}`);
}
