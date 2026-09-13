import { Link } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import { Button, Card, EmptyState, StatCard, StatusBadge, UrgentBadge } from "../components/primitives";
import { formatDate } from "../components/Timeline";
import { useBrand } from "../brand/BrandProvider";

export function DashboardPage() {
  const brand = useBrand();
  const { visibleOrders, currentUser, clinicName } = useData();
  const isLab = currentUser?.role === "laboratorio";

  const now = new Date();
  const novas = visibleOrders.filter((o) => o.status === "Recebida" || o.status === "Em análise").length;
  const emProducao = visibleOrders.filter((o) => o.status === "Em produção" || o.status === "Em prova").length;
  const prontas = visibleOrders.filter((o) => o.status === "Pronta").length;
  const atrasadas = visibleOrders.filter(
    (o) => o.status !== "Entregue" && new Date(o.prazo) < now,
  ).length;

  const recentes = [...visibleOrders]
    .sort((a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime())
    .slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
            Olá, {currentUser?.nome?.split(" ")[0]}
          </h1>
          <p className="text-sm" style={{ color: "var(--brand-text-secondary)" }}>
            {isLab ? `Painel geral · ${brand.nome}` : "Acompanhe suas ordens em andamento"}
          </p>
        </div>
        <Link to="/nova-ordem">
          <Button>+ Nova ordem</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Novas" value={novas} />
        <StatCard label="Em produção" value={emProducao} tone="warning" />
        <StatCard label="Prontas" value={prontas} tone="success" />
        <StatCard label="Atrasadas" value={atrasadas} tone="danger" />
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
            Ordens recentes
          </h2>
          <Link to="/ordens" className="text-sm font-medium hover:underline" style={{ color: "var(--brand-primary)" }}>
            Ver todas
          </Link>
        </div>
        {recentes.length === 0 ? (
          <EmptyState
            title="Nenhuma ordem por aqui ainda"
            description="Crie a primeira ordem de serviço para começar a acompanhar a produção."
            action={
              <Link to="/nova-ordem">
                <Button>Criar nova ordem</Button>
              </Link>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide" style={{ borderColor: "var(--brand-border)", color: "var(--brand-text-secondary)" }}>
                  <th className="py-2 pr-3">Nº</th>
                  <th className="py-2 pr-3">Paciente</th>
                  {isLab && <th className="py-2 pr-3">Clínica</th>}
                  <th className="py-2 pr-3">Serviço</th>
                  <th className="py-2 pr-3">Prazo</th>
                  <th className="py-2 pr-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentes.map((order) => (
                  <tr key={order.id} className="border-b last:border-0" style={{ borderColor: "var(--brand-border)" }}>
                    <td className="py-2.5 pr-3">
                      <Link to={`/ordens/${order.id}`} className="font-mono font-medium hover:underline" style={{ color: "var(--brand-primary)" }}>
                        {order.numero}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-3" style={{ color: "var(--brand-text)" }}>{order.paciente}</td>
                    {isLab && <td className="py-2.5 pr-3" style={{ color: "var(--brand-text)" }}>{clinicName(order.clinicId)}</td>}
                    <td className="py-2.5 pr-3" style={{ color: "var(--brand-text)" }}>{order.servico}</td>
                    <td className="py-2.5 pr-3 font-mono text-xs" style={{ color: "var(--brand-text-secondary)" }}>{formatDate(order.prazo)}</td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={order.status} />
                        {order.urgente && <UrgentBadge />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
