import { useState } from "react";
import { CATEGORIES } from "./brand";
import { brl, finalPrice, isPromo } from "./store";
import type { Product, Settings } from "./types";

interface Props {
  products: Product[];
  setProducts: (p: Product[]) => void;
  settings: Settings;
  setSettings: (s: Settings) => void;
}

const blank = (): Product => ({ id: crypto.randomUUID(), name: "", description: "", category: CATEGORIES[0], price: 0, active: true });

export default function Admin({ products, setProducts, settings, setSettings }: Props) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("les-admin") === "1");
  const [pin, setPin] = useState("");
  const [edit, setEdit] = useState<Product | null>(null);
  const [tab, setTab] = useState<"produtos" | "config">("produtos");

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <form
          className="w-full max-w-xs space-y-3 rounded-xl border bg-white p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (pin === settings.adminPin) { sessionStorage.setItem("les-admin", "1"); setAuthed(true); }
            else alert("PIN incorreto");
          }}
        >
          <h1 className="font-display text-lg font-bold">Área do dono</h1>
          <input className="input" type="password" inputMode="numeric" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} autoFocus />
          <button className="btn-primary w-full">Entrar</button>
          <a href="#/" className="block text-center text-sm text-neutral-500 underline">Voltar à loja</a>
        </form>
      </div>
    );
  }

  const save = (p: Product) => {
    setProducts(products.some((x) => x.id === p.id) ? products.map((x) => (x.id === p.id ? p : x)) : [p, ...products]);
    setEdit(null);
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-display text-xl font-extrabold">Painel · {settings.storeName}</h1>
        <a href="#/" className="btn-ghost">Ver loja</a>
      </div>
      <div className="mb-4 flex gap-2">
        {(["produtos", "config"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full border px-4 py-1 text-sm ${tab === t ? "border-brand bg-brand text-white" : "bg-white"}`}>
            {t === "produtos" ? "Produtos e promoções" : "Configurações"}
          </button>
        ))}
      </div>

      {tab === "produtos" && (
        <>
          <button className="btn-primary mb-3" onClick={() => setEdit(blank())}>+ Novo produto</button>
          <div className="divide-y rounded-xl border bg-white">
            {products.length === 0 && <p className="p-6 text-center text-neutral-500">Nenhum produto cadastrado.</p>}
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 p-3 text-sm">
                <div className="min-w-0">
                  <div className={`truncate font-medium ${p.active ? "" : "text-neutral-400 line-through"}`}>{p.name}</div>
                  <div className="text-neutral-500">
                    {p.category} · {isPromo(p) && <span className="mr-1 line-through">{brl(p.price)}</span>}
                    <b className={isPromo(p) ? "text-red-600" : ""}>{brl(finalPrice(p))}</b>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button className="btn-ghost !py-1" onClick={() => setProducts(products.map((x) => (x.id === p.id ? { ...x, active: !x.active } : x)))}>{p.active ? "Ocultar" : "Mostrar"}</button>
                  <button className="btn-ghost !py-1" onClick={() => setEdit(p)}>Editar</button>
                  <button className="btn-ghost !py-1 text-red-600" onClick={() => confirm(`Excluir "${p.name}"?`) && setProducts(products.filter((x) => x.id !== p.id))}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "config" && <SettingsForm settings={settings} onSave={setSettings} />}
      {edit && <ProductForm product={edit} onSave={save} onCancel={() => setEdit(null)} />}
    </div>
  );
}

function ProductForm({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [p, setP] = useState(product);
  const num = (v: string) => (v === "" ? undefined : Number(v.replace(",", ".")));
  const ok = p.name.trim() && p.price > 0;
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
      <form className="max-h-full w-full max-w-md space-y-3 overflow-y-auto rounded-xl bg-white p-5" onSubmit={(e) => { e.preventDefault(); ok && onSave(p); }}>
        <h2 className="font-display text-lg font-bold">Produto</h2>
        <div><label className="label">Nome</label><input className="input" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} /></div>
        <div><label className="label">Categoria</label>
          <select className="input" value={p.category} onChange={(e) => setP({ ...p, category: e.target.value })}>
            {Array.from(new Set([...CATEGORIES, p.category])).map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">Preço (R$)</label><input className="input" inputMode="decimal" value={p.price || ""} onChange={(e) => setP({ ...p, price: num(e.target.value) ?? 0 })} /></div>
          <div><label className="label">Preço promo (R$)</label><input className="input" inputMode="decimal" placeholder="opcional" value={p.promoPrice ?? ""} onChange={(e) => setP({ ...p, promoPrice: num(e.target.value) })} /></div>
        </div>
        <div><label className="label">URL da imagem</label><input className="input" placeholder="https://…" value={p.imageUrl ?? ""} onChange={(e) => setP({ ...p, imageUrl: e.target.value || undefined })} /></div>
        <div><label className="label">Descrição</label><textarea className="input" rows={2} value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} /></div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn-ghost" onClick={onCancel}>Cancelar</button>
          <button className="btn-primary" disabled={!ok}>Salvar</button>
        </div>
      </form>
    </div>
  );
}

function SettingsForm({ settings, onSave }: { settings: Settings; onSave: (s: Settings) => void }) {
  const [s, setS] = useState(settings);
  return (
    <form className="max-w-md space-y-3 rounded-xl border bg-white p-5" onSubmit={(e) => { e.preventDefault(); onSave(s); alert("Salvo!"); }}>
      <div><label className="label">Nome da loja</label><input className="input" value={s.storeName} onChange={(e) => setS({ ...s, storeName: e.target.value })} /></div>
      <div><label className="label">WhatsApp (DDI+DDD+número)</label><input className="input" inputMode="numeric" placeholder="5511999999999" value={s.whatsapp} onChange={(e) => setS({ ...s, whatsapp: e.target.value.replace(/\D/g, "") })} /></div>
      <div><label className="label">Faixa de aviso no topo</label><input className="input" value={s.banner} onChange={(e) => setS({ ...s, banner: e.target.value })} /></div>
      <div><label className="label">PIN do painel</label><input className="input" value={s.adminPin} onChange={(e) => setS({ ...s, adminPin: e.target.value })} /></div>
      <button className="btn-primary">Salvar configurações</button>
    </form>
  );
}
