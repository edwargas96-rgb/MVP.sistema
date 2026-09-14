import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { OrderStatus } from "../types";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants: Record<string, string> = {
    primary: "text-white",
    secondary: "border",
    ghost: "hover:bg-black/5",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  const style =
    variant === "primary"
      ? { backgroundColor: "var(--brand-primary)" }
      : variant === "secondary"
        ? { borderColor: "var(--brand-border)", color: "var(--brand-text)" }
        : undefined;
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      style={style}
      onMouseEnter={(e) => {
        if (variant === "primary") (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-primary-dark)";
      }}
      onMouseLeave={(e) => {
        if (variant === "primary") (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-primary)";
      }}
      {...props}
    />
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border shadow-sm ${className}`}
      style={{ backgroundColor: "var(--brand-surface)", borderColor: "var(--brand-border)" }}
    >
      {children}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${props.className ?? ""}`}
      style={{ borderColor: "var(--brand-border)", color: "var(--brand-text)" }}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${props.className ?? ""}`}
      style={{ borderColor: "var(--brand-border)", color: "var(--brand-text)" }}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 bg-white ${props.className ?? ""}`}
      style={{ borderColor: "var(--brand-border)", color: "var(--brand-text)" }}
    />
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand-text-secondary)" }}>
      {children}
    </label>
  );
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  "Recebida": "bg-slate-100 text-slate-700 border-slate-200",
  "Em análise": "bg-blue-50 text-blue-700 border-blue-200",
  "Em produção": "border-2",
  "Em prova": "bg-amber-50 text-amber-800 border-amber-200",
  "Pronta": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Enviada/Entregue": "bg-emerald-600 text-white border-emerald-600",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const isEmProducao = status === "Em produção";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${STATUS_STYLES[status]}`}
      style={isEmProducao ? { backgroundColor: "color-mix(in srgb, var(--brand-primary) 12%, transparent)", color: "var(--brand-primary)", borderColor: "color-mix(in srgb, var(--brand-primary) 30%, transparent)" } : undefined}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function UrgentBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-red-50 border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-700">
      Urgente
    </span>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center" style={{ borderColor: "var(--brand-border)" }}>
      <p className="text-base font-semibold" style={{ color: "var(--brand-text)" }}>{title}</p>
      <p className="max-w-sm text-sm" style={{ color: "var(--brand-text-secondary)" }}>{description}</p>
      {action}
    </div>
  );
}

export function LoadingState({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16">
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
        style={{ borderColor: "var(--brand-primary)", borderTopColor: "transparent" }}
      />
      <span className="text-sm" style={{ color: "var(--brand-text-secondary)" }}>{label}</span>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}

export function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number | string;
  tone?: "default" | "warning" | "danger" | "success";
}) {
  const toneColor =
    tone === "warning" ? "#B45309" : tone === "danger" ? "#B91C1C" : tone === "success" ? "#047857" : "var(--brand-text)";
  return (
    <Card className="p-4">
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand-text-secondary)" }}>
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold" style={{ color: toneColor, fontFamily: "var(--brand-font-mono)" }}>
        {value}
      </p>
    </Card>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
            {title}
          </h3>
          <button onClick={onClose} className="text-xl leading-none text-slate-400 hover:text-slate-600" aria-label="Fechar">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
