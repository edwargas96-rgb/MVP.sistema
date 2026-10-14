import { brl, finalPrice, isPromo } from "./store";
import type { CartLine, Customer, Product, Settings } from "./types";

export function buildOrderMessage(settings: Settings, lines: CartLine[], products: Product[], c: Customer) {
  const rows = lines.flatMap((l) => {
    const p = products.find((x) => x.id === l.productId);
    if (!p) return [];
    const tag = isPromo(p) ? " (promo)" : "";
    return [`• ${l.qty}x ${p.name}${tag} — ${brl(finalPrice(p) * l.qty)}`];
  });
  const total = lines.reduce((s, l) => {
    const p = products.find((x) => x.id === l.productId);
    return p ? s + finalPrice(p) * l.qty : s;
  }, 0);
  return [
    `Olá! Quero fazer um pedido na ${settings.storeName}:`,
    "",
    ...rows,
    "",
    `*Total: ${brl(total)}*`,
    "",
    `Nome: ${c.name}`,
    c.delivery === "entrega" ? `Entrega: ${c.address}` : "Retirada na loja",
    c.notes ? `Obs.: ${c.notes}` : "",
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n")
    .trim();
}

export const whatsappUrl = (phone: string, text: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
