import { useMemo, useState } from "react";
import type { Order } from "../types";
import { StatusBadge } from "./primitives";
import { PrazoBadge } from "./PrazoBadge";
import { useBrand } from "../brand/BrandProvider";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function CalendarView({ orders, onSelect }: { orders: Order[]; onSelect: (order: Order) => void }) {
  const brand = useBrand();
  const ultimoStatus = brand.statusFlow[brand.statusFlow.length - 1];
  const [visao, setVisao] = useState<"mes" | "semana">("mes");
  const [cursor, setCursor] = useState(() => new Date());
  const today = useMemo(() => new Date(), []);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const proximos7Dias = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const limite = new Date(hoje);
    limite.setDate(limite.getDate() + 7);
    return orders
      .filter((o) => o.status !== ultimoStatus)
      .filter((o) => {
        const prazo = new Date(o.prazo);
        return prazo >= hoje && prazo <= limite;
      })
      .sort((a, b) => new Date(a.prazo).getTime() - new Date(b.prazo).getTime());
  }, [orders, ultimoStatus]);

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-surface)" }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-lg border p-0.5 text-sm" style={{ borderColor: "var(--brand-border)" }}>
          <button
            onClick={() => setVisao("mes")}
            className="rounded-md px-3 py-1 font-medium"
            style={{
              backgroundColor: visao === "mes" ? "var(--brand-primary)" : "transparent",
              color: visao === "mes" ? "var(--brand-primary-text)" : "var(--brand-text-secondary)",
            }}
          >
            Mês
          </button>
          <button
            onClick={() => setVisao("semana")}
            className="rounded-md px-3 py-1 font-medium"
            style={{
              backgroundColor: visao === "semana" ? "var(--brand-primary)" : "transparent",
              color: visao === "semana" ? "var(--brand-primary-text)" : "var(--brand-text-secondary)",
            }}
          >
            Próximos 7 dias
          </button>
        </div>

        {visao === "mes" && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCursor(new Date(year, month - 1, 1))}
              className="rounded-lg border px-3 py-1 text-sm"
              style={{ borderColor: "var(--brand-border)" }}
            >
              ← Anterior
            </button>
            <h3 className="font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
              {MONTHS[month]} de {year}
            </h3>
            <button
              onClick={() => setCursor(new Date(year, month + 1, 1))}
              className="rounded-lg border px-3 py-1 text-sm"
              style={{ borderColor: "var(--brand-border)" }}
            >
              Próximo →
            </button>
          </div>
        )}
      </div>

      {visao === "semana" ? (
        proximos7Dias.length === 0 ? (
          <p className="py-10 text-center text-sm" style={{ color: "var(--brand-text-secondary)" }}>
            Nenhum trabalho com prazo nos próximos 7 dias.
          </p>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--brand-border)" }}>
            {proximos7Dias.map((order) => (
              <li key={order.id}>
                <button
                  onClick={() => onSelect(order)}
                  className="flex w-full flex-col gap-2 py-3 text-left sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: "var(--brand-primary)", fontFamily: "var(--brand-font-mono)" }}>
                        {order.numero}
                      </span>
                      <span className="truncate text-sm font-medium" style={{ color: "var(--brand-text)" }}>
                        {order.paciente}
                      </span>
                    </div>
                    <div className="truncate text-xs" style={{ color: "var(--brand-text-secondary)" }}>
                      {order.servico}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PrazoBadge order={order} />
                    <StatusBadge status={order.status} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold" style={{ color: "var(--brand-text-secondary)" }}>
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <div key={i} />;
              const dayOrders = orders.filter((o) => isSameDay(new Date(o.prazo), date));
              return (
                <div
                  key={i}
                  className="min-h-[76px] rounded-lg border p-1 text-left"
                  style={{
                    borderColor: isSameDay(date, today) ? "var(--brand-primary)" : "var(--brand-border)",
                  }}
                >
                  <span className="text-xs font-medium" style={{ color: "var(--brand-text-secondary)" }}>{date.getDate()}</span>
                  <div className="mt-1 space-y-1">
                    {dayOrders.slice(0, 3).map((order) => {
                      const atrasado = order.status !== ultimoStatus && date < today && !isSameDay(date, today);
                      const vars = atrasado
                        ? { bg: "var(--brand-status-erro-bg)", text: "var(--brand-status-erro-text)" }
                        : { bg: "var(--brand-status-neutro-bg)", text: "var(--brand-status-neutro-text)" };
                      return (
                        <button
                          key={order.id}
                          onClick={() => onSelect(order)}
                          className="block w-full truncate rounded px-1 py-0.5 text-left text-[10px] font-medium"
                          style={{ backgroundColor: vars.bg, color: vars.text }}
                          title={`${order.numero} · ${order.paciente}`}
                        >
                          {order.numero}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs" style={{ color: "var(--brand-text-secondary)" }}>
            <Legend color="var(--brand-status-erro-bg)" label="Atrasada" />
            <Legend color="var(--brand-status-neutro-bg)" label="No prazo" />
          </div>
        </>
      )}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-3 w-3 rounded" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

export { StatusBadge };
