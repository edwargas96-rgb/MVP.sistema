import { useRef } from "react";
import type { OrderFile } from "../types";
import { genId } from "../lib/store";
import { useBrand } from "../brand/BrandProvider";

const ACCEPTED = [".stl", ".ply", ".zip", ".pdf", ".jpg", ".jpeg", ".png"];

export function FileUpload({
  files,
  onAdd,
  onRemove,
}: {
  files: OrderFile[];
  onAdd: (files: OrderFile[]) => void;
  onRemove?: (id: string) => void;
}) {
  const brand = useBrand();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const novos: OrderFile[] = Array.from(list).map((f) => {
      const extensao = f.name.split(".").pop()?.toLowerCase() ?? "";
      const isImage = ["jpg", "jpeg", "png"].includes(extensao);
      return {
        id: genId("file"),
        nome: f.name,
        tipo: isImage ? "foto" : "arquivo",
        extensao,
        tamanhoKb: Math.round(f.size / 1024) || 12,
        criadoEm: new Date().toISOString(),
      };
    });
    onAdd(novos);
  }

  return (
    <div>
      <div
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center"
        style={{ borderColor: "var(--brand-border)" }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <span className="text-sm font-medium" style={{ color: "var(--brand-text)" }}>
          {brand.textos.uploadTitulo}
        </span>
        <span className="text-xs" style={{ color: "var(--brand-text-secondary)" }}>
          {brand.textos.uploadSubtitulo}
        </span>
        <span className="text-[11px]" style={{ color: "var(--brand-text-secondary)", opacity: 0.7 }}>
          Aceita {ACCEPTED.join(", ")} — envio demonstrativo (não sobe para nenhum servidor)
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED.join(",")}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <ul className="mt-3 divide-y rounded-lg border text-sm" style={{ borderColor: "var(--brand-border)" }}>
          {files.map((f) => (
            <li key={f.id} className="flex items-center justify-between px-3 py-2">
              <span className="flex items-center gap-2 truncate">
                <span aria-hidden>{f.tipo === "foto" ? "🖼️" : "📄"}</span>
                <span className="truncate">{f.nome}</span>
                <span className="text-xs" style={{ color: "var(--brand-text-secondary)" }}>
                  {f.tamanhoKb} KB
                </span>
              </span>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(f.id)}
                  className="text-xs font-medium text-red-600 hover:underline"
                >
                  Remover
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
