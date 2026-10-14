export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  /** Preço normal, em reais. */
  price: number;
  /** Preço promocional; quando preenchido (e menor que price) o item é uma promoção. */
  promoPrice?: number;
  /** Selo livre no cartão (ex.: "KIT PROMO"); sem preço riscado. */
  badge?: string;
  imageUrl?: string;
  active: boolean;
}

export interface Settings {
  storeName: string;
  /** Somente dígitos, com DDI+DDD. Ex.: 5511999999999 */
  whatsapp: string;
  /** Faixa de destaque no topo da loja (ex.: "Frete grátis acima de R$ 100"). Vazio = oculta. */
  banner: string;
  /** PIN do painel do dono. Proteção leve, só no navegador — ver README. */
  adminPin: string;
}

export interface CartLine {
  productId: string;
  qty: number;
}

export interface Customer {
  name: string;
  /** "retirada" ou "entrega" */
  delivery: "retirada" | "entrega";
  address: string;
  notes: string;
}
