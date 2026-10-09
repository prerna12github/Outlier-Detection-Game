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

function stats(data: number[]) {
  const s = [...data].sort((a, b) => a - b);
  const n = s.length;
  const mean = s.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(s.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
  const q = (p: number) => {
    const i = (n - 1) * p, lo = Math.floor(i), hi = Math.ceil(i);
    return s[lo] + (s[hi] - s[lo]) * (i - lo);
  };
  const q1 = q(0.25), q3 = q(0.75), iqr = q3 - q1;
  return { s, mean, sd, q1, q3, med: q(0.5), lo: q1 - 1.5 * iqr, hi: q3 + 1.5 * iqr };
}

function randomSet() {
  const base = 40 + Math.random() * 40;
  return Array.from({ length: 14 }, () => Math.round(base + (Math.random() - 0.5) * 30));
}

function Index() {
  const [raw, setRaw] = useState(() => randomSet().join(", "));
  const [target, setTarget] = useState("");
  const [method, setMethod] = useState<"iqr" | "z">("iqr");
  const [guess, setGuess] = useState<boolean | null>(null);
  const [score, setScore] = useState({ win: 0, streak: 0, played: 0 });

  const data = useMemo(() => raw.split(/[\s,;]+/).map(Number).filter((x) => !isNaN(x) && x !== 0 || x === 0).filter(Number.isFinite), [raw]);
  const st = data.length >= 4 ? stats(data) : null;
  const t = target === "" ? null : Number(target);
  const z = st && t !== null && st.sd ? (t - st.mean) / st.sd : 0;
  const isOut = st && t !== null ? (method === "iqr" ? t < st.lo || t > st.hi : Math.abs(z) > 2) : null;

  const play = (g: boolean) => {
    if (isOut === null) return;
    setGuess(g);
    const ok = g === isOut;
    setScore((s) => ({ win: s.win + (ok ? 1 : 0), streak: ok ? s.streak + 1 : 0, played: s.played + 1 }));
  };
  const nextRound = () => {
    const d = randomSet();
    setRaw(d.join(", "));
    const st2 = stats(d);
    const far = Math.random() < 0.5;
    setTarget(String(Math.round(far ? st2.hi + Math.random() * 30 : st2.q1 + Math.random() * (st2.q3 - st2.q1))));
    setGuess(null);
  };

  const all = st ? [...st.s, ...(t !== null ? [t] : []), st.lo, st.hi] : [];
  const min = Math.min(...all), max = Math.max(...all);
  const pos = (v: number) => ((v - min) / (max - min || 1)) * 92 + 4;

  return (
    <main className="arena min-h-screen px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="text-center">
          <p className="pixel text-xs text-accent">LEVEL {score.played + 1}</p>
          <h1 className="pixel mt-2 text-3xl md:text-5xl text-primary glow">OUTLIER ARENA</h1>
          <p className="mt-3 text-muted-foreground">Is the target number an outlier? Guess, then let the stats decide.</p>
        </header>

        <div className="grid grid-cols-3 gap-3">
          {[["SCORE", score.win], ["STREAK", score.streak], ["PLAYED", score.played]].map(([k, v]) => (
            <div key={k} className="panel text-center">
              <div className="pixel text-[10px] text-muted-foreground">{k}</div>
              <div className="pixel text-2xl text-primary">{v}</div>
            </div>
          ))}
        </div>

        <section className="panel space-y-4">
          <label className="pixel text-xs text-accent">DATASET</label>
          <textarea value={raw} onChange={(e) => { setRaw(e.target.value); setGuess(null); }} rows={2}
            className="w-full rounded-md border border-border bg-input p-3 font-mono text-sm" />
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="pixel block text-xs text-accent mb-1">TARGET</label>
              <input type="number" value={target} onChange={(e) => { setTarget(e.target.value); setGuess(null); }}
                className="w-36 rounded-md border border-border bg-input p-2 font-mono" placeholder="e.g. 150" />
            </div>
            <div className="flex gap-2">
              {(["iqr", "z"] as const).map((m) => (
                <button key={m} onClick={() => { setMethod(m); setGuess(null); }}
                  className={`btn ${method === m ? "btn-on" : ""}`}>{m === "iqr" ? "IQR 1.5×" : "Z > 2"}</button>
              ))}
            </div>
            <button onClick={nextRound} className="btn ml-auto">🎲 NEW ROUND</button>
          </div>
        </section>

        {st && (
          <section className="panel">
            <div className="relative h-40">
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-muted rounded" />
              <div className="absolute top-1/2 h-12 -translate-y-1/2 rounded border-2 border-dashed border-accent/70 bg-accent/10"
                style={{ left: `${pos(st.lo)}%`, width: `${pos(st.hi) - pos(st.lo)}%` }} />
              <div className="absolute top-1/2 h-16 -translate-y-1/2 rounded bg-primary/25 border-2 border-primary"
                style={{ left: `${pos(st.q1)}%`, width: `${Math.max(pos(st.q3) - pos(st.q1), 0.5)}%` }} />
              <div className="absolute top-1/2 h-16 w-0.5 -translate-y-1/2 bg-primary" style={{ left: `${pos(st.med)}%` }} />
              {st.s.map((v, i) => (
                <div key={i} title={String(v)} className="dot absolute h-3 w-3 -translate-x-1/2 rounded-full bg-foreground"
                  style={{ left: `${pos(v)}%`, top: `${12 + (i % 3) * 8}%` }} />
              ))}
              {t !== null && (
                <div className="absolute bottom-0 -translate-x-1/2 text-center" style={{ left: `${pos(t)}%` }}>
                  <div className={`target pixel text-xl ${guess !== null ? (isOut ? "text-destructive" : "text-success") : "text-accent"}`}>▲</div>
                  <div className="pixel text-[10px]">{t}</div>
                </div>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs text-muted-foreground">
              <span>mean {st.mean.toFixed(2)}</span><span>σ {st.sd.toFixed(2)}</span>
              <span>Q1 {st.q1.toFixed(1)} · Q3 {st.q3.toFixed(1)}</span><span>fence [{st.lo.toFixed(1)}, {st.hi.toFixed(1)}]</span>
            </div>
          </section>
        )}

        {isOut !== null && (
          <section className="panel text-center space-y-4">
            {guess === null ? (
              <>
                <p className="pixel text-sm">YOUR CALL:</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => play(true)} className="btn btn-danger">🚨 OUTLIER</button>
                  <button onClick={() => play(false)} className="btn btn-safe">✅ NORMAL</button>
                </div>
              </>
            ) : (
              <div className="pop space-y-2">
                <p className={`pixel text-2xl ${guess === isOut ? "text-success" : "text-destructive"}`}>
                  {guess === isOut ? "CORRECT! +1" : "MISSED!"}
                </p>
                <p>{t} is <b>{isOut ? "an OUTLIER" : "NOT an outlier"}</b> — z-score {z.toFixed(2)}
                  {method === "iqr" ? `, fences [${st!.lo.toFixed(1)}, ${st!.hi.toFixed(1)}]` : ", threshold |z| > 2"}</p>
                <button onClick={nextRound} className="btn btn-on">NEXT ROUND →</button>
              </div>
            )}
          </section>
        )}
        {!st && <p className="text-center text-destructive">Enter at least 4 numbers.</p>}
        {st && t === null && <p className="text-center text-muted-foreground">Type a target number or hit NEW ROUND to play.</p>}
      </div>
    </main>
  );
}
