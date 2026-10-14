export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  /** Preço normal, em reais. */
  price: number;
  /** Preço promocional; vale enquanto menor que price e antes de promoEndsAt. */
  promoPrice?: number;
  /** Fim da promoção (ISO). Depois disso o preço volta ao normal sozinho. */
  promoEndsAt?: string;
  /** Unidades restantes; quando <= 5 aparece o aviso "restam N". */
  unitsLeft?: number;
  /** Objetivos (ids de GOALS) para a compra por objetivo. */
  goals?: string[];
  /** Selo livre no cartão (ex.: "KIT PROMO"); sem preço riscado. */
  badge?: string;
  imageUrl?: string;
  active: boolean;
}

export interface KitTier {
  /** Quantidade mínima de itens no kit montado. */
  items: number;
  /** Desconto em % sobre o kit. */
  percent: number;
}

export interface Settings {
  storeName: string;
  /** Somente dígitos, com DDI+DDD. Ex.: 5511999999999 */
  whatsapp: string;
  /** Faixa de destaque no topo da loja. Vazio = oculta. */
  banner: string;
  /** PIN do painel do dono. Proteção leve, só no navegador — ver SCOPE.md. */
  adminPin: string;
  /** Descontos do "Monte seu kit". */
  kitTiers: KitTier[];
}

export interface CartLine {
  productId: string;
  qty: number;
  /** Item do "Monte seu kit" (recebe o desconto do kit). */
  kit?: boolean;
}

export type Payment = "pix" | "cartao" | "dinheiro";

export interface Customer {
  name: string;
  delivery: "retirada" | "entrega";
  address: string;
  payment: Payment;
  notes: string;
}

export interface Order {
  id: string;
  number: string;
  createdAt: string;
  customerName: string;
  total: number;
  text: string;
}
