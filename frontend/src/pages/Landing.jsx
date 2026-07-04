import { Boxes, Code2, ShieldCheck, Container } from "lucide-react";
import { SECTIONS } from "@/data/sections";

const features = [
  { icon: Boxes, title: "30 UI Sections", desc: "Forms, dropdowns, waits, iframe, shadow DOM, drag & drop, tables and more." },
  { icon: Code2, title: "Testable REST API", desc: "CRUD, pagination, status codes, delays & flaky endpoints for RestAssured/pytest." },
  { icon: ShieldCheck, title: "JWT Auth Flow", desc: "Register, login, session & logout to practice auth-flow automation." },
  { icon: Container, title: "DevOps Ready", desc: "Dockerfile, docker-compose & GitHub Actions CI included in the repo." },
];

export default function Landing() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div
          className="absolute inset-0 opacity-[0.15] bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/10653941/pexels-photo-10653941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')" }}
        />
        <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-blue-400 border border-zinc-800 bg-zinc-900/60 rounded px-3 py-1">
              For SDET &amp; DevOps Engineers
            </span>
            <h1 className="mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-50 max-w-3xl leading-[1.05]">
              A 3-tier playground to practice{" "}
              <span className="text-blue-400">automation testing</span> &amp; deployment.
            </h1>
            <p className="mt-6 text-lg text-zinc-400 max-w-2xl">
              Selenium, Playwright, Cypress and RestAssured — all against one real full-stack app.
              Stable <code className="font-mono text-blue-400 bg-zinc-900/60 px-1.5 py-0.5 rounded border border-zinc-800">data-testid</code> hooks, a documented API, and CI/CD artifacts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/practice"
                data-testid="hero-start-practicing"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Start Practicing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/rest-playground"
                data-testid="hero-view-api"
                className="inline-flex items-center gap-2 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors"
              >
                View API Docs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} data-testid={`feature-${f.title.replace(/\s+/g, "-").toLowerCase()}`} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <f.icon className="w-6 h-6 text-blue-400" />
              <h3 className="mt-4 font-heading font-bold text-zinc-100">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-mono text-sm text-zinc-500">
          {SECTIONS.length} practice sections ready &middot; each mapped to its own page &amp; Page Object
        </p>
      </section>
    </div>
  );
}
