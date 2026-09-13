import type { OrderEvent } from "../types";
import { StatusBadge } from "./primitives";

export function Timeline({ eventos }: { eventos: OrderEvent[] }) {
  const ordenados = [...eventos].sort(
    (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
  );
  return (
    <ol className="space-y-4">
      {ordenados.map((evento) => (
        <li key={evento.id} className="flex gap-3">
          <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--brand-primary)" }} />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={evento.status} />
              <span className="text-xs" style={{ color: "var(--brand-text-secondary)" }}>
                {formatDateTime(evento.criadoEm)} · {evento.autor}
              </span>
            </div>
            <p className="mt-1 text-sm" style={{ color: "var(--brand-text)" }}>
              {evento.comentario}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
