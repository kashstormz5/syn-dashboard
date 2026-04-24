import { timingSafeEqual } from "node:crypto";
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

const GUILD_ID_PATTERN = /^\d{17,20}$/;
const MAX_ACTOR_ID_LENGTH = 64;
const MAX_ACTOR_NAME_LENGTH = 80;
const MAX_ACTION_LENGTH = 120;
const MAX_DETAILS_LENGTH = 2000;

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function hasValidBotToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const providedToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const expectedToken = process.env.BOT_LOG_API_TOKEN;

  return Boolean(
    providedToken &&
      expectedToken &&
      safeEqual(providedToken, expectedToken)
  );
}

export async function POST(request: NextRequest) {
  if (!hasValidBotToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: BotLogPayload;

  try {
    body = (await request.json()) as BotLogPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.guildId || !body.action || !body.details) {
    return NextResponse.json(
      { error: "guildId, action, and details are required." },
      { status: 400 }
    );
  }

  const guildId = body.guildId.trim();
  const actorId = (body.actorId ?? "bot").trim().slice(0, MAX_ACTOR_ID_LENGTH);
  const actorName = (body.actorName ?? "Syn Bot")
    .trim()
    .slice(0, MAX_ACTOR_NAME_LENGTH);
  const action = body.action.trim().slice(0, MAX_ACTION_LENGTH);
  const details = body.details.trim().slice(0, MAX_DETAILS_LENGTH);

  if (!GUILD_ID_PATTERN.test(guildId)) {
    return NextResponse.json({ error: "Invalid guildId." }, { status: 400 });
  }

  if (!action || !details) {
    return NextResponse.json(
      { error: "action and details must not be empty." },
      { status: 400 }
    );
  }

  await createGuildLog({
    guildId,
    actorId,
    actorName,
    source: "bot",
    level: body.level ?? "info",
    action,
    details
  });

  return NextResponse.json({ ok: true });
}
