import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import { CalendarView } from "../components/CalendarView";
import { Modal } from "../components/primitives";
import { StatusBadge, UrgentBadge } from "../components/primitives";
import { formatDate } from "../components/Timeline";
import type { Order } from "../types";

export function CalendarioPage() {
  const { visibleOrders, clinicName } = useData();
  const navigate = useNavigate();
  const [selecionada, setSelecionada] = useState<Order | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
          Calendário de prazos
        </h1>
        <p className="text-sm" style={{ color: "var(--brand-text-secondary)" }}>
          Visualize as ordens posicionadas na data de entrega.
        </p>
      </div>
      <CalendarView orders={visibleOrders} onSelect={setSelecionada} />

      <Modal open={!!selecionada} onClose={() => setSelecionada(null)} title={selecionada?.numero ?? ""}>
        {selecionada && (
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Paciente:</span> {selecionada.paciente}</p>
            <p><span className="font-semibold">Clínica:</span> {clinicName(selecionada.clinicId)}</p>
            <p><span className="font-semibold">Serviço:</span> {selecionada.servico}</p>
            <p><span className="font-semibold">Prazo:</span> {formatDate(selecionada.prazo)}</p>
            <div className="flex items-center gap-2 pt-1">
              <StatusBadge status={selecionada.status} />
              {selecionada.urgente && <UrgentBadge />}
            </div>
            <button
              onClick={() => navigate(`/ordens/${selecionada.id}`)}
              className="mt-3 text-sm font-semibold hover:underline"
              style={{ color: "var(--brand-primary)" }}
            >
              Abrir ordem completa →
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
