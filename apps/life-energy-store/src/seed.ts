import type { Product } from "./types";

/** Produtos fictícios de demonstração (preços e nomes NÃO são os da loja real). */
export const seedProducts: Product[] = [
  { id: "p1", name: "Whey Protein 900g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 149.9, promoPrice: 129.9, active: true },
  { id: "p2", name: "Creatina 300g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 89.9, active: true },
  { id: "p3", name: "Camiseta Dry Fit (exemplo)", description: "Produto de demonstração.", category: "Vestuário", price: 59.9, promoPrice: 44.9, active: true },
  { id: "p4", name: "Garrafa 1L (exemplo)", description: "Produto de demonstração.", category: "Acessórios", price: 29.9, active: true },
  { id: "p5", name: "Barra de Proteína (exemplo)", description: "Produto de demonstração.", category: "Bebidas e Snacks", price: 9.9, promoPrice: 7.9, active: true },
];
