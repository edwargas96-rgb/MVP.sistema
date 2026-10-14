import type { Product } from "./types";

const inHours = (h: number) => new Date(Date.now() + h * 3600_000).toISOString();

/**
 * Catálogo inicial de exemplo. Só o kit Whey Test-Boost + Creatina vem de uma promoção real da loja;
 * os demais itens, preços, prazos e "restam N" são fictícios, para o dono substituir pelo painel.
 */
export const seedProducts: Product[] = [
  {
    id: "kit-whey-creatina",
    name: "Kit Whey Test-Boost 900g + Creatina Max 300g",
    description: "Whey Test-Boost 900g (morango) + Creatina 300g com 50% de desconto.",
    category: "Suplementos",
    price: 139.95,
    badge: "KIT PROMO",
    goals: ["massa"],
    imageUrl: "./promo/kit-whey-creatina.png",
    active: true,
  },
  { id: "whey-a", name: "Whey A 900g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 129.9, goals: ["massa", "definicao"], active: true },
  { id: "whey-b", name: "Whey B 900g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 159.9, promoPrice: 139.9, promoEndsAt: inHours(26), unitsLeft: 4, goals: ["massa", "definicao"], active: true },
  { id: "creatina-a", name: "Creatina A 300g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 89.9, goals: ["massa"], active: true },
  { id: "pre-treino", name: "Pré-treino (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 99.9, promoPrice: 84.9, promoEndsAt: inHours(5), goals: ["energia"], active: true },
];
