import { Link } from "react-router-dom";
import { FilePlus, Inbox, PackageCheck, TriangleAlert } from "lucide-react";
import { useData } from "../hooks/DataProvider";
import { AppShell } from "../components/AppShell";
import { Button, EmptyState, StatusBadge, UrgentBadge } from "../components/primitives";
import { PrazoBadge } from "../components/PrazoBadge";
import { useBrand } from "../brand/BrandProvider";

export function DashboardPage() {
  const brand = useBrand();
  const { visibleOrders, currentUser, clinicName } = useData();
  const isLab = currentUser?.role === "laboratorio";

  const novas = visibleOrders.filter((o) => o.status === "Recebida").length;
  const emProducao = visibleOrders.filter((o) =>
    ["Em análise", "Em produção", "Em prova"].includes(o.status),
  ).length;
  const prontas = visibleOrders.filter((o) => o.status === "Pronta").length;
  const atrasadas = visibleOrders.filter((o) => {
    if (o.status === "Enviada/Entregue") return false;
    return new Date(o.prazo) < new Date();
  }).length;

  const ordenadas = [...visibleOrders].sort(
    (a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime(),
  );

  const cards = [
    { label: "Novas", valor: novas, icone: Inbox, cor: "var(--brand-primary)" },
    { label: "Em produção", valor: emProducao, cor: "#B45309", icone: PackageCheck },
    { label: "Prontas", valor: prontas, cor: "#047857", icone: PackageCheck },
    { label: "Atrasadas", valor: atrasadas, cor: "#B91C1C", icone: TriangleAlert },
  ];

  return (
    <AppShell
      titulo={isLab ? "Painel do laboratório" : "Minhas ordens"}
      descricao={isLab ? `Todas as ordens das clínicas parceiras do ${brand.nome} ${brand.nomeDestaque}` : "Ordens enviadas pela sua clínica"}
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
      {isLab && (
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
            {ordenadas.map((order) => (
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
                      {[order.servico, isLab ? clinicName(order.clinicId) : null].filter(Boolean).join(" · ") || "—"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.urgente && <UrgentBadge />}
                    <PrazoBadge order={order} />
                    <StatusBadge status={order.status} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
