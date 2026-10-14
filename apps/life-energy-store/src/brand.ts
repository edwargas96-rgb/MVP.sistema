import type { Settings } from "./types";

/**
 * Valores padrão. O dono altera tudo isso pelo painel (/#/admin → Configurações).
 * ATENÇÃO: o número de WhatsApp abaixo é um PLACEHOLDER — trocar pelo real.
 */
export const defaultSettings: Settings = {
  storeName: "Life Energy Store",
  whatsapp: "5500000000000",
  banner: "🔥 Promoções da semana — peça pelo WhatsApp!",
  adminPin: "1234",
};

export const CATEGORIES = ["Suplementos", "Vestuário", "Acessórios", "Bebidas e Snacks", "Outros"];
