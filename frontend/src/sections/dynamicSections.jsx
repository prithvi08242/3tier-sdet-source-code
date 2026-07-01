import React, { useEffect, useRef, useState } from "react";
import { Panel } from "@/components/Layout";
import { api } from "@/lib/api";

export function DynamicContent() {
  const [visible, setVisible] = useState(true);
  const [counter, setCounter] = useState(0);
  const [injected, setInjected] = useState([]);
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setCounter((c) => c + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const showDelayed = () => { setDelayed(false); setTimeout(() => setDelayed(true), 2000); };
  return (
    <Panel title="Dynamic content" testid="dynamic-content-panel">
      <p data-testid="live-counter" className="font-mono text-2xl text-emerald-400">counter: {counter}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button data-testid="toggle-disappear" onClick={() => setVisible(!visible)} className="rounded-md bg-zinc-800 border border-zinc-700 px-4 py-2 text-sm text-zinc-100">Toggle element</button>
        <button data-testid="inject-btn" onClick={() => setInjected((a) => [...a, `item-${a.length + 1}`])} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Inject element</button>
        <button data-testid="delayed-appear-btn" onClick={showDelayed} className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white">Appear after 2s</button>
      </div>
      {visible && <div data-testid="disappearing-element" className="mt-4 text-zinc-300">I can disappear.</div>}
      {delayed && <div data-testid="delayed-element" className="mt-2 text-emerald-400">Delayed content loaded.</div>}
      <div data-testid="injected-container" className="mt-4 space-y-1">
        {injected.map((i) => <div key={i} data-testid={`injected-${i}`} className="font-mono text-sm text-blue-400">{i}</div>)}
      </div>
    </Panel>
  );
}

export function WaitsSync() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");
  const run = () => {
    setLoading(true); setResult(""); setProgress(0);
    const t = setInterval(() => setProgress((p) => Math.min(p + 10, 100)), 200);
    setTimeout(() => { clearInterval(t); setProgress(100); setLoading(false); setResult("AJAX response received"); }, 2200);
  };
  return (
    <Panel title="Spinner / progress / AJAX" testid="waits-panel">
      <button data-testid="start-ajax" onClick={run} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Start async task</button>
      {loading && <div data-testid="spinner" className="mt-4 flex items-center gap-2 text-zinc-400"><span className="h-4 w-4 rounded-full border-2 border-zinc-600 border-t-blue-500 animate-spin" /> loading…</div>}
      <div className="mt-4 h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div data-testid="progress-bar" style={{ width: `${progress}%` }} className="h-full bg-blue-500 transition-all" />
      </div>
      <p data-testid="progress-value" className="mt-1 font-mono text-xs text-zinc-500">{progress}%</p>
      {result && <p data-testid="ajax-result" className="mt-4 text-emerald-400 font-mono text-sm">{result}</p>}
    </Panel>
  );
}

export function StaleElement() {
  const [key, setKey] = useState(0);
  return (
    <Panel title="Stale element reference" testid="stale-panel">
      <p className="text-sm text-zinc-400 mb-4">Rebuild replaces the DOM node — an old reference becomes stale.</p>
      <button data-testid="rebuild-dom" onClick={() => setKey((k) => k + 1)} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Rebuild DOM</button>
      <div key={key} data-testid="stale-target" className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-emerald-400">
        fresh node #{key}
      </div>
    </Panel>
  );
}

export function DynamicList() {
  const [items, setItems] = useState(["Task A", "Task B"]);
  const [text, setText] = useState("");
  return (
    <Panel title="Add / remove list items" testid="dynamic-list-panel">
      <div className="flex gap-3">
        <input data-testid="list-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="New item" className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100" />
        <button data-testid="list-add" onClick={() => { if (text.trim()) { setItems([...items, text.trim()]); setText(""); } }} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Add</button>
      </div>
      <p data-testid="list-count" className="mt-3 font-mono text-sm text-blue-400">length: {items.length}</p>
      <ul data-testid="dynamic-list" className="mt-2 space-y-2">
        {items.map((it, i) => (
          <li key={i} data-testid={`list-item-${i}`} className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-200">
            {it}
            <button data-testid={`list-remove-${i}`} onClick={() => setItems(items.filter((_, x) => x !== i))} className="text-red-400 hover:text-red-300 text-sm">remove</button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function NetworkDelay() {
  const [seconds, setSeconds] = useState(2);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const call = async () => {
    setLoading(true); setResp(null);
    try {
      const { data } = await api.get(`/playground/delay/${seconds}`);
      setResp(data);
    } catch (e) {
      setResp({ error: e.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Panel title="Simulated API delay" testid="network-delay-panel">
      <p className="text-sm text-zinc-400 mb-4">Hits the real backend endpoint <code className="font-mono text-blue-400">GET /api/playground/delay/{seconds}</code>.</p>
      <div className="flex items-center gap-3">
        <input data-testid="delay-seconds" type="number" min={0} max={10} value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} className="w-24 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100" />
        <button data-testid="delay-call" onClick={call} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Call with delay</button>
      </div>
      {loading && <p data-testid="delay-loading" className="mt-4 text-zinc-400">waiting for response…</p>}
      {resp && <pre data-testid="delay-response" className="mt-4 rounded-md border border-zinc-800 bg-black p-4 text-sm text-emerald-400 font-mono">{JSON.stringify(resp, null, 2)}</pre>}
    </Panel>
  );
}

export function FlakyElement() {
  const [attempts, setAttempts] = useState(0);
  const [passes, setPasses] = useState(0);
  const [state, setState] = useState(null);
  const tryOnce = async () => {
    setAttempts((a) => a + 1);
    try {
      await api.get("/playground/flaky");
      setPasses((p) => p + 1);
      setState("pass");
    } catch {
      setState("fail");
    }
  };
  return (
    <Panel title="Flaky endpoint (~50/50)" testid="flaky-panel">
      <p className="text-sm text-zinc-400 mb-4">Practice retry logic against <code className="font-mono text-blue-400">GET /api/playground/flaky</code>.</p>
      <button data-testid="flaky-try" onClick={tryOnce} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Try once</button>
      {state && (
        <p data-testid="flaky-result" className={`mt-4 font-mono font-bold ${state === "pass" ? "text-emerald-400" : "text-red-400"}`}>
          {state === "pass" ? "PASS ✓" : "FAIL ✗"}
        </p>
      )}
      <p data-testid="flaky-stats" className="mt-2 font-mono text-sm text-zinc-500">attempts: {attempts} · passes: {passes}</p>
    </Panel>
  );
}
