import { useState } from "react";
import { useData } from "../hooks/DataProvider";
import { Button, Card, Input } from "../components/primitives";
import type { Catalogs } from "../types";

const CATALOG_LABELS: Record<keyof Catalogs, string> = {
  servicos: "Serviços / tipos de trabalho",
  materiais: "Materiais",
  sistemasImplante: "Sistemas de implante",
  coresVita: "Cores / escala VITA",
};

export function ConfiguracoesPage() {
  const { data, addCatalogItem, removeCatalogItem, resetDemoData } = useData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
          Configurações
        </h1>
        <p className="text-sm" style={{ color: "var(--brand-text-secondary)" }}>
          Gerencie os catálogos usados na abertura de novas ordens.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {(Object.keys(CATALOG_LABELS) as (keyof Catalogs)[]).map((key) => (
          <CatalogEditor
            key={key}
            titulo={CATALOG_LABELS[key]}
            itens={data.catalogs[key]}
            onAdd={(v) => addCatalogItem(key, v)}
            onRemove={(v) => removeCatalogItem(key, v)}
          />
        ))}
      </div>

      <Card className="p-5">
        <h3 className="mb-2 font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
          Dados de demonstração
        </h3>
        <p className="mb-3 text-sm" style={{ color: "var(--brand-text-secondary)" }}>
          Restaure os dados fictícios originais deste ambiente (apaga ordens e clínicas criadas durante a demonstração).
        </p>
        <Button variant="danger" onClick={() => confirm("Restaurar todos os dados de demonstração?") && resetDemoData()}>
          Restaurar dados de demonstração
        </Button>
      </Card>
    </div>
  );
}

function CatalogEditor({
  titulo,
  itens,
  onAdd,
  onRemove,
}: {
  titulo: string;
  itens: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
}) {
  const [valor, setValor] = useState("");
  return (
    <Card className="p-5">
      <h3 className="mb-3 font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
        {titulo}
      </h3>
      <ul className="mb-3 space-y-1.5">
        {itens.map((item) => (
          <li key={item} className="flex items-center justify-between rounded-lg border px-3 py-1.5 text-sm" style={{ borderColor: "var(--brand-border)", color: "var(--brand-text)" }}>
            {item}
            <button onClick={() => onRemove(item)} className="text-xs font-medium text-red-600 hover:underline">
              Remover
            </button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd(valor.trim());
          setValor("");
        }}
        className="flex gap-2"
      >
        <Input value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Adicionar item..." />
        <Button type="submit" variant="secondary">Adicionar</Button>
      </form>
    </Card>
  );
}
