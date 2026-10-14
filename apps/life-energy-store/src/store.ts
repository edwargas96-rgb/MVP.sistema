import { useEffect, useState } from "react";
import { defaultSettings } from "./brand";
import { seedProducts } from "./seed";
import type { CartLine, Order, Product, Settings } from "./types";

const NS = "life-energy-store:";

/** useState persistido em localStorage (sem backend nesta fase do MVP). */
function usePersisted<T>(key: string, initial: T, revive: (stored: T) => T = (v) => v) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(NS + key);
      return raw ? revive(JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value));
    } catch {
      /* armazenamento indisponível: segue só em memória */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

export const useProducts = () => usePersisted<Product[]>("products-v2", seedProducts);
export const useSettings = () => usePersisted<Settings>("settings", defaultSettings, (s) => ({ ...defaultSettings, ...s }));
export const useCart = () => usePersisted<CartLine[]>("cart", []);
export const useOrders = () => usePersisted<Order[]>("orders", []);

/** Relógio que atualiza a cada `ms` (cronômetros das promoções). */
export function useNow(ms = 1000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Promoção por preço, ainda dentro do prazo. */
export const isPromo = (p: Product, now = Date.now()) =>
  p.promoPrice != null && p.promoPrice > 0 && p.promoPrice < p.price && (!p.promoEndsAt || new Date(p.promoEndsAt).getTime() > now);
export const isHighlight = (p: Product, now = Date.now()) => isPromo(p, now) || !!p.badge;
export const finalPrice = (p: Product, now = Date.now()) => (isPromo(p, now) ? (p.promoPrice as number) : p.price);

export function remaining(iso: string, now: number) {
  const ms = Math.max(0, new Date(iso).getTime() - now);
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const hh = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${d > 0 ? `${d}d ` : ""}${hh}:${mm}:${ss}`;
}

export interface PricedLine {
  line: CartLine;
  product: Product;
  unit: number;
  total: number;
}

/** Totais do pedido, com desconto do kit montado. */
export function priceOrder(lines: CartLine[], products: Product[], settings: Settings, now = Date.now()) {
  const rows: PricedLine[] = lines.flatMap((line) => {
    const product = products.find((p) => p.id === line.productId && p.active);
    if (!product) return [];
    const unit = finalPrice(product, now);
    return [{ line, product, unit, total: unit * line.qty }];
  });
  const sum = (r: PricedLine[]) => r.reduce((s, x) => s + x.total, 0);
  const kitRows = rows.filter((r) => r.line.kit);
  const kitItems = kitRows.reduce((s, r) => s + r.line.qty, 0);
  const tiers = [...settings.kitTiers].sort((a, b) => a.items - b.items);
  const kitPercent = tiers.reduce((best, t) => (kitItems >= t.items ? t.percent : best), 0);
  const kitDiscount = Math.round(sum(kitRows) * kitPercent) / 100;
  const subtotal = sum(rows);
  return { rows, kitItems, kitPercent, kitDiscount, subtotal, total: subtotal - kitDiscount };
}

export function nextOrderNumber(orders: Order[]) {
  const d = new Date();
  const day = `${String(d.getDate()).padStart(2, "0")}${String(d.getMonth() + 1).padStart(2, "0")}`;
  const todays = orders.filter((o) => o.number.startsWith(`LE-${day}`)).length;
  return `LE-${day}-${String(todays + 1).padStart(3, "0")}`;
}
