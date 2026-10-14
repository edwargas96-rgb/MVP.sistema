import { useState } from "react";
import { CATEGORIES, GOALS } from "./brand";
import { brl, finalPrice, isPromo, useNow, useOrders } from "./store";
import type { Product, Settings } from "./types";

interface Props {
  products: Product[];
  setProducts: (p: Product[]) => void;
  settings: Settings;
  setSettings: (s: Settings) => void;
}

const blank = (): Product => ({ id: crypto.randomUUID(), name: "", description: "", category: CATEGORIES[0], price: 0, active: true });
const card = "rounded-xl border border-steel bg-plate";

export default function Admin({ products, setProducts, settings, setSettings }: Props) {
  const now = useNow(30000);
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("les-admin") === "1");
  const [pin, setPin] = useState("");
  const [edit, setEdit] = useState<Product | null>(null);
  const [tab, setTab] = useState<"produtos" | "pedidos" | "config">("produtos");
  const [orders, setOrders] = useOrders();

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <form className={`${card} w-full max-w-xs space-y-3 p-6`} onSubmit={(e) => {
          e.preventDefault();
          if (pin === settings.adminPin) { sessionStorage.setItem("les-admin", "1"); setAuthed(true); } else alert("PIN incorreto. Tente de novo.");
        }}>
          <h1 className="title text-3xl">Área do dono</h1>
          <input className="input" type="password" inputMode="numeric" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} autoFocus />
          <button className="btn-primary w-full">Entrar</button>
          <a href="#/" className="block text-center text-sm text-neutral-400 underline">Voltar à loja</a>
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
        <h1 className="title text-3xl">Painel · {settings.storeName}</h1>
        <a href="#/" className="btn-ghost">Ver loja</a>
      </div>
      <div className="mb-4 flex gap-2">
        {([["produtos", "Produtos e promoções"], ["pedidos", `Pedidos (${orders.length})`], ["config", "Configurações"]] as const).map(([t, l]) => (
          <button key={t} onClick={() => setTab(t)} className={`chip ${tab === t ? "chip-on" : ""}`}>{l}</button>
        ))}
      </div>

      {tab === "produtos" && (
        <>
          <button className="btn-primary mb-3" onClick={() => setEdit(blank())}>+ Novo produto</button>
          <div className={`${card} divide-y divide-steel`}>
            {products.length === 0 && <p className="p-6 text-center text-neutral-400">Nenhum produto cadastrado. Clique em “Novo produto”.</p>}
            {products.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-3 text-sm">
                <div className="min-w-0">
                  <div className={`truncate font-bold ${p.active ? "" : "text-neutral-500 line-through"}`}>{p.name}</div>
                  <div className="text-neutral-400">
                    {p.category} · {isPromo(p, now) && <span className="mr-1 line-through">{brl(p.price)}</span>}
                    <b className={isPromo(p, now) ? "text-alert" : "text-bone"}>{brl(finalPrice(p, now))}</b>
                    {p.promoEndsAt && <span className="ml-2 font-mono text-xs">até {new Date(p.promoEndsAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</span>}
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button className="btn-ghost !py-1" onClick={() => setProducts(products.map((x) => (x.id === p.id ? { ...x, active: !x.active } : x)))}>{p.active ? "Ocultar" : "Mostrar"}</button>
                  <button className="btn-ghost !py-1" onClick={() => setEdit(p)}>Editar</button>
                  <button className="btn-ghost !py-1 text-alert" onClick={() => confirm(`Excluir "${p.name}"?`) && setProducts(products.filter((x) => x.id !== p.id))}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "pedidos" && (
        <div className={`${card} divide-y divide-steel`}>
          <p className="p-3 text-xs text-neutral-400">Pedidos enviados deste aparelho (cópia local). O registro oficial fica na conversa do WhatsApp.</p>
          {orders.length === 0 && <p className="p-6 text-center text-neutral-400">Nenhum pedido enviado ainda.</p>}
          {orders.map((o) => (
            <details key={o.id} className="p-3 text-sm">
              <summary className="flex cursor-pointer justify-between gap-2">
                <span><b className="font-mono text-brand">{o.number}</b> · {o.customerName}</span>
                <span className="font-mono">{brl(o.total)}</span>
              </summary>
              <pre className="mt-2 whitespace-pre-wrap font-sans text-neutral-300">{o.text}</pre>
            </details>
          ))}
          {orders.length > 0 && <div className="p-3"><button className="btn-ghost text-alert" onClick={() => confirm("Apagar o histórico deste aparelho?") && setOrders([])}>Apagar histórico</button></div>}
        </div>
      )}

      {tab === "config" && <SettingsForm settings={settings} onSave={setSettings} />}
      {edit && <ProductForm product={edit} onSave={save} onCancel={() => setEdit(null)} />}
    </div>
  );
}

const toLocalInput = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

function ProductForm({ product, onSave, onCancel }: { product: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [p, setP] = useState(product);
  const num = (v: string) => (v === "" ? undefined : Number(v.replace(",", ".")));
  const ok = p.name.trim() && p.price > 0;
  const toggleGoal = (id: string) => setP({ ...p, goals: p.goals?.includes(id) ? p.goals.filter((g) => g !== id) : [...(p.goals ?? []), id] });
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-4">
      <form className={`${card} max-h-full w-full max-w-md space-y-3 overflow-y-auto p-5`} onSubmit={(e) => { e.preventDefault(); ok && onSave(p); }}>
        <h2 className="title text-2xl">Produto</h2>
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
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">Promo termina em</label><input className="input" type="datetime-local" value={toLocalInput(p.promoEndsAt)} onChange={(e) => setP({ ...p, promoEndsAt: e.target.value ? new Date(e.target.value).toISOString() : undefined })} /></div>
          <div><label className="label">Unidades restantes</label><input className="input" inputMode="numeric" placeholder="opcional" value={p.unitsLeft ?? ""} onChange={(e) => setP({ ...p, unitsLeft: num(e.target.value) })} /></div>
        </div>
        <div>
          <label className="label">Objetivos</label>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((g) => <button type="button" key={g.id} onClick={() => toggleGoal(g.id)} className={`chip ${p.goals?.includes(g.id) ? "chip-on" : ""}`}>{g.label}</button>)}
          </div>
        </div>
        <div><label className="label">Selo (opcional, ex.: KIT PROMO)</label><input className="input" value={p.badge ?? ""} onChange={(e) => setP({ ...p, badge: e.target.value || undefined })} /></div>
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
  const setTier = (i: number, percent: number) => setS({ ...s, kitTiers: s.kitTiers.map((t, n) => (n === i ? { ...t, percent: Math.min(100, Math.max(0, percent || 0)) } : t)) });
  return (
    <form className={`${card} max-w-md space-y-3 p-5`} onSubmit={(e) => { e.preventDefault(); onSave(s); alert("Configurações salvas."); }}>
      <div><label className="label">Nome da loja</label><input className="input" value={s.storeName} onChange={(e) => setS({ ...s, storeName: e.target.value })} /></div>
      <div><label className="label">WhatsApp (DDI+DDD+número)</label><input className="input" inputMode="numeric" placeholder="5511999999999" value={s.whatsapp} onChange={(e) => setS({ ...s, whatsapp: e.target.value.replace(/\D/g, "") })} /></div>
      <div><label className="label">Faixa de aviso no topo</label><input className="input" value={s.banner} onChange={(e) => setS({ ...s, banner: e.target.value })} /></div>
      <div>
        <label className="label">Desconto do “Monte seu kit” (%)</label>
        <div className="grid grid-cols-3 gap-2">
          {s.kitTiers.map((t, i) => (
            <div key={t.items}><span className="font-mono text-xs text-neutral-400">{t.items}+ itens</span><input className="input" inputMode="numeric" value={t.percent} onChange={(e) => setTier(i, Number(e.target.value))} /></div>
          ))}
        </div>
      </div>
      <div>
        <label className="label">Cupons de desconto</label>
        <div className="space-y-2">
          {s.coupons.map((c, i) => (
            <div key={i} className="flex gap-2">
              <input className="input font-mono uppercase" placeholder="CÓDIGO" value={c.code} onChange={(e) => setS({ ...s, coupons: s.coupons.map((x, n) => (n === i ? { ...x, code: e.target.value.replace(/\s/g, "") } : x)) })} />
              <input className="input w-24" inputMode="numeric" placeholder="%" value={c.percent || ""} onChange={(e) => setS({ ...s, coupons: s.coupons.map((x, n) => (n === i ? { ...x, percent: Math.min(100, Number(e.target.value) || 0) } : x)) })} />
              <button type="button" className="btn-ghost text-alert" aria-label="Remover cupom" onClick={() => setS({ ...s, coupons: s.coupons.filter((_, n) => n !== i) })}>✕</button>
            </div>
          ))}
          <button type="button" className="btn-ghost" onClick={() => setS({ ...s, coupons: [...s.coupons, { code: "", percent: 10 }] })}>+ Novo cupom</button>
        </div>
      </div>
      <div><label className="label">PIN do painel</label><input className="input" value={s.adminPin} onChange={(e) => setS({ ...s, adminPin: e.target.value })} /></div>
      <button className="btn-primary">Salvar configurações</button>
    </form>
  );
}
