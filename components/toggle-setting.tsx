type ToggleSettingProps = {
  checked: boolean;
  description?: string;
  label: string;
  onChange: (checked: boolean) => void;
};

export function ToggleSetting({
  checked,
  description,
  label,
  onChange
}: ToggleSettingProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-1">
        <label className="setting-label">{label}</label>
        {description ? <p className="setting-help">{description}</p> : null}
      </div>
      <button
        aria-pressed={checked}
        className={`relative inline-flex h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-syn-500" : "bg-white/10"
        }`}
        onClick={() => onChange(!checked)}
        type="button"
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
