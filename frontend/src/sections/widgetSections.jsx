import React, { useMemo, useState } from "react";
import { Panel } from "@/components/Layout";

const ROWS = [
  { id: 1, name: "Ada Lovelace", role: "admin", score: 92 },
  { id: 2, name: "Alan Turing", role: "user", score: 88 },
  { id: 3, name: "Grace Hopper", role: "user", score: 95 },
  { id: 4, name: "Linus Torvalds", role: "maintainer", score: 79 },
  { id: 5, name: "Margaret Hamilton", role: "admin", score: 99 },
  { id: 6, name: "Dennis Ritchie", role: "user", score: 84 },
  { id: 7, name: "Ken Thompson", role: "maintainer", score: 81 },
];

export function TableAutomation() {
  const [sortKey, setSortKey] = useState("id");
  const [asc, setAsc] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const filtered = useMemo(() => {
    let r = ROWS.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));
    if (role !== "all") r = r.filter((x) => x.role === role);
    r = [...r].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (asc ? 1 : -1));
    return r;
  }, [search, role, sortKey, asc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const sort = (k) => { if (sortKey === k) setAsc(!asc); else { setSortKey(k); setAsc(true); } };

  return (
    <Panel title="Sortable / searchable / paginated table" testid="table-panel">
      <div className="flex flex-wrap gap-3 mb-4">
        <input data-testid="table-search" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search name…" className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100" />
        <select data-testid="table-role-filter" value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100">
          <option value="all">All roles</option>
          <option value="admin">admin</option>
          <option value="user">user</option>
          <option value="maintainer">maintainer</option>
        </select>
      </div>
      <table data-testid="data-table" className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800">
            {["id", "name", "role", "score"].map((k) => (
              <th key={k} data-testid={`th-${k}`} onClick={() => sort(k)} className="cursor-pointer py-2 px-3 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-blue-400">
                {k} {sortKey === k ? (asc ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-testid="table-body">
          {paged.map((r) => (
            <tr key={r.id} data-testid={`row-${r.id}`} className="border-b border-zinc-900">
              <td className="py-2 px-3 text-zinc-400 font-mono">{r.id}</td>
              <td className="py-2 px-3 text-zinc-100">{r.name}</td>
              <td className="py-2 px-3 text-zinc-300">{r.role}</td>
              <td className="py-2 px-3 text-emerald-400 font-mono">{r.score}</td>
            </tr>
          ))}
          {paged.length === 0 && <tr><td colSpan={4} data-testid="table-empty" className="py-4 px-3 text-zinc-500">No results</td></tr>}
        </tbody>
      </table>
      <div className="mt-4 flex items-center gap-3">
        <button data-testid="page-prev" disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-md bg-zinc-800 border border-zinc-700 px-3 py-1.5 text-sm text-zinc-100 disabled:opacity-40">Prev</button>
        <span data-testid="page-indicator" className="font-mono text-sm text-zinc-400">{page} / {totalPages}</span>
        <button data-testid="page-next" disabled={page === totalPages} onClick={() => setPage(page + 1)} className="rounded-md bg-zinc-800 border border-zinc-700 px-3 py-1.5 text-sm text-zinc-100 disabled:opacity-40">Next</button>
      </div>
    </Panel>
  );
}

export function Alerts() {
  const [output, setOutput] = useState("");
  return (
    <Panel title="Native alert / confirm / prompt" testid="alerts-panel">
      <div className="flex flex-wrap gap-3">
        <button data-testid="trigger-alert" onClick={() => { window.alert("This is an alert!"); setOutput("alert shown"); }} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">alert()</button>
        <button data-testid="trigger-confirm" onClick={() => { const ok = window.confirm("Confirm?"); setOutput(`confirm: ${ok}`); }} className="rounded-md bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm text-zinc-100">confirm()</button>
        <button data-testid="trigger-prompt" onClick={() => { const v = window.prompt("Enter value", ""); setOutput(`prompt: ${v}`); }} className="rounded-md bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm text-zinc-100">prompt()</button>
      </div>
      <p data-testid="alert-output" className="mt-4 font-mono text-sm text-emerald-400">{output}</p>
    </Panel>
  );
}

export function ModalDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Panel title="Modal dialog" testid="modal-panel">
      <button data-testid="open-modal" onClick={() => setOpen(true)} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Open modal</button>
      {open && (
        <div data-testid="modal-overlay" onClick={() => setOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div data-testid="modal-content" onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-zinc-100">Dialog title</h3>
              <button data-testid="modal-close-x" onClick={() => setOpen(false)} className="text-zinc-400 hover:text-zinc-100">✕</button>
            </div>
            <p className="mt-3 text-zinc-400 text-sm">Close via X, the button, or clicking the overlay.</p>
            <button data-testid="modal-close-btn" onClick={() => setOpen(false)} className="mt-5 rounded-md bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm text-zinc-100">Close</button>
          </div>
        </div>
      )}
    </Panel>
  );
}

export function IFrameSection() {
  const src = `data:text/html,<html><body style="background:%23000;color:%2334d399;font-family:monospace;padding:16px;"><input data-testid="iframe-input" placeholder="inside iframe" style="padding:8px;background:%2309090b;border:1px solid %2327272a;color:%23fff;border-radius:6px;"/><button data-testid="iframe-button" onclick="document.getElementById('out').innerText=document.querySelector('input').value" style="margin-left:8px;padding:8px 12px;background:%232563eb;color:%23fff;border:none;border-radius:6px;">Echo</button><p id="out"></p></body></html>`;
  return (
    <Panel title="iFrame context" testid="iframe-panel">
      <p className="text-sm text-zinc-400 mb-4">Switch driver context into the frame to interact with its input & button.</p>
      <iframe data-testid="practice-iframe" title="practice-frame" src={src} className="w-full h-56 rounded-md border border-zinc-800 bg-black" />
    </Panel>
  );
}

export function TabComponents() {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "specs", "reviews"];
  return (
    <Panel title="Tabbed panels" testid="tabs-panel">
      <div className="flex gap-2 border-b border-zinc-800">
        {tabs.map((t) => (
          <button key={t} data-testid={`tab-${t}`} onClick={() => setTab(t)} className={`px-4 py-2 text-sm capitalize border-b-2 -mb-px transition-colors ${tab === t ? "border-blue-500 text-blue-400" : "border-transparent text-zinc-400 hover:text-zinc-100"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tab === "overview" && <div data-testid="panel-overview" className="text-zinc-300">Overview panel content.</div>}
        {tab === "specs" && <div data-testid="panel-specs" className="text-zinc-300">Specs panel content.</div>}
        {tab === "reviews" && <div data-testid="panel-reviews" className="text-zinc-300">Reviews panel content.</div>}
      </div>
    </Panel>
  );
}
