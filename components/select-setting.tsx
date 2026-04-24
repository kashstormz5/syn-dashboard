type SelectSettingProps = {
  description?: string;
  label: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  value: string;
};

export function SelectSetting({
  description,
  label,
  onChange,
  options,
  value
}: SelectSettingProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="setting-label">{label}</label>
      {description ? <p className="setting-help">{description}</p> : null}
      <select
        className="input-base"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option className="bg-panel-900 text-slate-100" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
