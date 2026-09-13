import { useState } from "react";
import { useData } from "../hooks/DataProvider";
import { Button, Card, EmptyState, Input, Label, Modal } from "../components/primitives";

export function PacientesPage() {
  const { data, currentUser, addPatient, clinicName } = useData();
  const isLab = currentUser?.role === "laboratorio";
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", dentista: "", telefone: "", observacoes: "" });

  const pacientes = isLab
    ? data.patients
    : data.patients.filter((p) => p.clinicId === currentUser?.clinicId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !currentUser) return;
    const clinicId = isLab ? data.clinics[0]?.id : currentUser.clinicId;
    if (!clinicId) return;
    addPatient({ ...form, clinicId });
    setForm({ nome: "", dentista: "", telefone: "", observacoes: "" });
    setOpen(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
            Pacientes
          </h1>
          <p className="text-sm" style={{ color: "var(--brand-text-secondary)" }}>
            {pacientes.length} pacientes cadastrados
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>+ Cadastrar paciente</Button>
      </div>

      {pacientes.length === 0 ? (
        <EmptyState title="Nenhum paciente cadastrado" description="Cadastre um paciente para agilizar a abertura de novas ordens." />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide" style={{ borderColor: "var(--brand-border)", color: "var(--brand-text-secondary)" }}>
                <th className="px-4 py-3">Nome</th>
                {isLab && <th className="px-4 py-3">Clínica</th>}
                <th className="px-4 py-3">Dentista</th>
                <th className="px-4 py-3">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id} className="border-b last:border-0" style={{ borderColor: "var(--brand-border)" }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--brand-text)" }}>{p.nome}</td>
                  {isLab && <td className="px-4 py-3" style={{ color: "var(--brand-text)" }}>{clinicName(p.clinicId)}</td>}
                  <td className="px-4 py-3" style={{ color: "var(--brand-text)" }}>{p.dentista}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--brand-text-secondary)" }}>{p.telefone || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Cadastrar paciente">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label>Nome do paciente</Label>
            <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
          </div>
          <div>
            <Label>Dentista responsável</Label>
            <Input value={form.dentista} onChange={(e) => setForm({ ...form, dentista: e.target.value })} />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
          </div>
          <div>
            <Label>Observações</Label>
            <Input value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} />
          </div>
          <Button type="submit" className="w-full">Salvar paciente</Button>
        </form>
      </Modal>
    </div>
  );
}
