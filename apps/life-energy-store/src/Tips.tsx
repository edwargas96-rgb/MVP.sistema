import { useCallback, useEffect, useRef, useState } from "react";
import { Tip, TipKind, tips } from "./tips";

const KINDS: Array<"Todas" | TipKind> = ["Todas", "Receitas", "Suplementos", "Rotina"];

/** Dicas rápidas: receitas, suplementos e rotina. */
const INTERVAL = 6500; // tempo de leitura de cada dica
const PAUSE_AFTER_TOUCH = 12000;

export default function Tips({ onSearch }: { onSearch: (term: string) => void }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("Todas");
  const [open, setOpen] = useState<Tip | null>(null);
  const [active, setActive] = useState(0);
  const list = tips.filter((t) => kind === "Todas" || t.kind === kind);

  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<Array<HTMLButtonElement | null>>([]);
  const hover = useRef(false);
  const pausedUntil = useRef(0);
  const settle = useRef<ReturnType<typeof setTimeout>>();

  const goTo = useCallback((i: number) => {
    const t = track.current, c = cards.current[i];
    if (!t || !c) return;
    // Rola só o carrossel (não a página), deixando o card no centro.
    t.scrollTo({ left: c.offsetLeft - (t.clientWidth - c.clientWidth) / 2, behavior: "smooth" });
  }, []);

  // Ao trocar o filtro, volta para a primeira dica.
  useEffect(() => {
    setActive(0);
    track.current?.scrollTo({ left: 0 });
  }, [kind]);

  // Passa uma dica por vez, devagar. Pausa com mouse em cima, toque recente, janela aberta ou "reduzir movimento".
  useEffect(() => {
    if (open || list.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (hover.current || Date.now() < pausedUntil.current || document.hidden) return;
      setActive((i) => {
        const n = (i + 1) % list.length;
        goTo(n);
        return n;
      });
    }, INTERVAL);
    return () => clearInterval(id);
  }, [open, list.length, goTo]);

  // Se a pessoa arrastar o carrossel, destaca o card que ficou no centro.
  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const t = track.current;
      if (!t) return;
      const mid = t.scrollLeft + t.clientWidth / 2;
      let best = 0, dist = Infinity;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid);
        if (d < dist) { dist = d; best = i; }
      });
      setActive(best);
    }, 140);
  };
  const touched = () => { pausedUntil.current = Date.now() + PAUSE_AFTER_TOUCH; };

  return (
    <section aria-labelledby="dicas">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 id="dicas" className="title text-3xl">Dicas da Life</h2>
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => <button key={k} onClick={() => setKind(k)} className={`chip ${kind === k ? "chip-on" : ""}`}>{k}</button>)}
        </div>
      </div>

      <div
        ref={track}
        onScroll={onScroll}
        onMouseEnter={() => (hover.current = true)}
        onMouseLeave={() => (hover.current = false)}
        onPointerDown={touched}
        onWheel={touched}
        className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-4 py-2"
        aria-roledescription="carrossel"
        aria-label="Dicas da Life"
      >
        <span aria-hidden className="w-[3%] shrink-0 sm:w-[calc(50%-10.5rem)]" />
        {list.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (cards.current[i] = el)}
            onClick={() => { touched(); setOpen(t); }}
            onFocus={touched}
            aria-label={`${t.kind}: ${t.title}. Ler dica`}
            className={`cut-sm w-[88%] shrink-0 snap-center border p-4 text-left transition-all duration-700 sm:w-80 ${
              i === active ? "scale-100 border-brand bg-brand-soft opacity-100" : "scale-[0.94] border-steel bg-plate opacity-50"
            }`}
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand">{t.kind}</span>
            <span className="title mt-1 block text-2xl">{t.title}</span>
            <span className="mt-2 block text-sm text-neutral-300">{t.summary}</span>
            <span className="mt-3 block text-sm font-bold text-brand">Ler dica →</span>
          </button>
        ))}
        <span aria-hidden className="w-[3%] shrink-0 sm:w-[calc(50%-10.5rem)]" />
      </div>

      <div className="mt-2 flex items-center justify-center gap-2" role="tablist" aria-label="Escolher dica">
        {list.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={i === active}
            aria-label={`Dica ${i + 1}: ${t.title}`}
            onClick={() => { touched(); setActive(i); goTo(i); }}
            className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-brand" : "w-2 bg-steel"}`}
          />
        ))}
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
