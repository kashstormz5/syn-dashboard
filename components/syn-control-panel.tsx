"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { SelectSetting } from "@/components/select-setting";
import { SettingCard } from "@/components/setting-card";
import { SidebarModule } from "@/components/sidebar";
import { TextInputSetting } from "@/components/text-input-setting";
import { ToggleSetting } from "@/components/toggle-setting";
import { DiscordGuild, getDiscordGuildIconUrl } from "@/lib/discord";

type SynControlPanelProps = {
  guild: DiscordGuild;
  initialSettings: {
    adminRoleId: string;
    guildId: string;
    logChannelId: string;
    ownerId: string;
    prefix: string;
    welcomeMessage: string;
  };
};

type PanelState = {
  antiSpam: boolean;
  auditLogs: boolean;
  autoDeleteInvites: boolean;
  autoRoleDelay: string;
  autoRoleEnabled: boolean;
  autoRoleId: string;
  colorAccent: string;
  language: string;
  logChannelId: string;
  loggingEnabled: boolean;
  loggingMode: string;
  modAction: string;
  modAlertChannel: string;
  ownerId: string;
  prefix: string;
  serverLocale: string;
  welcomeChannel: string;
  welcomeEnabled: boolean;
  welcomeMessage: string;
  adminRoleId: string;
};

function ModuleHeader({
  badge,
  description,
  title
}: {
  badge: string;
  description: string;
  title: string;
}) {
  return (
    <header className="surface flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3">
        <span className="inline-flex w-fit rounded-full bg-syn-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-syn-200">
          {badge}
        </span>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-syn-500 px-5 text-sm font-semibold text-white shadow-lg shadow-syn-500/20 transition hover:bg-syn-400"
        type="button"
      >
        Save changes
      </button>
    </header>
  );
}

export function SynControlPanel({
  guild,
  initialSettings
}: SynControlPanelProps) {
  const [activeModule, setActiveModule] = useState<SidebarModule>("Overview");
  const [state, setState] = useState<PanelState>({
    adminRoleId: initialSettings.adminRoleId,
    antiSpam: true,
    auditLogs: true,
    autoDeleteInvites: false,
    autoRoleDelay: "instant",
    autoRoleEnabled: true,
    autoRoleId: initialSettings.adminRoleId,
    colorAccent: "#5B7CFF",
    language: "en",
    logChannelId: initialSettings.logChannelId,
    loggingEnabled: true,
    loggingMode: "important",
    modAction: "timeout",
    modAlertChannel: initialSettings.logChannelId,
    ownerId: initialSettings.ownerId,
    prefix: initialSettings.prefix,
    serverLocale: "europe-london",
    welcomeChannel: initialSettings.logChannelId,
    welcomeEnabled: true,
    welcomeMessage: initialSettings.welcomeMessage
  });

  const iconUrl = getDiscordGuildIconUrl(guild);

  const setValue = <K extends keyof PanelState>(key: K, value: PanelState[K]) => {
    setState((current) => ({
      ...current,
      [key]: value
    }));
  };

  return (
    <DashboardLayout
      activeModule={activeModule}
      guildName={guild.name}
      onModuleChange={setActiveModule}
    >
      <div className="surface flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-syn-500/15 text-xl font-bold text-syn-200">
            {iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={guild.name} className="h-full w-full object-cover" src={iconUrl} />
            ) : (
              guild.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Syn Dashboard</p>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              {guild.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Modern Discord-style control panel MVP
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="surface-muted p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Prefix</p>
            <p className="mt-2 text-lg font-semibold text-white">{state.prefix}</p>
          </div>
          <div className="surface-muted p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Logging</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {state.loggingEnabled ? "Enabled" : "Off"}
            </p>
          </div>
          <div className="surface-muted p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Auto Roles</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {state.autoRoleEnabled ? "Ready" : "Off"}
            </p>
          </div>
          <div className="surface-muted p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Access</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {guild.owner ? "Owner" : "Manager"}
            </p>
          </div>
        </div>
      </div>

      {activeModule === "Overview" ? (
        <>
          <ModuleHeader
            badge="Overview"
            description="A clean home for the most important Syn bot settings in this server."
            title="Bot overview"
          />
          <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            <SettingCard
              description="These are the core values you will probably want to sync to MongoDB first."
              title="Core bot settings"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextInputSetting
                  label="Command Prefix"
                  onChange={(value) => setValue("prefix", value)}
                  placeholder="!"
                  value={state.prefix}
                />
                <TextInputSetting
                  label="Owner ID"
                  onChange={(value) => setValue("ownerId", value)}
                  placeholder="Discord owner ID"
                  value={state.ownerId}
                />
                <TextInputSetting
                  label="Admin Role ID"
                  onChange={(value) => setValue("adminRoleId", value)}
                  placeholder="Discord role ID"
                  value={state.adminRoleId}
                />
                <TextInputSetting
                  label="Log Channel ID"
                  onChange={(value) => setValue("logChannelId", value)}
                  placeholder="Discord channel ID"
                  value={state.logChannelId}
                />
              </div>
              <TextInputSetting
                description="Use this as the default welcome content for the bot."
                label="Default Welcome Message"
                multiline
                onChange={(value) => setValue("welcomeMessage", value)}
                placeholder="Welcome to the server."
                value={state.welcomeMessage}
              />
            </SettingCard>

            <SettingCard
              description="Quick-glance information for the selected guild."
              title="Server snapshot"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="surface-muted p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Server ID</p>
                  <p className="mt-3 break-all text-sm font-medium text-slate-200">
                    {guild.id}
                  </p>
                </div>
                <div className="surface-muted p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Bot State</p>
                  <p className="mt-3 text-sm font-medium text-emerald-300">Connected</p>
                </div>
                <div className="surface-muted p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Theme</p>
                  <p className="mt-3 text-sm font-medium text-slate-200">Syn Dark</p>
                </div>
                <div className="surface-muted p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Panel</p>
                  <p className="mt-3 text-sm font-medium text-slate-200">
                    MVP layout ready
                  </p>
                </div>
              </div>
            </SettingCard>
          </div>
        </>
      ) : null}

      {activeModule === "Moderation" ? (
        <>
          <ModuleHeader
            badge="Moderation"
            description="Centralize the core moderation behavior for Syn in one place."
            title="Moderation controls"
          />
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingCard
              description="Main moderation systems and defaults."
              title="Automation"
            >
              <ToggleSetting
                checked={state.antiSpam}
                description="Watch repeated messages and bursts automatically."
                label="Anti-spam protection"
                onChange={(value) => setValue("antiSpam", value)}
              />
              <ToggleSetting
                checked={state.autoDeleteInvites}
                description="Remove invite links from non-admin members."
                label="Auto-delete invites"
                onChange={(value) => setValue("autoDeleteInvites", value)}
              />
              <SelectSetting
                description="Choose the default moderation action for flagged behavior."
                label="Default action"
                onChange={(value) => setValue("modAction", value)}
                options={[
                  { label: "Timeout", value: "timeout" },
                  { label: "Warn", value: "warn" },
                  { label: "Kick", value: "kick" }
                ]}
                value={state.modAction}
              />
            </SettingCard>

            <SettingCard
              description="Alerts and notifications for moderators."
              title="Moderator alerts"
            >
              <TextInputSetting
                description="Where Syn should post moderation alerts."
                label="Alert Channel"
                onChange={(value) => setValue("modAlertChannel", value)}
                placeholder="Channel ID"
                value={state.modAlertChannel}
              />
              <ToggleSetting
                checked={state.auditLogs}
                description="Write moderation actions to the logging feed."
                label="Mirror to audit logs"
                onChange={(value) => setValue("auditLogs", value)}
              />
            </SettingCard>
          </div>
        </>
      ) : null}

      {activeModule === "Welcome Messages" ? (
        <>
          <ModuleHeader
            badge="Welcome"
            description="Set the first impression for new members with a clean welcome workflow."
            title="Welcome messages"
          />
          <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
            <SettingCard
              description="Basic welcome automation settings."
              title="Delivery"
            >
              <ToggleSetting
                checked={state.welcomeEnabled}
                description="Enable welcome messages for new joins."
                label="Welcome messages enabled"
                onChange={(value) => setValue("welcomeEnabled", value)}
              />
              <TextInputSetting
                description="Channel where welcome messages should appear."
                label="Welcome Channel ID"
                onChange={(value) => setValue("welcomeChannel", value)}
                placeholder="Channel ID"
                value={state.welcomeChannel}
              />
            </SettingCard>

            <SettingCard
              description="Draft the content you want new members to see."
              title="Welcome content"
            >
              <TextInputSetting
                label="Welcome Message"
                multiline
                onChange={(value) => setValue("welcomeMessage", value)}
                placeholder="Welcome to Syn."
                value={state.welcomeMessage}
              />
            </SettingCard>
          </div>
        </>
      ) : null}

      {activeModule === "Logging" ? (
        <>
          <ModuleHeader
            badge="Logging"
            description="Choose what Syn records and where the activity feed should be sent."
            title="Logging configuration"
          />
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingCard
              description="Main logging switches."
              title="Log routing"
            >
              <ToggleSetting
                checked={state.loggingEnabled}
                description="Enable Syn event logging across this guild."
                label="Logging enabled"
                onChange={(value) => setValue("loggingEnabled", value)}
              />
              <TextInputSetting
                description="Channel where logs should be sent."
                label="Log Channel ID"
                onChange={(value) => setValue("logChannelId", value)}
                placeholder="Channel ID"
                value={state.logChannelId}
              />
            </SettingCard>

            <SettingCard
              description="Control how much event noise Syn should keep."
              title="Event detail"
            >
              <SelectSetting
                description="Choose how detailed the log stream should be."
                label="Logging mode"
                onChange={(value) => setValue("loggingMode", value)}
                options={[
                  { label: "Important only", value: "important" },
                  { label: "Moderation + system", value: "balanced" },
                  { label: "Verbose feed", value: "verbose" }
                ]}
                value={state.loggingMode}
              />
              <ToggleSetting
                checked={state.auditLogs}
                description="Mirror dashboard saves into the logging feed."
                label="Include dashboard changes"
                onChange={(value) => setValue("auditLogs", value)}
              />
            </SettingCard>
          </div>
        </>
      ) : null}

      {activeModule === "Auto Roles" ? (
        <>
          <ModuleHeader
            badge="Auto Roles"
            description="Assign starter roles automatically when members join your server."
            title="Auto role setup"
          />
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingCard
              description="Basic auto role behavior."
              title="Role assignment"
            >
              <ToggleSetting
                checked={state.autoRoleEnabled}
                description="Turn automatic role assignment on or off."
                label="Auto roles enabled"
                onChange={(value) => setValue("autoRoleEnabled", value)}
              />
              <TextInputSetting
                description="The role ID Syn should assign to new members."
                label="Role ID"
                onChange={(value) => setValue("autoRoleId", value)}
                placeholder="Discord role ID"
                value={state.autoRoleId}
              />
              <SelectSetting
                description="Delay the role assignment if needed."
                label="Assignment timing"
                onChange={(value) => setValue("autoRoleDelay", value)}
                options={[
                  { label: "Instant", value: "instant" },
                  { label: "After 1 minute", value: "1m" },
                  { label: "After 10 minutes", value: "10m" }
                ]}
                value={state.autoRoleDelay}
              />
            </SettingCard>
          </div>
        </>
      ) : null}

      {activeModule === "Server Settings" ? (
        <>
          <ModuleHeader
            badge="Server Settings"
            description="Small server-wide preferences that shape how Syn feels in this guild."
            title="Server settings"
          />
          <div className="grid gap-6 xl:grid-cols-2">
            <SettingCard
              description="Regional and language preferences."
              title="Locale"
            >
              <SelectSetting
                label="Language"
                onChange={(value) => setValue("language", value)}
                options={[
                  { label: "English", value: "en" },
                  { label: "Spanish", value: "es" },
                  { label: "French", value: "fr" }
                ]}
                value={state.language}
              />
              <SelectSetting
                label="Timezone"
                onChange={(value) => setValue("serverLocale", value)}
                options={[
                  { label: "Europe / London", value: "europe-london" },
                  { label: "America / New York", value: "america-new-york" },
                  { label: "Europe / Dublin", value: "europe-dublin" }
                ]}
                value={state.serverLocale}
              />
            </SettingCard>

            <SettingCard
              description="Simple visual and identity defaults."
              title="Branding"
            >
              <TextInputSetting
                description="Accent color used by future embed-style UI."
                label="Accent Color"
                onChange={(value) => setValue("colorAccent", value)}
                placeholder="#5B7CFF"
                value={state.colorAccent}
              />
            </SettingCard>
          </div>
        </>
      ) : null}
    </DashboardLayout>
  );
}
