import { redirect } from "next/navigation";
import { auth } from "@/auth";

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

  await params;

  return <>{children}</>;
}
