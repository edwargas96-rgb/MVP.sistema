import { PAYMENTS } from "./brand";
import { brl, priceOrder } from "./store";
import type { Customer, Settings } from "./types";

type Priced = ReturnType<typeof priceOrder>;

/** Mensagem organizada para o WhatsApp da loja, com número de pedido. */
export function buildOrderMessage(settings: Settings, number: string, priced: Priced, c: Customer) {
  const row = (r: Priced["rows"][number]) => `• ${r.line.qty}x ${r.product.name} — ${brl(r.total)}`;
  const normal = priced.rows.filter((r) => !r.line.kit);
  const kit = priced.rows.filter((r) => r.line.kit);
  const out: string[] = [`*Pedido ${number}* — ${settings.storeName}`, ""];
  if (normal.length) out.push("*Itens*", ...normal.map(row), "");
  if (kit.length) out.push(`*Kit montado${priced.kitPercent ? ` (-${priced.kitPercent}%)` : ""}*`, ...kit.map(row), "");
  if (priced.kitDiscount > 0) out.push(`Desconto do kit: -${brl(priced.kitDiscount)}`);
  out.push(`*Total: ${brl(priced.total)}*`, "");
  out.push(`*Cliente:* ${c.name}`);
  out.push(`*Recebimento:* ${c.delivery === "entrega" ? `Entrega — ${c.address}` : "Retirada na loja"}`);
  out.push(`*Pagamento:* ${PAYMENTS[c.payment]}`);
  if (c.notes.trim()) out.push(`*Obs.:* ${c.notes.trim()}`);
  return out.join("\n");
}

export const whatsappUrl = (phone: string, text: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
