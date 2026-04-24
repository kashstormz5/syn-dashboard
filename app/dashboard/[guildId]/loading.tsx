export default function GuildLoading() {
  return (
    <main className="min-h-screen bg-panel-950 px-4 py-4 lg:ml-72 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <section className="surface animate-pulse p-6">
          <div className="h-6 w-40 rounded-full bg-white/10" />
          <div className="mt-4 h-12 w-72 rounded-2xl bg-white/10" />
        </section>
        <section className="grid gap-6 xl:grid-cols-2">
          <div className="surface h-80 animate-pulse bg-white/[0.04]" />
          <div className="surface h-80 animate-pulse bg-white/[0.04]" />
        </section>
      </div>
    </main>
  );
}
