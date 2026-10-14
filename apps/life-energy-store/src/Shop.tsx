import { useState } from "react";
import { GOALS } from "./brand";
import Cart from "./Cart";
import KitBuilder from "./KitBuilder";
import ProductCard from "./ProductCard";
import Tips from "./Tips";
import { StoriesRow, StoryViewer } from "./Stories";
import { isHighlight, useNow, useOrders } from "./store";
import type { CartLine, Product, Settings } from "./types";

interface Props {
  products: Product[];
  settings: Settings;
  cart: CartLine[];
  setCart: (c: CartLine[]) => void;
}

export default function Shop({ products, settings, cart, setCart }: Props) {
  const now = useNow();
  const [orders, setOrders] = useOrders();
  const [category, setCategory] = useState("Todas");
  const [goal, setGoal] = useState<string | null>(null);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [query, setQuery] = useState("");
  const [panel, setPanel] = useState<"cart" | "kit" | null>(null);
  const [story, setStory] = useState<number | null>(null);

  const active = products.filter((p) => p.active);
  const categories = ["Todas", ...Array.from(new Set(active.map((p) => p.category)))];
  const highlights = active.filter((p) => isHighlight(p, now));
  const visible = active.filter(
    (p) =>
      (category === "Todas" || p.category === category) &&
      (!goal || p.goals?.includes(goal)) &&
      (!onlyPromo || isHighlight(p, now)) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );

  const count = cart.reduce((s, l) => s + l.qty, 0);
  const add = (id: string) => {
    const l = cart.find((x) => x.productId === id && !x.kit);
    setCart(l ? cart.map((x) => (x === l ? { ...x, qty: x.qty + 1 } : x)) : [...cart, { productId: id, qty: 1 }]);
  };

  return (
    <div className="min-h-screen">
      {settings.banner && <div className="bg-brand px-4 py-1.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-black">{settings.banner}</div>}
      <header className="sticky top-0 z-10 border-b bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
          <h1 className="flex items-center gap-2.5">
            <img src="./brand/logo.png" alt="" className="h-10 w-10 rounded" />
            <span className="title text-2xl">{settings.storeName}</span>
          </h1>
          <button className="btn-primary" onClick={() => setPanel("cart")}>Pedido · {count}</button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-6">
        <StoriesRow items={highlights} onOpen={setStory} />

        <Tips onSearch={(term) => { setQuery(term); setCategory("Todas"); setGoal(null); setOnlyPromo(false); setTimeout(() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }), 50); }} />

        <section aria-labelledby="goals">
          <h2 id="goals" className="title mb-3 text-3xl">Qual é o seu objetivo?</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {GOALS.map((g) => (
              <button key={g.id} onClick={() => setGoal(goal === g.id ? null : g.id)} aria-pressed={goal === g.id}
                className={`cut-sm border p-3 text-left transition ${goal === g.id ? "border-brand bg-brand text-black" : "border-steel bg-plate hover:border-brand"}`}>
                <div className="title text-xl">{g.label}</div>
                <div className={`mt-1 text-xs ${goal === g.id ? "text-black/70" : "text-neutral-400"}`}>{g.hint}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="cut flex flex-col items-start justify-between gap-3 border border-brand/50 bg-brand-soft p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="title text-3xl text-brand">Monte seu kit</h2>
            <p className="text-sm text-neutral-300">Escolha 2 ou mais produtos e veja o desconto aparecer na hora.</p>
          </div>
          <button className="btn-primary" onClick={() => setPanel("kit")}>Montar meu kit</button>
        </section>

        <section aria-labelledby="catalog">
          <h2 id="catalog" className="title mb-3 text-3xl">Produtos</h2>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <input className="input sm:max-w-xs" placeholder="Buscar produto…" value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`chip ${category === c ? "chip-on" : ""}`}>{c}</button>)}
              <button onClick={() => setOnlyPromo(!onlyPromo)} className={`chip ${onlyPromo ? "chip-on" : ""}`}>Só promoções</button>
            </div>
          </div>
          {visible.length === 0 ? (
            <p className="py-12 text-center text-neutral-400">Nenhum produto com esses filtros. Limpe a busca ou o objetivo.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {visible.map((p) => <ProductCard key={p.id} p={p} now={now} onAdd={() => add(p.id)} />)}
            </div>
          )}
        </section>
      </main>

      <footer className="py-8 text-center text-xs text-neutral-500">
        © {settings.storeName} · <a href="#/admin" className="underline">Área do dono</a>
      </footer>

      {story != null && <StoryViewer items={highlights} start={story} now={now} onAdd={add} onClose={() => setStory(null)} />}
      {panel === "kit" && (
        <KitBuilder products={active} settings={settings} now={now} initial={cart} onClose={() => setPanel(null)}
          onConfirm={(lines) => { setCart([...cart.filter((l) => !l.kit), ...lines]); setPanel("cart"); }} />
      )}
      {panel === "cart" && <Cart products={products} settings={settings} cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} now={now} onClose={() => setPanel(null)} />}
    </div>
  );
}
