type SettingCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SettingCard({
  title,
  description,
  children
}: SettingCardProps) {
  return (
    <section className="surface flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
        {description ? <p className="setting-help">{description}</p> : null}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}
