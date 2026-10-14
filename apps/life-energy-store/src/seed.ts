import type { Product } from "./types";

/**
 * Catálogo inicial de exemplo. Só o kit Whey Test-Boost + Creatina vem de uma promoção real da loja;
 * os demais itens e todos os preços marcados "(exemplo)" são fictícios, para o dono substituir pelo painel.
 */
export const seedProducts: Product[] = [
  {
    id: "kit-whey-creatina",
    name: "Kit Whey Test-Boost 900g + Creatina Max 300g",
    description: "Oferta imperdível: Whey Test-Boost 900g (sabor morango) + Creatina 300g com 50% de desconto.",
    category: "Suplementos",
    price: 139.95,
    badge: "KIT PROMO",
    imageUrl: "./promo/kit-whey-creatina.png",
    active: true,
  },
  { id: "whey-a", name: "Whey A 900g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 129.9, active: true },
  { id: "whey-b", name: "Whey B 900g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 159.9, promoPrice: 139.9, active: true },
  { id: "creatina-a", name: "Creatina A 300g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 89.9, active: true },
  { id: "pre-treino", name: "Pré-treino (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 99.9, promoPrice: 84.9, active: true },
];
