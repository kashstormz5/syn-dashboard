type TextInputSettingProps = {
  description?: string;
  label: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

export function TextInputSetting({
  description,
  label,
  multiline = false,
  onChange,
  placeholder,
  value
}: TextInputSettingProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="setting-label">{label}</label>
      {description ? <p className="setting-help">{description}</p> : null}
      {multiline ? (
        <textarea
          className="input-base min-h-32 resize-y"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <input
          className="input-base"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          value={value}
        />
      )}
    </div>
  );
}
