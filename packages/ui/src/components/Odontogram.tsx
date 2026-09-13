const SUPERIOR = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const INFERIOR = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

export function Odontogram({
  selected,
  onChange,
  readOnly = false,
}: {
  selected: number[];
  onChange?: (elementos: number[]) => void;
  readOnly?: boolean;
}) {
  function toggle(tooth: number) {
    if (readOnly || !onChange) return;
    if (selected.includes(tooth)) {
      onChange(selected.filter((t) => t !== tooth));
    } else {
      onChange([...selected, tooth].sort((a, b) => a - b));
    }
  }

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--brand-border)" }}>
      <Arch teeth={SUPERIOR} selected={selected} onToggle={toggle} readOnly={readOnly} />
      <div className="my-3 border-t border-dashed" style={{ borderColor: "var(--brand-border)" }} />
      <Arch teeth={INFERIOR} selected={selected} onToggle={toggle} readOnly={readOnly} />
      <p className="mt-3 text-xs" style={{ color: "var(--brand-text-secondary)" }}>
        {selected.length > 0 ? `Elementos: ${selected.join(", ")}` : "Nenhum elemento selecionado"}
      </p>
    </div>
  );
}

function Arch({
  teeth,
  selected,
  onToggle,
  readOnly,
}: {
  teeth: number[];
  selected: number[];
  onToggle: (t: number) => void;
  readOnly: boolean;
}) {
  const mid = teeth.length / 2;
  return (
    <div className="flex justify-center gap-1">
      {teeth.map((tooth, i) => {
        const active = selected.includes(tooth);
        return (
          <button
            key={tooth}
            type="button"
            disabled={readOnly}
            onClick={() => onToggle(tooth)}
            className={`flex h-10 w-8 flex-col items-center justify-center rounded-md border text-[10px] font-mono transition-colors ${
              i === mid ? "ml-2" : ""
            } ${readOnly ? "cursor-default" : "cursor-pointer hover:opacity-80"}`}
            style={{
              borderColor: active ? "var(--brand-primary)" : "var(--brand-border)",
              backgroundColor: active ? "var(--brand-primary)" : "transparent",
              color: active ? "white" : "var(--brand-text-secondary)",
            }}
            title={`Dente ${tooth}`}
          >
            <span aria-hidden>🦷</span>
            <span>{tooth}</span>
          </button>
        );
      })}
    </div>
  );
}
