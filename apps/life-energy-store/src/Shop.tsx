import { useMemo, useState } from "react";
import { brl, finalPrice, isPromo } from "./store";
import type { CartLine, Customer, Product, Settings } from "./types";
import { buildOrderMessage, whatsappUrl } from "./whatsapp";

interface Props {
  products: Product[];
  settings: Settings;
  cart: CartLine[];
  setCart: (c: CartLine[]) => void;
}

export default function Shop({ products, settings, cart, setCart }: Props) {
  const [category, setCategory] = useState("Todas");
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const active = products.filter((p) => p.active);
  const categories = useMemo(() => ["Todas", ...Array.from(new Set(active.map((p) => p.category)))], [active]);
  const promos = active.filter(isPromo);
  const visible = active.filter(
    (p) =>
      (category === "Todas" || p.category === category) &&
      (!onlyPromo || isPromo(p)) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );

  const count = cart.reduce((s, l) => s + l.qty, 0);
  const add = (id: string) => {
    const l = cart.find((x) => x.productId === id);
    setCart(l ? cart.map((x) => (x.productId === id ? { ...x, qty: x.qty + 1 } : x)) : [...cart, { productId: id, qty: 1 }]);
  };

  return (
    <div className="min-h-screen">
      {settings.banner && <div className="bg-ink px-4 py-2 text-center text-sm text-white">{settings.banner}</div>}
      <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <h1 className="font-display text-xl font-extrabold text-brand">{settings.storeName}</h1>
          <button className="btn-primary" onClick={() => setOpen(true)}>
            🛒 Pedido ({count})
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {promos.length > 0 && (
          <section className="mb-6 rounded-2xl bg-brand-soft p-4">
            <h2 className="font-display text-lg font-bold">🔥 Promoções ({promos.length})</h2>
            <p className="text-sm text-neutral-600">Ofertas por tempo limitado.</p>
            <button className="mt-2 text-sm font-semibold text-brand-dark underline" onClick={() => { setOnlyPromo(true); setCategory("Todas"); }}>
              Ver só promoções
            </button>
          </section>
        )}

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <input className="input sm:max-w-xs" placeholder="Buscar produto…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`rounded-full border px-3 py-1 text-sm ${category === c ? "border-brand bg-brand text-white" : "bg-white"}`}>
                {c}
              </button>
            ))}
            <button onClick={() => setOnlyPromo(!onlyPromo)} className={`rounded-full border px-3 py-1 text-sm ${onlyPromo ? "border-brand bg-brand text-white" : "bg-white"}`}>
              🔥 Promoções
            </button>
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="py-12 text-center text-neutral-500">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((p) => (
              <article key={p.id} className="flex flex-col overflow-hidden rounded-xl border bg-white">
                <div className="relative aspect-square bg-neutral-100">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl">📦</div>
                  )}
                  {isPromo(p) && <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">PROMO</span>}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <h3 className="text-sm font-semibold leading-tight">{p.name}</h3>
                  <div className="mt-auto pt-2">
                    {isPromo(p) && <span className="mr-1 text-xs text-neutral-400 line-through">{brl(p.price)}</span>}
                    <span className="font-display text-lg font-extrabold text-brand-dark">{brl(finalPrice(p))}</span>
                  </div>
                  <button className="btn-primary mt-2" onClick={() => add(p.id)}>Adicionar</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-xs text-neutral-400">
        © {settings.storeName} · <a href="#/admin" className="underline">Área do dono</a>
      </footer>

      {open && <CartDrawer products={products} settings={settings} cart={cart} setCart={setCart} onClose={() => setOpen(false)} />}
    </div>
  );
}

function CartDrawer({ products, settings, cart, setCart, onClose }: Props & { onClose: () => void }) {
  const [c, setC] = useState<Customer>({ name: "", delivery: "retirada", address: "", notes: "" });
  const lines = cart.filter((l) => products.some((p) => p.id === l.productId && p.active));
  const total = lines.reduce((s, l) => s + finalPrice(products.find((p) => p.id === l.productId)!) * l.qty, 0);
  const setQty = (id: string, qty: number) => setCart(cart.flatMap((l) => (l.productId !== id ? [l] : qty > 0 ? [{ ...l, qty }] : [])));
  const valid = lines.length > 0 && c.name.trim() && (c.delivery === "retirada" || c.address.trim());

  const send = () => {
    window.open(whatsappUrl(settings.whatsapp, buildOrderMessage(settings, lines, products, c)), "_blank");
  };

  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-black/40" onClick={onClose}>
      <aside className="flex h-full w-full max-w-md flex-col bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-display text-lg font-bold">Seu pedido</h2>
          <button onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {lines.length === 0 && <p className="text-neutral-500">Seu pedido está vazio.</p>}
          {lines.map((l) => {
            const p = products.find((x) => x.id === l.productId)!;
            return (
              <div key={l.productId} className="flex items-center justify-between gap-2 text-sm">
                <div className="min-w-0">
                  <div className="truncate font-medium">{p.name}</div>
                  <div className="text-neutral-500">{brl(finalPrice(p))}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-ghost !px-2.5 !py-1" onClick={() => setQty(l.productId, l.qty - 1)}>−</button>
                  <span className="w-5 text-center">{l.qty}</span>
                  <button className="btn-ghost !px-2.5 !py-1" onClick={() => setQty(l.productId, l.qty + 1)}>+</button>
                </div>
              </div>
            );
          })}
          {lines.length > 0 && (
            <div className="space-y-3 border-t pt-4">
              <div><label className="label">Seu nome</label><input className="input" value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} /></div>
              <div>
                <label className="label">Recebimento</label>
                <select className="input" value={c.delivery} onChange={(e) => setC({ ...c, delivery: e.target.value as Customer["delivery"] })}>
                  <option value="retirada">Retirar na loja</option>
                  <option value="entrega">Entrega</option>
                </select>
              </div>
              {c.delivery === "entrega" && (
                <div><label className="label">Endereço</label><input className="input" value={c.address} onChange={(e) => setC({ ...c, address: e.target.value })} /></div>
              )}
              <div><label className="label">Observações</label><textarea className="input" rows={2} value={c.notes} onChange={(e) => setC({ ...c, notes: e.target.value })} /></div>
            </div>
          )}
        </div>
        <div className="space-y-2 border-t p-4">
          <div className="flex justify-between font-display text-lg font-bold"><span>Total</span><span>{brl(total)}</span></div>
          <button className="btn-primary w-full" disabled={!valid} onClick={send}>Enviar pedido pelo WhatsApp</button>
          <p className="text-center text-xs text-neutral-400">O pedido abre no WhatsApp da loja; o pagamento é combinado por lá.</p>
        </div>
      </aside>
    </div>
  );
}
