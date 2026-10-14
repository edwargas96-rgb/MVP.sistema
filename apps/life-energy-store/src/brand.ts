import type { Settings } from "./types";

/**
 * Valores padrão. O dono altera tudo isso pelo painel (/#/admin → Configurações).
 * WhatsApp da loja: +55 41 98480-4537.
 */
export const defaultSettings: Settings = {
  storeName: "Life Energy Store",
  whatsapp: "5541984804537",
  banner: "🔥 Promoções da semana — peça pelo WhatsApp!",
  adminPin: "1234",
};

export const CATEGORIES = ["Suplementos", "Vestuário", "Acessórios", "Bebidas e Snacks", "Outros"];
