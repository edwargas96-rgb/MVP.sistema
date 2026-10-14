import { useState } from "react";
import { brl, finalPrice } from "./store";
import type { CartLine, Product, Settings } from "./types";

interface Props {
  products: Product[];
  settings: Settings;
  now: number;
  initial: CartLine[];
  onConfirm: (lines: CartLine[]) => void;
  onClose: () => void;
}

/** "Monte seu kit": quanto mais itens, maior o desconto, calculado na hora. */
export default function KitBuilder({ products, settings, now, initial, onConfirm, onClose }: Props) {
  const [qty, setQty] = useState<Record<string, number>>(() => Object.fromEntries(initial.filter((l) => l.kit).map((l) => [l.productId, l.qty])));
  const tiers = [...settings.kitTiers].sort((a, b) => a.items - b.items);
  const items = Object.values(qty).reduce((s, n) => s + n, 0);
  const subtotal = products.reduce((s, p) => s + (qty[p.id] ?? 0) * finalPrice(p, now), 0);
  const tier = tiers.reduce<(typeof tiers)[number] | null>((b, t) => (items >= t.items ? t : b), null);
  const nextTier = tiers.find((t) => t.items > items);
  const discount = tier ? Math.round(subtotal * tier.percent) / 100 : 0;
  const set = (id: string, n: number) => setQty((q) => ({ ...q, [id]: Math.max(0, n) }));

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/70 sm:items-center" onClick={onClose}>
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-2xl border border-steel bg-ink sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="title text-2xl">Monte seu kit</h2>
          <button onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="border-b bg-brand-soft p-4">
          <div className="mb-2 flex gap-2">
            {tiers.map((t) => (
              <span key={t.items} className={`flex-1 rounded border px-2 py-1.5 text-center font-mono text-xs font-bold ${items >= t.items ? "border-brand bg-brand text-black" : "border-steel text-neutral-400"}`}>
                {t.items}+ itens · {t.percent}%
              </span>
            ))}
          </div>
          <p className="text-sm text-neutral-300">
            {nextTier ? `Adicione mais ${nextTier.items - items} ${nextTier.items - items === 1 ? "item" : "itens"} para ${nextTier.percent}% de desconto.` : tier ? "Desconto máximo aplicado." : "Escolha seus produtos."}
          </p>
        </div>

        <div className="flex-1 divide-y divide-steel overflow-y-auto">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-steel/40">{p.imageUrl && <img src={p.imageUrl} alt="" className="h-full w-full object-cover object-top" />}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold">{p.name}</div>
                <div className="font-mono text-xs text-brand">{brl(finalPrice(p, now))}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost !px-2.5 !py-1" onClick={() => set(p.id, (qty[p.id] ?? 0) - 1)} aria-label={`Remover ${p.name}`}>−</button>
                <span className="w-5 text-center font-mono">{qty[p.id] ?? 0}</span>
                <button className="btn-ghost !px-2.5 !py-1" onClick={() => set(p.id, (qty[p.id] ?? 0) + 1)} aria-label={`Adicionar ${p.name}`}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-1 border-t p-4">
          <div className="flex justify-between text-sm text-neutral-400"><span>Subtotal</span><span className="font-mono">{brl(subtotal)}</span></div>
          {discount > 0 && <div className="flex justify-between text-sm text-brand"><span>Desconto do kit ({tier!.percent}%)</span><span className="font-mono">−{brl(discount)}</span></div>}
          <div className="flex justify-between"><span className="title text-xl">Total do kit</span><span className="title text-2xl text-brand">{brl(subtotal - discount)}</span></div>
          <button
            className="btn-primary mt-2 w-full"
            disabled={items === 0}
            onClick={() => { onConfirm(Object.entries(qty).filter(([, n]) => n > 0).map(([productId, n]) => ({ productId, qty: n, kit: true }))); }}
          >
            Adicionar kit ao pedido
          </button>
        </div>
      </div>
    </div>
  );
}
