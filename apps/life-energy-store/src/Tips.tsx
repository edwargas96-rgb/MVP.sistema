import { useCallback, useEffect, useRef, useState } from "react";
import { Tip, TipKind, tips } from "./tips";

const KINDS: Array<"Todas" | TipKind> = ["Todas", "Receitas", "Suplementos", "Rotina"];

/** Dicas rápidas: receitas, suplementos e rotina. */
const DWELL = 6000; // tempo com a dica destacada na esquerda
const MOVE_MS = 1100; // deslize lento até a próxima
const GAP = 12;
const PAUSE_AFTER_TOUCH = 12000;

/** Dicas em fila infinita: a da esquerda fica em destaque, depois a fila anda e a próxima assume. */
export default function Tips({ onSearch }: { onSearch: (term: string) => void }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("Todas");
  const [open, setOpen] = useState<Tip | null>(null);
  const list = tips.filter((t) => kind === "Todas" || t.kind === kind);
  const n = list.length;

  const [start, setStart] = useState(0); // índice da dica que está na esquerda
  const [moving, setMoving] = useState(false);
  const [shift, setShift] = useState(0);
  const cards = useRef<Array<HTMLButtonElement | null>>([]);
  const movingRef = useRef(false);
  const commit = useRef<ReturnType<typeof setTimeout>>();
  const hover = useRef(false);
  const pausedUntil = useRef(0);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; swiped: boolean } | null>(null);
  const swipedRecently = useRef(false);

  const touched = () => { pausedUntil.current = Date.now() + PAUSE_AFTER_TOUCH; };

  // Anda uma posição: desliza a fila e, ao final, passa a primeira para o fim (sem pulo visual).
  const advance = useCallback(() => {
    const first = cards.current[0];
    if (movingRef.current || n < 2 || !first) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStart((s) => (s + 1) % n); // troca direta, sem deslizar
      return;
    }
    movingRef.current = true;
    setShift(first.offsetWidth + GAP);
    setMoving(true);
    commit.current = setTimeout(() => {
      movingRef.current = false;
      setMoving(false);
      setShift(0);
      setStart((s) => (s + 1) % n);
    }, MOVE_MS);
  }, [n]);

  // Trocar o filtro reinicia a fila.
  useEffect(() => {
    clearTimeout(commit.current);
    movingRef.current = false;
    setMoving(false);
    setShift(0);
    setStart(0);
  }, [kind]);
  useEffect(() => () => clearTimeout(commit.current), []);

  // Rodando sozinho. Pausa com mouse em cima, toque recente, janela aberta, aba oculta ou "reduzir movimento".
  useEffect(() => {
    if (open || paused || n < 2) return;
    const t = setTimeout(() => {
      if (hover.current || Date.now() < pausedUntil.current || document.hidden) setTick((k) => k + 1);
      else advance();
    }, DWELL);
    return () => clearTimeout(t);
  }, [start, tick, open, paused, n, advance]);

  const jumpTo = (i: number) => {
    touched();
    clearTimeout(commit.current);
    movingRef.current = false;
    setMoving(false);
    setShift(0);
    setStart(((i % n) + n) % n);
  };

  const ordered = list.map((_, i) => list[(start + i) % n]);

  return (
    <section aria-labelledby="dicas">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 id="dicas" className="title text-3xl">Dicas da Life</h2>
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => <button key={k} onClick={() => setKind(k)} className={`chip ${kind === k ? "chip-on" : ""}`}>{k}</button>)}
        </div>
      </div>

      <div
        className="-mx-4 overflow-hidden py-2"
        style={{ touchAction: "pan-y" }}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") hover.current = true; }}
        onPointerLeave={() => (hover.current = false)}
        onPointerDown={(e) => { touched(); drag.current = { x: e.clientX, swiped: false }; }}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          if (!d) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 40) {
            d.swiped = true;
            swipedRecently.current = true;
            setTimeout(() => (swipedRecently.current = false), 50);
            if (dx < 0) advance(); else jumpTo(start - 1);
          }
        }}
        aria-roledescription="carrossel"
        aria-label="Dicas da Life"
      >
        <div
          className="flex px-4"
          style={{ gap: GAP, transform: `translateX(${-shift}px)`, transition: moving ? `transform ${MOVE_MS}ms cubic-bezier(.45,.05,.25,1)` : "none" }}
        >
          {ordered.map((t, i) => {
            const on = moving ? i === 1 : i === 0;
            return (
              <button
                key={t.id}
                ref={(el) => (cards.current[i] = el)}
                onClick={() => { if (swipedRecently.current) return; touched(); setOpen(t); }}
                onFocus={touched}
                aria-label={`${t.kind}: ${t.title}. Ler dica`}
                className={`cut-sm w-[88%] shrink-0 border p-4 text-left transition-all duration-700 sm:w-80 ${
                  on ? "scale-100 border-brand bg-brand-soft opacity-100" : "scale-[0.95] border-steel bg-plate opacity-50"
                }`}
                style={{ transformOrigin: "left center" }}
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand">{t.kind}</span>
                <span className="title mt-1 block text-2xl">{t.title}</span>
                <span className="mt-2 block text-sm text-neutral-300">{t.summary}</span>
                <span className="mt-3 block text-sm font-bold text-brand">Ler dica →</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
      <button type="button" onClick={() => setPaused((v) => !v)} aria-pressed={paused} className="rounded border border-steel px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-neutral-300 hover:border-brand">
        {paused ? "▶ Continuar" : "❚❚ Pausar"}
      </button>
      <div className="flex items-center gap-2" role="tablist" aria-label="Escolher dica">
        {list.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={i === start}
            aria-label={`Dica ${i + 1}: ${t.title}`}
            onClick={() => jumpTo(i)}
            className={`h-2 rounded-full transition-all duration-500 ${i === start ? "w-6 bg-brand" : "w-2 bg-steel"}`}
          />
        ))}
      </div>
      </div>

      <p className="mt-2 text-xs text-neutral-500">Informações gerais, sem substituir a orientação de médico ou nutricionista.</p>

      {open && (
        <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/70 sm:items-center" onClick={() => setOpen(null)}>
          <article className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-steel bg-ink p-5 sm:rounded-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={open.title}>
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand">{open.kind}</span>
                <h3 className="title text-3xl">{open.title}</h3>
              </div>
              <button onClick={() => setOpen(null)} aria-label="Fechar">✕</button>
            </div>
            {open.kind === "Receitas" ? (
              <ol className="list-decimal space-y-2 pl-5 text-neutral-200">{open.body.map((b) => <li key={b}>{b}</li>)}</ol>
            ) : (
              <ul className="list-disc space-y-2 pl-5 text-neutral-200">{open.body.map((b) => <li key={b}>{b}</li>)}</ul>
            )}
            <p className="mt-4 text-xs text-neutral-500">Informações gerais, sem substituir a orientação de médico ou nutricionista.</p>
            {open.cta && (
              <button className="btn-primary mt-4 w-full" onClick={() => { onSearch(open.cta!.search); setOpen(null); }}>{open.cta.label}</button>
            )}
          </article>
        </div>
      )}
    </section>
  );
}
