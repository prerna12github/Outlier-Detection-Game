import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Outlier Arena — Is it an outlier?" },
      { name: "description", content: "A game-style data science tool to test if a number is an outlier using Z-score and IQR." },
      { property: "og:title", content: "Outlier Arena" },
      { property: "og:description", content: "Guess, detect and visualize outliers with Z-score and IQR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Stats = ReturnType<typeof stats>;
function stats(data: number[]) {
  const s = [...data].sort((a, b) => a - b);
  const n = s.length;
  const mean = s.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(s.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
  const q = (p: number) => {
    const i = (n - 1) * p, lo = Math.floor(i), hi = Math.ceil(i);
    const a = s[lo]!, b = s[hi]!;
    return a + (b - a) * (i - lo);
  };
  const q1 = q(0.25), q3 = q(0.75), iqr = q3 - q1;
  return { s, n, mean, sd, q1, q3, iqr, med: q(0.5), lo: q1 - 1.5 * iqr, hi: q3 + 1.5 * iqr };
}

function makeRound() {
  const base = 30 + Math.random() * 50;
  const spread = 10 + Math.random() * 25;
  const d = Array.from({ length: 16 }, () => Math.round(base + (Math.random() + Math.random() - 1) * spread));
  const st = stats(d);
  const r = Math.random();
  const t = r < 0.4 ? st.hi + 2 + Math.random() * spread
    : r < 0.55 ? st.lo - 2 - Math.random() * spread
    : r < 0.75 ? st.hi - Math.random() * 3 // tricky, near the fence
    : st.q1 + Math.random() * st.iqr;
  return { data: d.join(", "), target: String(Math.round(t)) };
}

const fmt = (v: number) => (Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(1));

function Index() {
  const [init] = useState(makeRound);
  const [raw, setRaw] = useState(init.data);
  const [target, setTarget] = useState(init.target);
  const [method, setMethod] = useState<"iqr" | "z">("iqr");
  const [guess, setGuess] = useState<boolean | null>(null);
  const [score, setScore] = useState({ win: 0, streak: 0, best: 0, played: 0 });

  const data = useMemo(() => raw.split(/[\s,;]+/).filter(Boolean).map(Number).filter(Number.isFinite), [raw]);
  const st = data.length >= 4 ? stats(data) : null;
  const t = target.trim() === "" || !Number.isFinite(Number(target)) ? null : Number(target);
  const z = st && t !== null && st.sd ? (t - st.mean) / st.sd : 0;
  const isOut = st && t !== null ? (method === "iqr" ? t < st.lo || t > st.hi : Math.abs(z) > 2) : null;
  const revealed = guess !== null;
  const correct = revealed && guess === isOut;

  const play = (g: boolean) => {
    if (isOut === null || revealed) return;
    setGuess(g);
    const ok = g === isOut;
    setScore((s) => {
      const streak = ok ? s.streak + 1 : 0;
      return { win: s.win + (ok ? 1 : 0), streak, best: Math.max(s.best, streak), played: s.played + 1 };
    });
  };
  const next = () => { const r = makeRound(); setRaw(r.data); setTarget(r.target); setGuess(null); };
  const edit = (fn: () => void) => { fn(); setGuess(null); };
  const acc = score.played ? Math.round((score.win / score.played) * 100) : 0;

  return (
    <main className="arena min-h-screen">
      <div className="mx-auto max-w-6xl px-5 py-8 md:py-12">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Round {score.played + (revealed ? 0 : 1)}</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Outlier <span className="text-primary">Arena</span>
            </h1>
            <p className="mt-2 max-w-md text-muted-foreground">Look at the data. Make the call. Let the statistics judge you.</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {([["Score", score.win], ["Streak", score.streak], ["Best", score.best], ["Accuracy", `${acc}%`]] as const).map(([k, v]) => (
              <div key={k} className="panel !p-3 min-w-20 text-center">
                <div className="label !text-[10px]">{k}</div>
                <div className="mono mt-1 text-xl font-semibold">{v}</div>
              </div>
            ))}
          </div>
        </header>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="panel grid-bg !p-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
              <span className="label">Distribution</span>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <Legend cls="bg-foreground/80" label="Data" />
                <Legend cls="bg-primary/40" label="Q1–Q3" />
                <Legend cls="border border-dashed border-accent" label={method === "iqr" ? "Fences" : "±2σ"} />
              </div>
            </div>
            {st ? <Chart st={st} t={t} method={method} revealed={revealed} isOut={!!isOut} /> :
              <div className="grid h-72 place-items-center text-muted-foreground">Enter at least 4 numbers</div>}
          </section>

          <aside className="panel space-y-5">
            <div>
              <label className="label">Dataset</label>
              <textarea value={raw} rows={4} onChange={(e) => edit(() => setRaw(e.target.value))}
                className="field mono mt-2 resize-none text-sm" />
              <p className="mt-1 text-xs text-muted-foreground">{data.length} values</p>
            </div>
            <div>
              <label className="label">Target number</label>
              <input type="number" value={target} onChange={(e) => edit(() => setTarget(e.target.value))}
                className="field mono mt-2 text-lg" placeholder="e.g. 150" />
            </div>
            <div>
              <label className="label">Detection rule</label>
              <div className="seg mt-2 w-full">
                <button className="flex-1" data-on={method === "iqr"} onClick={() => edit(() => setMethod("iqr"))}>IQR × 1.5</button>
                <button className="flex-1" data-on={method === "z"} onClick={() => edit(() => setMethod("z"))}>|Z| &gt; 2</button>
              </div>
            </div>
            <button onClick={next} className="btn w-full">↻ New random round</button>
          </aside>
        </div>

        {isOut !== null && st && t !== null && (
          <section className="panel mt-5">
            {!revealed ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="label">Your call</div>
                  <p className="mt-1 text-lg">Is <span className="mono font-semibold text-accent">{t}</span> an outlier?</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => play(true)} className="btn btn-danger min-w-36">Outlier</button>
                  <button onClick={() => play(false)} className="btn btn-safe min-w-36">Normal</button>
                </div>
              </div>
            ) : (
              <div className="pop flex flex-wrap items-center justify-between gap-6">
                <div>
                  <div className={`text-2xl font-bold ${correct ? "text-success" : "text-destructive"}`}>
                    {correct ? "Correct" : "Not quite"}
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    <span className="mono text-foreground">{t}</span> is {isOut ? "an outlier" : "within the normal range"}.
                  </p>
                </div>
                <div className="mono grid grid-cols-3 gap-6 text-sm">
                  <Stat k="z-score" v={z.toFixed(2)} />
                  {method === "iqr"
                    ? <><Stat k="lower fence" v={fmt(st.lo)} /><Stat k="upper fence" v={fmt(st.hi)} /></>
                    : <><Stat k="mean" v={fmt(st.mean)} /><Stat k="σ" v={fmt(st.sd)} /></>}
                </div>
                <button onClick={next} className="btn btn-primary">Next round →</button>
              </div>
            )}
          </section>
        )}

        {st && (
          <section className="mt-5 grid grid-cols-3 gap-3 md:grid-cols-6">
            {([["Mean", st.mean], ["Median", st.med], ["Std dev", st.sd], ["Q1", st.q1], ["Q3", st.q3], ["IQR", st.iqr]] as const).map(([k, v]) => (
              <div key={k} className="panel !p-3"><Stat k={k} v={fmt(v)} /></div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return <span className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-sm ${cls}`} />{label}</span>;
}
function Stat({ k, v }: { k: string; v: string }) {
  return <div><div className="label !text-[10px]">{k}</div><div className="mono mt-0.5 text-base font-semibold">{v}</div></div>;
}

function Chart({ st, t, method, revealed, isOut }: { st: Stats; t: number | null; method: "iqr" | "z"; revealed: boolean; isOut: boolean }) {
  const W = 800, H = 300, P = 40, axisY = 240;
  const lo = method === "iqr" ? st.lo : st.mean - 2 * st.sd;
  const hi = method === "iqr" ? st.hi : st.mean + 2 * st.sd;
  const vals = [...st.s, lo, hi, ...(t !== null ? [t] : [])];
  let min = Math.min(...vals), max = Math.max(...vals);
  const pad = (max - min || 1) * 0.08; min -= pad; max += pad;
  const x = (v: number) => P + ((v - min) / (max - min)) * (W - 2 * P);
  const ticks = Array.from({ length: 6 }, (_, i) => min + ((max - min) * i) / 5);

  // stack duplicate-ish values into columns (beeswarm-lite)
  const counts = new Map<number, number>();
  const dots = st.s.map((v) => {
    const key = Math.round(x(v) / 12);
    const c = counts.get(key) ?? 0; counts.set(key, c + 1);
    return { v, cx: x(v), cy: 200 - c * 13 };
  });
  const tColor = !revealed ? "var(--accent)" : isOut ? "var(--destructive)" : "var(--success)";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="my-auto block h-auto w-full">
      <rect x={x(lo)} y={40} width={Math.max(x(hi) - x(lo), 1)} height={190} rx={8}
        fill="color-mix(in oklab, var(--accent) 6%, transparent)" stroke="var(--accent)" strokeOpacity={0.6} strokeDasharray="5 5" />
      <text x={x(lo)} y={32} fill="var(--accent)" fontSize={11} textAnchor="middle" className="mono">{fmt(lo)}</text>
      <text x={x(hi)} y={32} fill="var(--accent)" fontSize={11} textAnchor="middle" className="mono">{fmt(hi)}</text>

      <rect x={x(st.q1)} y={212} width={Math.max(x(st.q3) - x(st.q1), 2)} height={18} rx={4}
        fill="color-mix(in oklab, var(--primary) 35%, transparent)" stroke="var(--primary)" />
      <line x1={x(st.med)} x2={x(st.med)} y1={208} y2={234} stroke="var(--primary)" strokeWidth={2.5} />
      <line x1={x(st.mean)} x2={x(st.mean)} y1={44} y2={230} stroke="var(--muted-foreground)" strokeDasharray="2 4" />
      <text x={x(st.mean) + 5} y={56} fill="var(--muted-foreground)" fontSize={10} className="mono">μ</text>

      <line x1={P} x2={W - P} y1={axisY} y2={axisY} stroke="var(--border)" />
      {ticks.map((v, i) => (
        <g key={i}>
          <line x1={x(v)} x2={x(v)} y1={axisY} y2={axisY + 5} stroke="var(--border)" />
          <text x={x(v)} y={axisY + 20} fill="var(--muted-foreground)" fontSize={11} textAnchor="middle" className="mono">{fmt(v)}</text>
        </g>
      ))}

      {dots.map((d, i) => (
        <circle key={`${d.v}-${i}`} className="dot-in" style={{ animationDelay: `${i * 25}ms` }}
          cx={d.cx} cy={d.cy} r={5} fill="var(--foreground)" fillOpacity={0.85} />
      ))}

      {t !== null && (
        <g style={{ transition: "transform .4s" }}>
          <line x1={x(t)} x2={x(t)} y1={70} y2={axisY} stroke={tColor} strokeWidth={2} />
          {!revealed && <circle className="pulse" cx={x(t)} cy={70} r={9} fill={tColor} fillOpacity={0.4} />}
          <circle cx={x(t)} cy={70} r={7} fill={tColor} />
          <rect x={x(t) - 26} y={256} width={52} height={22} rx={6} fill={tColor} />
          <text x={x(t)} y={271} fontSize={12} fontWeight={700} textAnchor="middle" fill="var(--background)" className="mono">{fmt(t)}</text>
        </g>
      )}
    </svg>
  );
}
