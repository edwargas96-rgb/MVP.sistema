import type { Product } from "./types";

const inHours = (h: number) => new Date(Date.now() + h * 3600_000).toISOString();

/**
 * Catálogo inicial.
 * - Itens "ig-*" e o kit Test-Boost: ofertas divulgadas no Instagram da loja (posts sem ano visível;
 *   valores e disponibilidade precisam ser confirmados com o dono). Ver docs/INSTAGRAM-IMPORT.md.
 * - Itens "(exemplo)": fictícios (preços, prazos e "restam N"), só para demonstração.
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
  { id: "ig-combo-bluster", name: "Kit Power Whey Bluster 900g + Kreat-X 100g + YoPRO 250ml", description: "100% Power Whey Bluster, creatina Kreat-X e um shake YoPRO de morango.", category: "Suplementos", price: 89.99, badge: "MEGA COMBO", goals: ["massa"], active: true },
  { id: "ig-combo-universal", name: "Kit Whey Animal 900g + Creatina Universal 200g + Coqueteleira", description: "Animal 100% Whey Protein, creatina Universal de 200g e uma coqueteleira.", category: "Suplementos", price: 169.9, badge: "COMBO UNIVERSAL", goals: ["massa"], active: true },
  { id: "ig-kit-high-protein", imageUrl: "./products/kit-high-protein.webp", name: "Kit High Protein 900g + Creatina 300g + Coqueteleira", description: "High Protein de 900g e creatina de 300g, com coqueteleira grátis.", category: "Suplementos", price: 109.9, badge: "COQUETELEIRA GRÁTIS", goals: ["massa"], active: true },
  { id: "ig-combo-nutrata", imageUrl: "./products/combo-nutrata.webp", name: "Kit Beef Protein Nutrata 900g + Creatin Up 300g + Charge Bar 45g", description: "Beef Protein (frutas roxas), Creatin Up neutra e Charge Bar de caramelo e amendoim grátis.", category: "Suplementos", price: 230, badge: "CHARGE BAR GRÁTIS", goals: ["massa"], active: true },
  { id: "ig-beef-nutrata", imageUrl: "./products/beef-nutrata.webp", name: "Beef Protein Nutrata 900g", description: "Beef Protein hidrolisado, sabores frutas tropicais e frutas roxas.", category: "Suplementos", price: 169.9, goals: ["massa", "definicao"], active: true },
  { id: "ig-combo-insane", imageUrl: "./products/combo-insane.webp", name: "Kit Insane Clown + Protein Crush 900g + Pure Creatine 300g", description: "Pré-treino Insane Clown, Protein Crush Under Labz de 900g e Pure Creatine de 300g.", category: "Suplementos", price: 259.9, badge: "COMBO", goals: ["massa", "energia"], active: true },
  { id: "ig-pasta-vitapower", name: "Pasta de Amendoim Vitapower Cookies & Cream 1kg", description: "Pasta de amendoim Vitapower, sabor Cookies & Cream.", category: "Bebidas e Snacks", price: 44.9, active: true },
  { id: "whey-a", name: "Whey A 900g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 129.9, goals: ["massa", "definicao"], active: true },
  { id: "whey-b", name: "Whey B 900g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 159.9, promoPrice: 139.9, promoEndsAt: inHours(26), unitsLeft: 4, goals: ["massa", "definicao"], active: true },
  { id: "creatina-a", imageUrl: "./products/creatina-300g.webp", name: "Creatina A 300g (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 89.9, goals: ["massa"], active: true },
  { id: "pre-treino", name: "Pré-treino (exemplo)", description: "Produto de demonstração.", category: "Suplementos", price: 99.9, promoPrice: 84.9, promoEndsAt: inHours(5), goals: ["energia"], active: true },
];
