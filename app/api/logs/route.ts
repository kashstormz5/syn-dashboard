import { NextRequest, NextResponse } from "next/server";
import { createGuildLog } from "@/lib/guild-settings";

type BotLogPayload = {
  guildId?: string;
  actorId?: string;
  actorName?: string;
  action?: string;
  details?: string;
  level?: "info" | "success" | "warning" | "error";
};

function hasValidBotToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const providedToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  return Boolean(
    providedToken &&
      process.env.BOT_LOG_API_TOKEN &&
      providedToken === process.env.BOT_LOG_API_TOKEN
  );
}

export async function POST(request: NextRequest) {
  if (!hasValidBotToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as BotLogPayload;

  if (!body.guildId || !body.action || !body.details) {
    return NextResponse.json(
      { error: "guildId, action, and details are required." },
      { status: 400 }
    );
  }

  await createGuildLog({
    guildId: body.guildId,
    actorId: body.actorId ?? "bot",
    actorName: body.actorName ?? "Syn Bot",
    source: "bot",
    level: body.level ?? "info",
    action: body.action,
    details: body.details
  });

  return NextResponse.json({ ok: true });
}
