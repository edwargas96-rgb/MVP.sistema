import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { OrderStatus } from "../types";
import { useBrand } from "../brand/BrandProvider";

/** Tom de status calculado pela posição do status no fluxo de produção da marca. */
export function statusTone(statusFlow: string[], status: OrderStatus): "neutro" | "info" | "alerta" | "sucesso" {
  const index = statusFlow.indexOf(status);
  const last = statusFlow.length - 1;
  if (index === -1) return "neutro";
  if (index === last) return "sucesso";
  if (index === 0) return "neutro";
  return index <= Math.ceil(last / 2) ? "info" : "alerta";
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants: Record<string, string> = {
    primary: "",
    secondary: "border",
    ghost: "hover:bg-black/5",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  const style =
    variant === "primary"
      ? { backgroundColor: "var(--brand-primary)", color: "var(--brand-primary-text)" }
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
      style={{ borderColor: "var(--brand-border)", color: "var(--brand-text)", backgroundColor: "var(--brand-input-bg)" }}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${props.className ?? ""}`}
      style={{ borderColor: "var(--brand-border)", color: "var(--brand-text)", backgroundColor: "var(--brand-input-bg)" }}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${props.className ?? ""}`}
      style={{ borderColor: "var(--brand-border)", color: "var(--brand-text)", backgroundColor: "var(--brand-input-bg)" }}
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

const TONE_VARS: Record<ReturnType<typeof statusTone>, { bg: string; text: string }> = {
  neutro: { bg: "var(--brand-status-neutro-bg)", text: "var(--brand-status-neutro-text)" },
  info: { bg: "var(--brand-status-info-bg)", text: "var(--brand-status-info-text)" },
  alerta: { bg: "var(--brand-status-alerta-bg)", text: "var(--brand-status-alerta-text)" },
  sucesso: { bg: "var(--brand-status-sucesso-bg)", text: "var(--brand-status-sucesso-text)" },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const brand = useBrand();
  const tone = TONE_VARS[statusTone(brand.statusFlow, status)];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: tone.bg, color: tone.text, borderColor: `color-mix(in srgb, ${tone.text} 30%, transparent)` }}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function UrgentBadge() {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: "var(--brand-status-erro-bg)", color: "var(--brand-status-erro-text)", borderColor: "color-mix(in srgb, var(--brand-status-erro-text) 30%, transparent)" }}
    >
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
    <div
      className="rounded-xl border px-4 py-3 text-sm"
      style={{
        backgroundColor: "var(--brand-status-erro-bg)",
        color: "var(--brand-status-erro-text)",
        borderColor: "color-mix(in srgb, var(--brand-status-erro-text) 30%, transparent)",
      }}
    >
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
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border p-5 shadow-xl"
        style={{ backgroundColor: "var(--brand-surface)", borderColor: "var(--brand-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
            {title}
          </h3>
          <button onClick={onClose} className="text-xl leading-none hover:opacity-70" style={{ color: "var(--brand-text-secondary)" }} aria-label="Fechar">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
