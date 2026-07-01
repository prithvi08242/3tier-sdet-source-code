import React, { useState } from "react";
import { Panel } from "@/components/Layout";

export function FileUpload() {
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  return (
    <Panel title="File upload" testid="upload-panel">
      <input data-testid="file-input" type="file" onChange={(e) => { const f = e.target.files[0]; if (f) { setName(f.name); setSize(f.size); } }} className="text-zinc-300" />
      {name && (
        <div data-testid="upload-result" className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 p-4">
          <p className="font-mono text-sm text-emerald-400" data-testid="uploaded-filename">name: {name}</p>
          <p className="font-mono text-sm text-blue-400" data-testid="uploaded-size">size: {size} bytes</p>
        </div>
      )}
    </Panel>
  );
}

export function Download() {
  const [done, setDone] = useState(false);
  const trigger = () => {
    const blob = new Blob(["id,name\n1,ada\n2,alan\n"], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "practice-download.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDone(true);
  };
  return (
    <Panel title="Trigger download" testid="download-panel">
      <button data-testid="download-btn" onClick={trigger} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Download CSV</button>
      {done && <p data-testid="download-status" className="mt-4 font-mono text-sm text-emerald-400">download triggered ✓</p>}
    </Panel>
  );
}

export function MultipleWindows() {
  const [opened, setOpened] = useState(false);
  return (
    <Panel title="Multiple windows / tabs" testid="windows-panel">
      <div className="flex flex-wrap gap-3">
        <a data-testid="open-new-tab" href="/practice" target="_blank" rel="noopener noreferrer" className="rounded-md bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm text-zinc-100">Open link in new tab</a>
        <button data-testid="open-window" onClick={() => { window.open("/rest-playground", "_blank"); setOpened(true); }} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">window.open()</button>
      </div>
      {opened && <p data-testid="window-status" className="mt-4 font-mono text-sm text-emerald-400">new window opened ✓</p>}
    </Panel>
  );
}

export function AuthSimulation() {
  const [user, setUser] = useState(null);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [error, setError] = useState("");
  const login = (e) => {
    e.preventDefault();
    if (u === "tester" && p === "secret") { setUser(u); setError(""); }
    else setError("Invalid credentials (use tester / secret)");
  };
  return (
    <Panel title="Local login flow simulation" testid="auth-sim-panel">
      <p className="text-sm text-zinc-400 mb-4">A self-contained login flow (tester / secret). For real JWT auth use the top-right Login.</p>
      {user ? (
        <div data-testid="auth-sim-dashboard">
          <p className="font-mono text-emerald-400">session active: {user}</p>
          <button data-testid="auth-sim-logout" onClick={() => setUser(null)} className="mt-3 rounded-md bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm text-zinc-100">Logout</button>
        </div>
      ) : (
        <form onSubmit={login} className="space-y-3 max-w-sm" data-testid="auth-sim-form">
          <input data-testid="auth-sim-username" value={u} onChange={(e) => setU(e.target.value)} placeholder="username" className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100" />
          <input data-testid="auth-sim-password" type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="password" className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100" />
          {error && <p data-testid="auth-sim-error" className="text-red-400 text-sm">{error}</p>}
          <button data-testid="auth-sim-submit" className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Login</button>
        </form>
      )}
    </Panel>
  );
}
