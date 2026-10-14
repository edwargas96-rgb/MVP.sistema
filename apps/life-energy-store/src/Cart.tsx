import { useState } from "react";
import { PAYMENTS } from "./brand";
import { brl, nextOrderNumber, priceOrder } from "./store";
import type { CartLine, Customer, Order, Product, Settings } from "./types";
import { buildOrderMessage, whatsappUrl } from "./whatsapp";

interface Props {
  products: Product[];
  settings: Settings;
  cart: CartLine[];
  setCart: (c: CartLine[]) => void;
  orders: Order[];
  setOrders: (o: Order[]) => void;
  now: number;
  onClose: () => void;
}

export default function Cart({ products, settings, cart, setCart, orders, setOrders, now, onClose }: Props) {
  const [c, setC] = useState<Customer>({ name: "", delivery: "retirada", address: "", payment: "pix", notes: "" });
  const priced = priceOrder(cart, products, settings, now);
  const same = (a: CartLine, b: CartLine) => a.productId === b.productId && !!a.kit === !!b.kit;
  const setQty = (l: CartLine, qty: number) => setCart(cart.flatMap((x) => (!same(x, l) ? [x] : qty > 0 ? [{ ...x, qty }] : [])));
  const valid = priced.rows.length > 0 && c.name.trim() && (c.delivery === "retirada" || c.address.trim());

  const send = () => {
    const number = nextOrderNumber(orders);
    const text = buildOrderMessage(settings, number, priced, c);
    setOrders([{ id: crypto.randomUUID(), number, createdAt: new Date().toISOString(), customerName: c.name.trim(), total: priced.total, text }, ...orders]);
    window.open(whatsappUrl(settings.whatsapp, text), "_blank");
  };

  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-black/70" onClick={onClose}>
      <aside className="flex h-full w-full max-w-md flex-col border-l border-steel bg-ink" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="title text-2xl">Seu pedido</h2>
          <button onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {priced.rows.length === 0 && <p className="text-neutral-400">Seu pedido está vazio. Escolha um produto ou monte seu kit.</p>}
          {priced.rows.map((r) => (
            <div key={r.product.id + (r.line.kit ? "k" : "")} className="flex items-center justify-between gap-2 text-sm">
              <div className="min-w-0">
                <div className="truncate font-bold">{r.product.name}</div>
                <div className="font-mono text-xs text-neutral-400">{brl(r.unit)}{r.line.kit && <span className="ml-2 text-brand">kit</span>}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost !px-2.5 !py-1" onClick={() => setQty(r.line, r.line.qty - 1)} aria-label="Diminuir">−</button>
                <span className="w-5 text-center font-mono">{r.line.qty}</span>
                <button className="btn-ghost !px-2.5 !py-1" onClick={() => setQty(r.line, r.line.qty + 1)} aria-label="Aumentar">+</button>
              </div>
            </div>
          ))}
          {priced.rows.length > 0 && (
            <div className="space-y-3 border-t pt-4">
              <div><label className="label">Seu nome</label><input className="input" value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Recebimento</label>
                  <select className="input" value={c.delivery} onChange={(e) => setC({ ...c, delivery: e.target.value as Customer["delivery"] })}>
                    <option value="retirada">Retirar na loja</option>
                    <option value="entrega">Entrega</option>
                  </select>
                </div>
                <div>
                  <label className="label">Pagamento</label>
                  <select className="input" value={c.payment} onChange={(e) => setC({ ...c, payment: e.target.value as Customer["payment"] })}>
                    {Object.entries(PAYMENTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
              </div>
              {c.delivery === "entrega" && <div><label className="label">Endereço</label><input className="input" value={c.address} onChange={(e) => setC({ ...c, address: e.target.value })} /></div>}
              <div><label className="label">Observações</label><textarea className="input" rows={2} value={c.notes} onChange={(e) => setC({ ...c, notes: e.target.value })} /></div>
            </div>
          )}
        </div>
        <div className="space-y-1 border-t p-4">
          {priced.kitDiscount > 0 && <div className="flex justify-between text-sm text-brand"><span>Desconto do kit ({priced.kitPercent}%)</span><span className="font-mono">−{brl(priced.kitDiscount)}</span></div>}
          <div className="flex justify-between"><span className="title text-xl">Total</span><span className="title text-3xl text-brand">{brl(priced.total)}</span></div>
          <button className="btn-primary w-full" disabled={!valid} onClick={send}>Enviar pedido pelo WhatsApp</button>
          <p className="text-center text-xs text-neutral-500">O pedido abre no WhatsApp da loja com um número de acompanhamento. O pagamento é combinado por lá.</p>
        </div>
      </aside>
    </div>
  );
}
