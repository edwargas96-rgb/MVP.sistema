import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import { AppShell } from "../components/AppShell";
import { Button, Card, EmptyState, Label, Select, StatusBadge, Textarea, UrgentBadge } from "../components/primitives";
import { Odontogram } from "../components/Odontogram";
import { FileUpload } from "../components/FileUpload";
import { Timeline, formatDate } from "../components/Timeline";
import { useBrand } from "../brand/BrandProvider";
import type { OrderStatus } from "../types";

export function OrdemDetalhePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const brand = useBrand();
  const { data, currentUser, updateOrderStatus, addOrderFiles, addOrderComment, clinicName } = useData();
  const order = data.orders.find((o) => o.id === id);
  const isLab = currentUser?.role === "laboratorio";

  const [novoStatus, setNovoStatus] = useState<OrderStatus>(order?.status ?? brand.statusFlow[0]);
  const [comentarioStatus, setComentarioStatus] = useState("");
  const [comentario, setComentario] = useState("");

  if (!order) {
    return (
      <AppShell titulo="Ordem não encontrada">
        <EmptyState
          title="Ordem não encontrada"
          description="Ela pode ter sido removida ou o link está incorreto."
          action={<Link to="/ordens" className="text-sm font-medium hover:underline" style={{ color: "var(--brand-primary)" }}>Voltar para ordens</Link>}
        />
      </AppShell>
    );
  }

  function handleStatusChange(e: React.FormEvent) {
    e.preventDefault();
    updateOrderStatus(order!.id, novoStatus, comentarioStatus);
    setComentarioStatus("");
  }

  function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comentario.trim()) return;
    addOrderComment(order!.id, comentario.trim());
    setComentario("");
  }

  const podeAprovar = !isLab && brand.statusAprovacao && order.status === brand.statusAprovacao;

  function handleAprovar() {
    const idx = brand.statusFlow.indexOf(brand.statusAprovacao!);
    const proximo = brand.statusFlow[idx + 1] ?? brand.statusAprovacao!;
    updateOrderStatus(order!.id, proximo, "Planejamento aprovado pela clínica.");
  }

  return (
    <AppShell
      titulo={order.numero}
      descricao={`${order.paciente} · ${clinicName(order.clinicId)}`}
      acao={
        <div className="flex items-center gap-2">
          <StatusBadge status={order.status} />
          {order.urgente && <UrgentBadge />}
        </div>
      }
    >
      <button onClick={() => navigate(-1)} className="mb-4 text-xs font-medium hover:underline" style={{ color: "var(--brand-text-secondary)" }}>
        ← Voltar
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="grid gap-4 p-5 sm:grid-cols-2">
            <Info label="Dentista responsável" value={order.dentista} />
            {order.idade && <Info label="Idade do paciente" value={order.idade} />}
            <Info label="Serviço" value={order.servico} />
            <Info label="Material" value={order.material} />
            <Info label="Cor / VITA" value={order.cor} />
            <Info label="Data de recebimento" value={formatDate(order.criadaEm)} />
            <Info label="Prazo solicitado" value={formatDate(order.prazo)} />
            <Info label="Prioridade" value={order.prioridade} />
            <Info label="Sob implante" value={order.sobImplante ? `Sim · ${order.sistemaImplante}` : "Não"} />
            {order.responsavelInterno && <Info label="Responsável interno" value={order.responsavelInterno} />}
          </Card>

          <Card className="p-5">
            <Label>Elementos</Label>
            <Odontogram selected={order.elementos} readOnly grande={brand.odontogramaGrande} />
          </Card>

          <Card className="p-5">
            <Label>Observações clínicas</Label>
            <p className="text-sm" style={{ color: "var(--brand-text)" }}>
              {order.observacoes || "Nenhuma observação registrada."}
            </p>
          </Card>

          <Card className="p-5">
            <Label>Arquivos e fotos</Label>
            <FileUpload files={order.arquivos} onAdd={(files) => addOrderFiles(order.id, files)} />
          </Card>

          <Card className="p-5">
            <Label>Linha do tempo</Label>
            <Timeline eventos={order.eventos} />
          </Card>
        </div>

        <div className="space-y-6">
          {podeAprovar && (
            <Card className="p-5">
              <h3 className="mb-2 font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
                Planejamento pronto para aprovação
              </h3>
              <p className="mb-3 text-sm" style={{ color: "var(--brand-text-secondary)" }}>
                Revise os arquivos e aprove para seguirmos com a produção.
              </p>
              <Button className="w-full" onClick={handleAprovar}>Aprovar planejamento</Button>
            </Card>
          )}

          {isLab && (
            <Card className="p-5">
              <h3 className="mb-3 font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
                Atualizar status
              </h3>
              <form onSubmit={handleStatusChange} className="space-y-3">
                <Select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value as OrderStatus)}>
                  {brand.statusFlow.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
                <Textarea
                  rows={3}
                  value={comentarioStatus}
                  onChange={(e) => setComentarioStatus(e.target.value)}
                  placeholder="Comentário sobre esta etapa (opcional)"
                />
                <Button type="submit" className="w-full">Registrar status</Button>
              </form>
            </Card>
          )}

          <Card className="p-5">
            <h3 className="mb-3 font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
              Checklist das etapas
            </h3>
            <ul className="space-y-2 text-sm">
              {brand.statusFlow.map((s) => {
                const done = brand.statusFlow.indexOf(order.status) >= brand.statusFlow.indexOf(s);
                return (
                  <li key={s} className="flex items-center gap-2">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        backgroundColor: done ? "var(--brand-primary)" : "var(--brand-border)",
                        color: done ? "var(--brand-primary-text)" : "var(--brand-text-secondary)",
                      }}
                    >
                      {done ? "✓" : ""}
                    </span>
                    <span style={{ color: done ? "var(--brand-text)" : "var(--brand-text-secondary)" }}>{s}</span>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="mb-3 font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
              Adicionar observação
            </h3>
            <form onSubmit={handleComment} className="space-y-3">
              <Textarea rows={3} value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Escreva um comentário para a linha do tempo" />
              <Button type="submit" variant="secondary" className="w-full">Adicionar</Button>
            </form>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <p className="text-sm font-medium" style={{ color: "var(--brand-text)" }}>{value}</p>
    </div>
  );
}
