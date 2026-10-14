import { useEffect, useState } from "react";
import { Countdown } from "./ProductCard";
import { brl, finalPrice, isPromo } from "./store";
import type { Product } from "./types";

/** Faixa de círculos no estilo stories, com as promoções ativas. */
export function StoriesRow({ items, onOpen }: { items: Product[]; onOpen: (i: number) => void }) {
  if (!items.length) return null;
  return (
    <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-1" role="list" aria-label="Promoções em destaque">
      {items.map((p, i) => (
        <button key={p.id} role="listitem" onClick={() => onOpen(i)} className="flex w-[72px] shrink-0 flex-col items-center gap-1.5">
          <span className="ring-story rounded-full p-[3px]">
            <span className="block h-16 w-16 overflow-hidden rounded-full border-2 border-ink bg-plate">
              {p.imageUrl ? <img src={p.imageUrl} alt="" className="h-full w-full object-cover object-top" /> : <span className="flex h-full items-center justify-center text-2xl">⚡</span>}
            </span>
          </span>
          <span className="line-clamp-2 text-center text-[11px] font-medium leading-tight text-neutral-300">{p.name.replace(/\s*\(exemplo\)/, "")}</span>
        </button>
      ))}
    </div>
  );
}

const DURATION = 6000;

export function StoryViewer({ items, start, now, onAdd, onClose }: { items: Product[]; start: number; now: number; onAdd: (id: string) => void; onClose: () => void }) {
  const [i, setI] = useState(start);
  const next = () => (i + 1 < items.length ? setI(i + 1) : onClose());
  const prev = () => setI(Math.max(0, i - 1));

  useEffect(() => {
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => (e.key === "Escape" ? onClose() : e.key === "ArrowRight" ? next() : e.key === "ArrowLeft" ? prev() : null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  const p = items[i];
  const promo = isPromo(p, now);
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black" role="dialog" aria-label={`Promoção: ${p.name}`}>
      <div className="relative flex h-full w-full max-w-md flex-col bg-ink">
        <div className="absolute inset-x-0 top-0 z-10 flex gap-1 p-3">
          {items.map((_, n) => (
            <div key={n} className="h-[3px] flex-1 overflow-hidden rounded bg-white/25">
              <div key={n === i ? `a${i}` : n} className={`h-full origin-left bg-brand ${n < i ? "" : n === i ? "animate-fill" : "scale-x-0"}`} />
            </div>
          ))}
        </div>
        <button onClick={onClose} aria-label="Fechar" className="absolute right-3 top-7 z-10 rounded-full bg-black/60 px-3 py-1 text-lg">✕</button>
        <div className="flex-1 overflow-hidden bg-steel/30">
          {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="h-full w-full object-contain" /> : <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-brand-soft to-ink p-8 text-center"><img src="./brand/logo.png" alt="" className="h-24 w-24 rounded-xl" />{p.badge && <span className="title bg-alert px-3 py-1.5 text-3xl text-white">{p.badge}</span>}</div>}
        </div>
        <button aria-label="Anterior" className="absolute inset-y-16 left-0 w-1/3" onClick={prev} />
        <button aria-label="Próximo" className="absolute inset-y-16 right-0 w-1/3" onClick={next} />
        <div className="relative space-y-2 border-t border-steel bg-plate p-4">
          <h2 className="title text-2xl">{p.name}</h2>
          {promo && p.promoEndsAt && <Countdown iso={p.promoEndsAt} now={now} className="text-sm text-alert" />}
          <div className="flex items-baseline gap-2">
            <span className="title text-4xl text-brand">{brl(finalPrice(p, now))}</span>
            {promo && <span className="font-mono text-sm text-neutral-500 line-through">{brl(p.price)}</span>}
          </div>
          <button className="btn-primary w-full" onClick={() => { onAdd(p.id); onClose(); }}>Adicionar ao pedido</button>
        </div>
      </div>
    </div>
  );
}
