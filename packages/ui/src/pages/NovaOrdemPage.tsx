import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../hooks/DataProvider";
import { AppShell } from "../components/AppShell";
import { Button, Card, Input, Label, Select, Textarea } from "../components/primitives";
import { Odontogram } from "../components/Odontogram";
import { FileUpload } from "../components/FileUpload";
import type { OrderFile } from "../types";

export function NovaOrdemPage() {
  const { data, currentUser, addOrder, clinicName } = useData();
  const navigate = useNavigate();
  const isLab = currentUser?.role === "laboratorio";

  const [clinicId, setClinicId] = useState(currentUser?.clinicId ?? data.clinics[0]?.id ?? "");
  const [paciente, setPaciente] = useState("");
  const [dentista, setDentista] = useState("");
  const [servico, setServico] = useState(data.catalogs.servicos[0] ?? "");
  const [elementos, setElementos] = useState<number[]>([]);
  const [sobImplante, setSobImplante] = useState(false);
  const [sistemaImplante, setSistemaImplante] = useState(data.catalogs.sistemasImplante[0] ?? "");
  const [material, setMaterial] = useState(data.catalogs.materiais[0] ?? "");
  const [cor, setCor] = useState(data.catalogs.coresVita[0] ?? "");
  const [prazo, setPrazo] = useState("");
  const [urgente, setUrgente] = useState(false);
  const [observacoes, setObservacoes] = useState("");
  const [arquivos, setArquivos] = useState<OrderFile[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!paciente || !dentista || !prazo || !clinicId) return;
    const order = addOrder({
      clinicId,
      paciente,
      dentista,
      servico,
      elementos,
      sobImplante,
      sistemaImplante: sobImplante ? sistemaImplante : undefined,
      material,
      cor,
      prazo,
      urgente,
      observacoes,
      arquivos,
    });
    navigate(`/ordens/${order.id}`);
  }

  return (
    <AppShell titulo="Nova ordem de serviço" descricao="Preencha os dados do caso. O número da ordem é gerado automaticamente.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Card className="grid gap-4 p-5 sm:grid-cols-2">
          <div>
            <Label>Nº da ordem</Label>
            <Input value={`OS-${String(data.orders.length + 1).padStart(4, "0")}`} disabled />
          </div>
          <div>
            <Label>Clínica</Label>
            {isLab ? (
              <Select value={clinicId} onChange={(e) => setClinicId(e.target.value)}>
                {data.clinics.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </Select>
            ) : (
              <Input value={clinicName(clinicId)} disabled />
            )}
          </div>
          <div>
            <Label>Paciente</Label>
            <Input value={paciente} onChange={(e) => setPaciente(e.target.value)} placeholder="Nome do paciente" required />
          </div>
          <div>
            <Label>Dentista responsável</Label>
            <Input value={dentista} onChange={(e) => setDentista(e.target.value)} placeholder="Nome do dentista" required />
          </div>
          <div>
            <Label>Serviço</Label>
            <Select value={servico} onChange={(e) => setServico(e.target.value)}>
              {data.catalogs.servicos.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Prazo solicitado</Label>
            <Input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} required />
          </div>
        </Card>

        <Card className="p-5">
          <Label>Elementos (odontograma)</Label>
          <Odontogram selected={elementos} onChange={setElementos} />
        </Card>

        <Card className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="sm:col-span-2 flex items-center gap-2">
            <input id="sobImplante" type="checkbox" checked={sobImplante} onChange={(e) => setSobImplante(e.target.checked)} />
            <label htmlFor="sobImplante" className="text-sm font-medium" style={{ color: "var(--brand-text)" }}>
              Trabalho sob implante?
            </label>
          </div>
          {sobImplante && (
            <div>
              <Label>Sistema de implante</Label>
              <Select value={sistemaImplante} onChange={(e) => setSistemaImplante(e.target.value)}>
                {data.catalogs.sistemasImplante.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
          )}
          <div>
            <Label>Material</Label>
            <Select value={material} onChange={(e) => setMaterial(e.target.value)}>
              {data.catalogs.materiais.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Cor / escala VITA</Label>
            <Select value={cor} onChange={(e) => setCor(e.target.value)}>
              {data.catalogs.coresVita.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2 flex items-center gap-2">
            <input id="urgente" type="checkbox" checked={urgente} onChange={(e) => setUrgente(e.target.checked)} />
            <label htmlFor="urgente" className="text-sm font-medium text-red-700">
              Marcar como urgente
            </label>
          </div>
        </Card>

        <Card className="p-5">
          <Label>Arquivos (STL, PLY, imagens, documentos)</Label>
          <FileUpload files={arquivos} onAdd={(f) => setArquivos((prev) => [...prev, ...f])} onRemove={(id) => setArquivos((prev) => prev.filter((f) => f.id !== id))} />
        </Card>

        <Card className="p-5">
          <Label>Observações clínicas</Label>
          <Textarea rows={4} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Detalhes clínicos, preferências de acabamento, restrições..." />
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancelar</Button>
          <Button type="submit">Enviar ordem</Button>
        </div>
      </form>
    </AppShell>
  );
}
