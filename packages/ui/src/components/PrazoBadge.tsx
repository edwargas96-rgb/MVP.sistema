import type { Order } from "../types";

export type PrazoTipo = "atrasada" | "proxima" | "no-prazo" | "concluida";

export function prazoInfo(order: Order): { tipo: PrazoTipo; texto: string } {
  if (order.status === "Enviada/Entregue") {
    const entrega = new Date(order.prazo).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    return { tipo: "concluida", texto: `Entregue ${entrega}` };
  }
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const prazo = new Date(order.prazo);
  prazo.setHours(0, 0, 0, 0);
  const dias = Math.round((prazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  if (dias < 0) return { tipo: "atrasada", texto: `${Math.abs(dias)} d em atraso` };
  if (dias === 0) return { tipo: "proxima", texto: "Entrega hoje" };
  if (dias <= 2) return { tipo: "proxima", texto: `${dias} d restantes` };
  return { tipo: "no-prazo", texto: `${dias} d restantes` };
}

const TONE_CLASSES: Record<PrazoTipo, string> = {
  atrasada: "bg-red-50 text-red-700 border-red-200",
  proxima: "bg-amber-50 text-amber-800 border-amber-200",
  concluida: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "no-prazo": "bg-slate-50 text-slate-600 border-slate-200",
};

export function PrazoBadge({ order }: { order: Order }) {
  const { tipo, texto } = prazoInfo(order);
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs ${TONE_CLASSES[tipo]}`}
      style={{ fontFamily: "var(--brand-font-mono)" }}
    >
      {texto}
    </span>
  );
}
