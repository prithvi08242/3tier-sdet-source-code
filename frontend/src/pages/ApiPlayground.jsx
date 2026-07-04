import { useState } from "react";
import { api, API } from "@/lib/api";

const ENDPOINTS = [
  { method: "GET", path: "/playground/health", auth: false, desc: "Health check", run: () => api.get("/playground/health") },
  { method: "GET", path: "/playground/todos?page=1&limit=10", auth: false, desc: "List todos (paginated, filterable)", run: () => api.get("/playground/todos?page=1&limit=10") },
  { method: "POST", path: "/playground/todos", auth: true, desc: "Create todo (requires auth)", run: () => api.post("/playground/todos", { title: "From API Playground", priority: "high" }) },
  { method: "GET", path: "/playground/users", auth: false, desc: "Static users for filtering", run: () => api.get("/playground/users") },
  { method: "GET", path: "/playground/status/418", auth: false, desc: "Echo any HTTP status code", run: () => api.get("/playground/status/418") },
  { method: "GET", path: "/playground/delay/2", auth: false, desc: "Delayed response (seconds)", run: () => api.get("/playground/delay/2") },
  { method: "GET", path: "/playground/flaky", auth: false, desc: "~50/50 success / 500", run: () => api.get("/playground/flaky") },
  { method: "POST", path: "/playground/echo", auth: false, desc: "Echo posted JSON body", run: () => api.post("/playground/echo", { hello: "world", n: 42 }) },
];

const methodColor = { GET: "text-emerald-400", POST: "text-blue-400", PUT: "text-amber-400", DELETE: "text-red-400" };

export default function ApiPlayground() {
  const [output, setOutput] = useState({});
  const [loading, setLoading] = useState("");

  const call = async (ep) => {
    setLoading(ep.path);
    try {
      const res = await ep.run();
      setOutput((o) => ({ ...o, [ep.path]: { status: res.status, data: res.data } }));
    } catch (e) {
      setOutput((o) => ({ ...o, [ep.path]: { status: e.response?.status || "ERR", data: e.response?.data || e.message } }));
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tighter text-zinc-50">API Playground</h1>
      <p className="mt-2 text-zinc-400">Documented REST endpoints for RestAssured / pytest / Postman practice.</p>
      <p className="mt-2 font-mono text-xs text-zinc-500 break-all">base url: {API}</p>

      <div className="mt-8 space-y-4">
        {ENDPOINTS.map((ep) => (
          <Panel key={ep.path} testid={`endpoint-${ep.path.replace(/[^a-z0-9]/gi, "-")}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`font-mono text-sm font-bold ${methodColor[ep.method]}`}>{ep.method}</span>
                <code className="font-mono text-sm text-zinc-200 truncate">{ep.path}</code>
                {ep.auth && <span className="text-[10px] font-mono uppercase text-amber-400 border border-amber-500/40 rounded px-1.5 py-0.5">auth</span>}
              </div>
              <button data-testid={`run-${ep.path.replace(/[^a-z0-9]/gi, "-")}`} onClick={() => call(ep)} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white">
                {loading === ep.path ? "running…" : "Send"}
              </button>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{ep.desc}</p>
            {output[ep.path] && (
              <pre data-testid={`response-${ep.path.replace(/[^a-z0-9]/gi, "-")}`} className="mt-3 rounded-md border border-zinc-800 bg-black p-4 text-xs text-emerald-400 font-mono overflow-auto max-h-64">
{`status: ${output[ep.path].status}\n`}{JSON.stringify(output[ep.path].data, null, 2)}
              </pre>
            )}
          </Panel>
        ))}
      </div>
    </div>
  );
}
