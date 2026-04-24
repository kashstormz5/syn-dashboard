# Syn Discord Dashboard

Minimal Next.js MVP for a Discord bot dashboard.

The primary app in this repository is the project root.
The [syn-dashboard](/C:/Users/Marshall/OneDrive/Documents/Syn%20Software%20Admin/Syn%20Dashboard/syn-dashboard) folder is a separate experimental app and is not the main dashboard.

## Repo safety

- The root project is the deploy target for GitHub and Vercel.
- `.env.local` is ignored and should never be committed.
- `syn-dashboard/` is intentionally ignored by Vercel via `.vercelignore` so the nested app does not become the accidental deploy target.
- GitHub Actions now runs lint and build checks on pushes and pull requests.
- Dependabot is configured to watch root npm dependencies.

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

## Deployment notes

Use the repository root as the project root in your deployment platform.

If any Discord, MongoDB, or bot API secrets were ever pushed to GitHub in the past, rotate them before production use even if the files are ignored now.

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
