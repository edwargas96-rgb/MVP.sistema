import { useMemo, useState } from "react";
import type { Order } from "../types";
import { StatusBadge } from "./primitives";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function dayTone(order: Order, today: Date): "atrasado" | "proximo" | "normal" {
  if (order.status === "Entregue") return "normal";
  const prazo = new Date(order.prazo);
  const diffDays = Math.ceil((prazo.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "atrasado";
  if (diffDays <= 2) return "proximo";
  return "normal";
}

export function CalendarView({ orders, onSelect }: { orders: Order[]; onSelect: (order: Order) => void }) {
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

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-surface)" }}>
      <div className="mb-4 flex items-center justify-between">
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
                  const tone = dayTone(order, today);
                  const bg = tone === "atrasado" ? "bg-red-100 text-red-700" : tone === "proximo" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700";
                  return (
                    <button
                      key={order.id}
                      onClick={() => onSelect(order)}
                      className={`block w-full truncate rounded px-1 py-0.5 text-left text-[10px] font-medium ${bg}`}
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
        <Legend color="bg-red-100" label="Atrasada" />
        <Legend color="bg-amber-100" label="Prazo próximo (≤ 2 dias)" />
        <Legend color="bg-slate-100" label="No prazo" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded ${color}`} />
      {label}
    </span>
  );
}

export { StatusBadge };
