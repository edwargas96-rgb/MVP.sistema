import { brl, finalPrice, isPromo, remaining } from "./store";
import type { Product } from "./types";

export function Countdown({ iso, now, className = "" }: { iso: string; now: number; className?: string }) {
  return <span className={`font-mono font-bold tabular-nums ${className}`}>⏱ {remaining(iso, now)}</span>;
}

export default function ProductCard({ p, now, onAdd }: { p: Product; now: number; onAdd: () => void }) {
  const promo = isPromo(p, now);
  const label = p.badge || (promo ? "PROMO" : "");
  const low = p.unitsLeft != null && p.unitsLeft > 0 && p.unitsLeft <= 5;
  return (
    <article className="cut flex flex-col overflow-hidden border border-steel bg-plate">
      <div className="relative aspect-square bg-steel/40">
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.name} className="h-full w-full object-contain" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-6xl text-steel">⚡</div>
        )}
        {label && <span className="title absolute left-0 top-3 bg-alert px-2.5 py-1 text-sm text-white">{label}</span>}
        {low && <span className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-0.5 font-mono text-[11px] font-bold text-brand">restam {p.unitsLeft}</span>}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="text-sm font-bold leading-snug">{p.name}</h3>
        {promo && p.promoEndsAt && <Countdown iso={p.promoEndsAt} now={now} className="text-xs text-alert" />}
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="title text-3xl text-brand">{brl(finalPrice(p, now))}</span>
          {promo && <span className="font-mono text-xs text-neutral-500 line-through">{brl(p.price)}</span>}
        </div>
        <button className="btn-primary mt-2" onClick={onAdd}>Adicionar ao pedido</button>
      </div>
    </article>
  );
}
