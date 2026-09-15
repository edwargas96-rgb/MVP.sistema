const SUPERIOR = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const INFERIOR = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

export function Odontogram({
  selected,
  onChange,
  readOnly = false,
  grande = false,
}: {
  selected: number[];
  onChange?: (elementos: number[]) => void;
  readOnly?: boolean;
  grande?: boolean;
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
      <Arch teeth={SUPERIOR} selected={selected} onToggle={toggle} readOnly={readOnly} grande={grande} />
      <div className="my-3 border-t border-dashed" style={{ borderColor: "var(--brand-border)" }} />
      <Arch teeth={INFERIOR} selected={selected} onToggle={toggle} readOnly={readOnly} grande={grande} />
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
  grande,
}: {
  teeth: number[];
  selected: number[];
  onToggle: (t: number) => void;
  readOnly: boolean;
  grande: boolean;
}) {
  const mid = teeth.length / 2;
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <div className={`flex justify-center ${grande ? "gap-1.5" : "gap-1"}`}>
        {teeth.map((tooth, i) => {
          const active = selected.includes(tooth);
          return (
            <button
              key={tooth}
              type="button"
              disabled={readOnly}
              onClick={() => onToggle(tooth)}
              className={`flex shrink-0 flex-col items-center justify-center rounded-md border font-mono transition-colors ${
                grande ? "h-16 w-12 gap-0.5 text-xs" : "h-10 w-8 text-[10px]"
              } ${i === mid ? (grande ? "ml-3" : "ml-2") : ""} ${readOnly ? "cursor-default" : "cursor-pointer hover:opacity-80"}`}
              style={{
                borderColor: active ? "var(--brand-primary)" : "var(--brand-border)",
                backgroundColor: active ? "var(--brand-primary)" : "transparent",
                color: active ? "white" : "var(--brand-text-secondary)",
              }}
              title={`Dente ${tooth}`}
            >
              <span aria-hidden style={{ fontSize: grande ? 22 : 14 }}>🦷</span>
              <span>{tooth}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
