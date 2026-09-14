import type { BrandConfig } from "../brand/BrandConfig";
import { useBrand } from "../brand/BrandProvider";
import type { Order } from "../types";

export type PrazoTipo = "atrasada" | "proxima" | "no-prazo" | "concluida";

export function prazoInfo(order: Order, statusFlow: string[]): { tipo: PrazoTipo; texto: string } {
  const isFinal = order.status === statusFlow[statusFlow.length - 1];
  if (isFinal) {
    const entrega = new Date(order.prazo).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    return { tipo: "concluida", texto: `Concluído ${entrega}` };
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

function toneVars(brand: BrandConfig, tipo: PrazoTipo) {
  switch (tipo) {
    case "atrasada":
      return { bg: brand.cores.statusErroBg, text: brand.cores.statusErroTexto };
    case "proxima":
      return { bg: brand.cores.statusAlertaBg, text: brand.cores.statusAlertaTexto };
    case "concluida":
      return { bg: brand.cores.statusSucessoBg, text: brand.cores.statusSucessoTexto };
    default:
      return { bg: brand.cores.statusNeutroBg, text: brand.cores.statusNeutroTexto };
  }
}

export function PrazoBadge({ order }: { order: Order }) {
  const brand = useBrand();
  const { tipo, texto } = prazoInfo(order, brand.statusFlow);
  const tone = toneVars(brand, tipo);
  return (
    <span
      className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs"
      style={{
        fontFamily: "var(--brand-font-mono)",
        backgroundColor: tone.bg,
        color: tone.text,
        borderColor: `color-mix(in srgb, ${tone.text} 30%, transparent)`,
      }}
    >
      {texto}
    </span>
  );
}
