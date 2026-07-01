import React, { useRef, useState } from "react";
import { Panel } from "@/components/Layout";

export function BasicForm() {
  const [submitted, setSubmitted] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", bio: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSubmitted({ ...form });
  };
  return (
    <Panel title="Form" testid="basic-form-panel">
      <form onSubmit={submit} className="space-y-4 max-w-lg" data-testid="basic-form">
        <input data-testid="bf-name" placeholder="Full name" value={form.name} onChange={set("name")} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 focus:border-blue-500 outline-none" />
        <input data-testid="bf-email" type="email" placeholder="Email" value={form.email} onChange={set("email")} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 focus:border-blue-500 outline-none" />
        <input data-testid="bf-password" type="password" placeholder="Password" value={form.password} onChange={set("password")} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 focus:border-blue-500 outline-none" />
        <textarea data-testid="bf-bio" placeholder="Bio" value={form.bio} onChange={set("bio")} rows={3} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 focus:border-blue-500 outline-none" />
        <button data-testid="bf-submit" className="rounded-md bg-blue-600 hover:bg-blue-500 px-5 py-2 text-sm font-semibold text-white">Submit</button>
      </form>
      {submitted && (
        <pre data-testid="bf-result" className="mt-6 rounded-md border border-zinc-800 bg-black p-4 text-sm text-emerald-400 font-mono overflow-auto">
{JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </Panel>
  );
}

export function ButtonInteractions() {
  const [log, setLog] = useState([]);
  const [label, setLabel] = useState("Click to relabel");
  const [delayedVisible, setDelayedVisible] = useState(false);
  const logId = useRef(0);
  const add = (m) => setLog((l) => [{ id: ++logId.current, text: m }, ...l].slice(0, 8));
  const delayed = () => {
    setDelayedVisible(false);
    setTimeout(() => setDelayedVisible(true), 2000);
  };
  return (
    <Panel title="Buttons" testid="button-panel">
      <div className="flex flex-wrap gap-3">
        <button data-testid="btn-single" onClick={() => add("single click")} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Single</button>
        <button data-testid="btn-double" onDoubleClick={() => add("double click")} className="rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2 text-sm text-zinc-100">Double-click me</button>
        <button data-testid="btn-right" onContextMenu={(e) => { e.preventDefault(); add("right click"); }} className="rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2 text-sm text-zinc-100">Right-click me</button>
        <button data-testid="btn-relabel" onClick={() => setLabel(label === "Click to relabel" ? "Relabeled!" : "Click to relabel")} className="rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2 text-sm text-zinc-100">{label}</button>
        <button data-testid="btn-delayed-trigger" onClick={delayed} className="rounded-md bg-amber-600 hover:bg-amber-500 px-4 py-2 text-sm font-semibold text-white">Show delayed button (2s)</button>
      </div>
      {delayedVisible && <button data-testid="btn-delayed" onClick={() => add("delayed appeared & clicked")} className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">I appeared!</button>}
      <ul data-testid="btn-log" className="mt-6 space-y-1 font-mono text-sm text-emerald-400">
        {log.map((item) => <li key={item.id} data-testid="btn-log-item">&gt; {item.text}</li>)}
      </ul>
    </Panel>
  );
}

export function CheckboxesRadio() {
  const opts = ["Chrome", "Firefox", "Safari", "Edge"];
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const toggle = (o) => setChecked((c) => (c.includes(o) ? c.filter((x) => x !== o) : [...c, o]));
  const allSelected = checked.length === opts.length;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Panel title="Checkboxes" testid="checkbox-panel">
        <label className="flex items-center gap-2 text-zinc-200 mb-3">
          <input data-testid="cb-select-all" type="checkbox" checked={allSelected} onChange={() => setChecked(allSelected ? [] : [...opts])} /> Select all
        </label>
        {opts.map((o) => (
          <label key={o} className="flex items-center gap-2 text-zinc-300 py-1">
            <input data-testid={`cb-${o.toLowerCase()}`} type="checkbox" checked={checked.includes(o)} onChange={() => toggle(o)} /> {o}
          </label>
        ))}
        <p data-testid="cb-count" className="mt-3 font-mono text-sm text-blue-400">selected: {checked.length}</p>
      </Panel>
      <Panel title="Radio + reveal" testid="radio-panel">
        {["free", "pro", "enterprise"].map((r) => (
          <label key={r} className="flex items-center gap-2 text-zinc-300 py-1 capitalize">
            <input data-testid={`radio-${r}`} type="radio" name="plan" checked={radio === r} onChange={() => setRadio(r)} /> {r}
          </label>
        ))}
        {radio === "enterprise" && (
          <div data-testid="radio-reveal" className="mt-4 rounded-md border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-sm text-blue-300">
            Contact sales revealed for enterprise!
          </div>
        )}
      </Panel>
    </div>
  );
}

export function Dropdowns() {
  const countries = ["India", "United States", "Germany", "Japan", "Brazil", "Canada"];
  const [std, setStd] = useState("");
  const [multi, setMulti] = useState([]);
  const [custom, setCustom] = useState("");
  const [customOpen, setCustomOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = countries.filter((c) => c.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Panel title="Standard select" testid="std-select-panel">
        <select data-testid="std-select" value={std} onChange={(e) => setStd(e.target.value)} className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100">
          <option value="">-- choose --</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <p data-testid="std-value" className="mt-3 font-mono text-sm text-blue-400">value: {std || "none"}</p>
        <select data-testid="multi-select" multiple value={multi} onChange={(e) => setMulti(Array.from(e.target.selectedOptions).map((o) => o.value))} className="mt-4 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 h-32">
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <p data-testid="multi-value" className="mt-3 font-mono text-sm text-blue-400">multi: {multi.join(", ") || "none"}</p>
      </Panel>
      <Panel title="Custom div dropdown + autocomplete" testid="custom-select-panel">
        <button data-testid="custom-select-trigger" onClick={() => setCustomOpen(!customOpen)} className="w-full text-left rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100">
          {custom || "Select a country"}
        </button>
        {customOpen && (
          <div data-testid="custom-select-menu" className="mt-1 rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
            {countries.map((c) => (
              <div key={c} data-testid={`custom-option-${c.replace(/\s+/g, "-").toLowerCase()}`} onClick={() => { setCustom(c); setCustomOpen(false); }} className="px-3 py-2 text-zinc-300 hover:bg-zinc-800 cursor-pointer">
                {c}
              </div>
            ))}
          </div>
        )}
        <div className="mt-6">
          <input data-testid="autocomplete-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type to filter countries…" className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100" />
          <ul data-testid="autocomplete-results" className="mt-2 space-y-1">
            {filtered.map((c) => <li key={c} data-testid={`autocomplete-item-${c.replace(/\s+/g, "-").toLowerCase()}`} className="font-mono text-sm text-emerald-400">{c}</li>)}
          </ul>
        </div>
      </Panel>
    </div>
  );
}
