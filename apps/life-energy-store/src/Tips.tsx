import { useState } from "react";
import { Tip, TipKind, tips } from "./tips";

const KINDS: Array<"Todas" | TipKind> = ["Todas", "Receitas", "Suplementos", "Rotina"];

/** Dicas rápidas: receitas, suplementos e rotina. */
export default function Tips({ onSearch }: { onSearch: (term: string) => void }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("Todas");
  const [open, setOpen] = useState<Tip | null>(null);
  const list = tips.filter((t) => kind === "Todas" || t.kind === kind);

  return (
    <section aria-labelledby="dicas">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 id="dicas" className="title text-3xl">Dicas da Life</h2>
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => <button key={k} onClick={() => setKind(k)} className={`chip ${kind === k ? "chip-on" : ""}`}>{k}</button>)}
        </div>
      </div>

      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1">
        {list.map((t) => (
          <button key={t.id} onClick={() => setOpen(t)} className="cut-sm w-64 shrink-0 snap-start border border-steel bg-plate p-4 text-left transition hover:border-brand">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand">{t.kind}</span>
            <span className="title mt-1 block text-xl">{t.title}</span>
            <span className="mt-2 block text-sm text-neutral-400">{t.summary}</span>
            <span className="mt-3 block text-sm font-bold text-brand">Ler dica →</span>
          </button>
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
