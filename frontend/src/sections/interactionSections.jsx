import { useState } from "react";

export function DragDrop() {
  const [dropped, setDropped] = useState([]);
  const items = ["Alpha", "Beta", "Gamma"];
  const remaining = items.filter((i) => !dropped.includes(i));
  return (
    <Panel title="Native HTML5 drag & drop" testid="dragdrop-panel">
      <div className="grid grid-cols-2 gap-6">
        <div data-testid="drag-source" className="rounded-md border border-zinc-800 bg-zinc-950 p-4 min-h-[160px]">
          <p className="text-xs font-mono uppercase text-zinc-500 mb-3">source</p>
          {remaining.map((it) => (
            <div key={it} draggable data-testid={`drag-item-${it.toLowerCase()}`} onDragStart={(e) => e.dataTransfer.setData("text/plain", it)} className="mb-2 cursor-grab rounded bg-blue-600/20 border border-blue-500/40 px-3 py-2 text-blue-300">
              {it}
            </div>
          ))}
        </div>
        <div
          data-testid="drop-target"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const v = e.dataTransfer.getData("text/plain"); if (v && !dropped.includes(v)) setDropped([...dropped, v]); }}
          className="rounded-md border-2 border-dashed border-zinc-700 bg-zinc-950 p-4 min-h-[160px]"
        >
          <p className="text-xs font-mono uppercase text-zinc-500 mb-3">drop here</p>
          {dropped.map((d) => <div key={d} data-testid={`dropped-${d.toLowerCase()}`} className="mb-2 rounded bg-emerald-600/20 border border-emerald-500/40 px-3 py-2 text-emerald-300">{d}</div>)}
        </div>
      </div>
      <p data-testid="drop-count" className="mt-4 font-mono text-sm text-blue-400">dropped: {dropped.length}</p>
    </Panel>
  );
}

export function HoverMenu() {
  const [item, setItem] = useState("");
  return (
    <Panel title="Hover to reveal submenu" testid="hover-menu-panel">
      <div className="relative inline-block group" data-testid="hover-trigger">
        <button className="rounded-md bg-zinc-800 border border-zinc-700 px-4 py-2 text-zinc-100">Products ▾</button>
        <div data-testid="hover-submenu" className="invisible group-hover:visible absolute left-0 mt-1 w-44 rounded-md border border-zinc-800 bg-zinc-950 shadow-xl z-10">
          {["Analytics", "Testing", "Deployment"].map((m) => (
            <div key={m} data-testid={`hover-item-${m.toLowerCase()}`} onClick={() => setItem(m)} className="px-3 py-2 text-zinc-300 hover:bg-zinc-800 cursor-pointer">{m}</div>
          ))}
        </div>
      </div>
      <p data-testid="hover-selected" className="mt-4 font-mono text-sm text-blue-400">selected: {item || "none"}</p>
    </Panel>
  );
}

export function Tooltip() {
  return (
    <Panel title="Tooltip on hover" testid="tooltip-panel">
      <div className="relative inline-block group">
        <button data-testid="tooltip-trigger" className="rounded-md bg-zinc-800 border border-zinc-700 px-4 py-2 text-zinc-100">Hover me</button>
        <span data-testid="tooltip-text" role="tooltip" className="invisible group-hover:visible absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black border border-zinc-700 px-2 py-1 text-xs text-emerald-400 font-mono">
          Automated tooltip content
        </span>
      </div>
    </Panel>
  );
}

export function KeyboardActions() {
  const [text, setText] = useState("");
  const [lastKey, setLastKey] = useState("");
  const [combo, setCombo] = useState("");
  const onKey = (e) => {
    setLastKey(e.key);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); setCombo("Ctrl/Cmd + S"); }
    if (e.key.startsWith("Arrow")) setCombo(e.key);
  };
  return (
    <Panel title="Keyboard input & shortcuts" testid="keyboard-panel">
      <input data-testid="keyboard-input" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={onKey} placeholder="Type, use arrows, Ctrl+S…" className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100" />
      <p data-testid="keyboard-value" className="mt-3 font-mono text-sm text-emerald-400">value: {text}</p>
      <p data-testid="keyboard-last-key" className="font-mono text-sm text-blue-400">last key: {lastKey}</p>
      <p data-testid="keyboard-combo" className="font-mono text-sm text-amber-400">combo: {combo || "none"}</p>
    </Panel>
  );
}

export function Slider() {
  const [val, setVal] = useState(50);
  return (
    <Panel title="Range slider" testid="slider-panel">
      <input data-testid="range-slider" type="range" min={0} max={100} value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full accent-blue-500" />
      <p data-testid="slider-value" className="mt-4 font-mono text-3xl text-emerald-400">{val}</p>
    </Panel>
  );
}

export function ScrollTesting() {
  return (
    <Panel title="Scroll into view" testid="scroll-panel">
      <button data-testid="scroll-to-target" onClick={() => document.querySelector('[data-testid="scroll-target"]').scrollIntoView({ behavior: "smooth" })} className="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white">Scroll to target</button>
      <div className="mt-4 h-64 overflow-y-auto rounded-md border border-zinc-800 bg-zinc-950 p-4" data-testid="scroll-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="py-3 text-zinc-500 border-b border-zinc-900">row {i + 1}</p>
        ))}
        <div data-testid="scroll-target" className="mt-4 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-6 text-center text-emerald-300 font-mono">
          🎯 scroll target reached
        </div>
      </div>
    </Panel>
  );
}

export function DatePicker() {
  const [date, setDate] = useState("");
  return (
    <Panel title="Date picker" testid="date-panel">
      <input data-testid="date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100" />
      <p data-testid="date-echo" className="mt-4 font-mono text-lg text-emerald-400">selected: {date || "none"}</p>
    </Panel>
  );
}
