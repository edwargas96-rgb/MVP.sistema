import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import { AppShell } from "../components/AppShell";
import { Card, EmptyState, Input, Select, StatusBadge, UrgentBadge } from "../components/primitives";
import { formatDate } from "../components/Timeline";
import type { OrderStatus } from "../types";
import { ORDER_STATUS_FLOW } from "../types";

export function OrdensListPage() {
  const { visibleOrders, currentUser, clinicName } = useData();
  const isLab = currentUser?.role === "laboratorio";
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState<OrderStatus | "todas">("todas");
  const [somenteUrgentes, setSomenteUrgentes] = useState(false);

  const filtradas = useMemo(() => {
    return visibleOrders.filter((o) => {
      const termo = busca.trim().toLowerCase();
      const matchBusca =
        !termo ||
        o.numero.toLowerCase().includes(termo) ||
        o.paciente.toLowerCase().includes(termo) ||
        o.dentista.toLowerCase().includes(termo) ||
        clinicName(o.clinicId).toLowerCase().includes(termo);
      const matchStatus = status === "todas" || o.status === status;
      const matchUrgente = !somenteUrgentes || o.urgente;
      return matchBusca && matchStatus && matchUrgente;
    });
  }, [visibleOrders, busca, status, somenteUrgentes, clinicName]);

  return (
    <AppShell titulo="Ordens" descricao={`${filtradas.length} de ${visibleOrders.length} ordens`}>
      <div className="space-y-5">
      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por número, paciente, dentista ou clínica..."
          className="sm:flex-1"
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus | "todas")} className="sm:w-52">
          <option value="todas">Todos os status</option>
          {ORDER_STATUS_FLOW.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
        <label className="flex items-center gap-2 text-sm whitespace-nowrap" style={{ color: "var(--brand-text)" }}>
          <input type="checkbox" checked={somenteUrgentes} onChange={(e) => setSomenteUrgentes(e.target.checked)} />
          Somente urgentes
        </label>
      </Card>

      {filtradas.length === 0 ? (
        <EmptyState title="Nenhuma ordem encontrada" description="Ajuste os filtros ou a busca para ver outros resultados." />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide" style={{ borderColor: "var(--brand-border)", color: "var(--brand-text-secondary)" }}>
                <th className="px-4 py-3">Nº</th>
                <th className="px-4 py-3">Paciente</th>
                {isLab && <th className="px-4 py-3">Clínica</th>}
                <th className="px-4 py-3">Dentista</th>
                <th className="px-4 py-3">Serviço</th>
                <th className="px-4 py-3">Prazo</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-black/[0.02]" style={{ borderColor: "var(--brand-border)" }}>
                  <td className="px-4 py-3">
                    <Link to={`/ordens/${order.id}`} className="font-mono font-medium hover:underline" style={{ color: "var(--brand-primary)" }}>
                      {order.numero}
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--brand-text)" }}>{order.paciente}</td>
                  {isLab && <td className="px-4 py-3" style={{ color: "var(--brand-text)" }}>{clinicName(order.clinicId)}</td>}
                  <td className="px-4 py-3" style={{ color: "var(--brand-text)" }}>{order.dentista}</td>
                  <td className="px-4 py-3" style={{ color: "var(--brand-text)" }}>{order.servico}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--brand-text-secondary)" }}>{formatDate(order.prazo)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={order.status} />
                      {order.urgente && <UrgentBadge />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      </div>
    </AppShell>
  );
}
