import { SECTIONS } from "@/data/sections";

export default function Practice() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tighter text-zinc-50">
        Select a Practice Section
      </h1>
      <p className="mt-2 text-zinc-400 max-w-2xl">
        Each section lives on its own page — map each to a Page Object class in your framework.
      </p>

      <div
        data-testid="sections-grid"
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
      >
        {SECTIONS.map((s) => (
          <Link
            key={s.slug}
            to={`/practice/${s.slug}`}
            data-testid={`practice-card-${s.slug}`}
            className="group relative flex flex-col p-5 bg-zinc-900 border border-zinc-800 rounded-lg transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800/50 hover:-translate-y-0.5"
          >
            <span className="absolute top-4 right-4 font-mono text-xs font-semibold text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
              {String(s.num).padStart(2, "0")}
            </span>
            <h3 className="pr-10 text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
