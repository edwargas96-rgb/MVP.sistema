import { useState } from "react";
import { useData } from "../hooks/DataProvider";
import { AppShell } from "../components/AppShell";
import { Button, Card, EmptyState, Input, Label, Modal } from "../components/primitives";

export function ClinicasPage() {
  const { data, addClinic } = useData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", responsavel: "", telefone: "", email: "", endereco: "", documento: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.email) return;
    addClinic({ ...form, ativo: true });
    setForm({ nome: "", responsavel: "", telefone: "", email: "", endereco: "", documento: "" });
    setOpen(false);
  }

  return (
    <AppShell
      titulo="Clínicas"
      descricao={`${data.clinics.length} clínicas cadastradas`}
      acao={<Button onClick={() => setOpen(true)}>+ Cadastrar clínica</Button>}
    >
      <div className="space-y-5">

      {data.clinics.length === 0 ? (
        <EmptyState title="Nenhuma clínica cadastrada" description="Cadastre a primeira clínica parceira para liberar o acesso dela." />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide" style={{ borderColor: "var(--brand-border)", color: "var(--brand-text-secondary)" }}>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Responsável</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Documento</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.clinics.map((c) => (
                <tr key={c.id} className="border-b last:border-0" style={{ borderColor: "var(--brand-border)" }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--brand-text)" }}>{c.nome}</td>
                  <td className="px-4 py-3" style={{ color: "var(--brand-text)" }}>{c.responsavel}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--brand-text-secondary)" }}>{c.email} · {c.telefone}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--brand-text-secondary)" }}>{c.documento}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.ativo ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {c.ativo ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Cadastrar clínica">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label>Nome da clínica</Label>
            <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
          </div>
          <div>
            <Label>Responsável</Label>
            <Input value={form.responsavel} onChange={(e) => setForm({ ...form, responsavel: e.target.value })} />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
          </div>
          <div>
            <Label>E-mail</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <Label>Endereço</Label>
            <Input value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} />
          </div>
          <div>
            <Label>CNPJ / CPF</Label>
            <Input value={form.documento} onChange={(e) => setForm({ ...form, documento: e.target.value })} />
          </div>
          <Button type="submit" className="w-full">Salvar clínica</Button>
        </form>
      </Modal>
      </div>
    </AppShell>
  );
}
