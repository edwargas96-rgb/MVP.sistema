import { Link } from "react-router-dom";
import { FilePlus, Inbox, PackageCheck, TriangleAlert } from "lucide-react";
import { useData } from "../hooks/DataProvider";
import { AppShell } from "../components/AppShell";
import { Button, EmptyState, StatusBadge, UrgentBadge } from "../components/primitives";
import { PrazoBadge } from "../components/PrazoBadge";
import { useBrand } from "../brand/BrandProvider";
import type { Order } from "../types";

export function DashboardPage() {
  const brand = useBrand();
  const { visibleOrders, currentUser, clinicName } = useData();
  const isLab = currentUser?.role === "laboratorio";

  const ultimoStatus = brand.statusFlow[brand.statusFlow.length - 1];
  const statusCards = brand.dashboard.statCards.filter((c) => c.tipo === "status");

  const cards = brand.dashboard.statCards.map((card, i) => {
    if (card.tipo === "atrasadas") {
      const valor = visibleOrders.filter((o) => o.status !== ultimoStatus && new Date(o.prazo) < new Date()).length;
      return { label: card.label, valor, icone: TriangleAlert, cor: "var(--brand-status-erro-text)" };
    }
    const valor = visibleOrders.filter((o) => card.statuses?.includes(o.status)).length;
    const posicao = statusCards.indexOf(card);
    const ultima = posicao === statusCards.length - 1;
    const cor = posicao === 0 ? "var(--brand-primary)" : ultima ? "var(--brand-status-sucesso-text)" : "var(--brand-status-alerta-text)";
    return { label: card.label, valor, icone: posicao === 0 ? Inbox : PackageCheck, cor };
  });

  const ordenadas = [...visibleOrders].sort(
    (a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime(),
  );

  return (
    <AppShell
      titulo={isLab ? brand.textos.dashboardTituloLab : brand.textos.dashboardTituloClinica}
      descricao={isLab ? brand.textos.dashboardSubtituloLab : brand.textos.dashboardSubtituloClinica}
      acao={
        !isLab && (
          <Link to="/nova-ordem">
            <Button>
              <FilePlus className="size-4" /> Nova ordem
            </Button>
          </Link>
        )
      }
    >
      {isLab && brand.dashboardDestaque && (
        <div
          className="mb-6 rounded-xl border p-5"
          style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-status-info-bg)" }}
        >
          <h3 className="font-semibold" style={{ color: "var(--brand-primary)", fontFamily: "var(--brand-font-title)" }}>
            {brand.dashboardDestaque.titulo}
          </h3>
          <p className="mt-1 text-sm" style={{ color: "var(--brand-text-secondary)" }}>
            {brand.dashboardDestaque.texto}
          </p>
        </div>
      )}

      {isLab && (
        <div
          className="mb-6 grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}
        >
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border p-4 shadow-sm"
              style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-surface)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "var(--brand-text-secondary)" }}>{card.label}</span>
                <card.icone className="size-4" style={{ color: card.cor }} />
              </div>
              <div className="mt-2 text-3xl font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-mono)" }}>
                {card.valor}
              </div>
            </div>
          ))}
        </div>
      )}

      {isLab && ordenadas.length > 0 && (
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--brand-text-secondary)" }}>
          Trabalhos em andamento
        </h2>
      )}

      <div className="overflow-hidden rounded-xl border shadow-sm" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-surface)" }}>
        {ordenadas.length === 0 ? (
          <div className="p-10 text-center">
            <EmptyState
              title="Nenhuma ordem por aqui ainda"
              description="Assim que uma ordem de serviço for aberta, ela aparece aqui."
              action={
                !isLab && (
                  <Link to="/nova-ordem">
                    <Button>Abrir primeira ordem</Button>
                  </Link>
                )
              }
            />
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--brand-border)" }}>
            {ordenadas.map((order: Order) => {
              const posicao = brand.statusFlow.indexOf(order.status);
              const percentual = brand.statusFlow.length > 1 ? Math.round((posicao / (brand.statusFlow.length - 1)) * 100) : 0;
              return (
                <li key={order.id}>
                  <Link
                    to={`/ordens/${order.id}`}
                    className="flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-black/[0.03] sm:flex-row sm:items-center sm:gap-4"
                  >
                    <span
                      className="w-20 shrink-0 text-sm font-semibold"
                      style={{ color: "var(--brand-primary)", fontFamily: "var(--brand-font-mono)" }}
                    >
                      {order.numero}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium" style={{ color: "var(--brand-text)" }}>
                        {order.paciente}
                      </div>
                      <div className="truncate text-sm" style={{ color: "var(--brand-text-secondary)" }}>
                        {[order.servico, order.material, isLab ? clinicName(order.clinicId) : null].filter(Boolean).join(" · ") || "—"}
                      </div>
                      <div className="mt-1.5 h-1 w-full max-w-40 overflow-hidden rounded-full" style={{ backgroundColor: "var(--brand-border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${percentual}%`, backgroundColor: "var(--brand-primary)" }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.urgente && <UrgentBadge />}
                      <PrazoBadge order={order} />
                      <StatusBadge status={order.status} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
