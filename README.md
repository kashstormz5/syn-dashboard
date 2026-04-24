# Syn Discord Dashboard

Minimal Next.js MVP for a Discord bot dashboard.

## Features

- Discord OAuth login with `next-auth`
- Dashboard page that lists manageable Discord guilds
- Guild settings page with MongoDB Atlas persistence via Mongoose
- Clean App Router structure focused on a small MVP

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `AUTH_SECRET`
- `AUTH_DISCORD_ID`
- `AUTH_DISCORD_SECRET`
- `MONGODB_URI`
- `BOT_LOG_API_TOKEN`

## Discord OAuth setup

Use a Discord application with a redirect URI like:

`http://localhost:3000/api/auth/callback/discord`

Make sure the app can request:

- `identify`
- `guilds`

## Run locally

```bash
npm install
npm run dev
```

## Bot log ingestion

If your bot lives in another project, it can send log events to this dashboard.

Route:

`POST /api/logs`

Header:

`Authorization: Bearer YOUR_BOT_LOG_API_TOKEN`

JSON body:

```json
{
  "guildId": "123456789012345678",
  "actorId": "bot",
  "actorName": "Syn Bot",
  "action": "Member warned",
  "details": "Warned user for spam links.",
  "level": "warning"
}
```
