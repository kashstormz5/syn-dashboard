export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-panel-950 px-4 py-6 lg:px-8 lg:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="surface animate-pulse p-8">
          <div className="h-6 w-32 rounded-full bg-white/10" />
          <div className="mt-4 h-14 w-80 rounded-3xl bg-white/10" />
        </section>
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article className="surface h-56 animate-pulse bg-white/[0.04]" key={index} />
          ))}
        </section>
      </div>
    </main>
  );
}
