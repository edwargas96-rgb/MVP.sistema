import type { Settings } from "./types";

export const defaultSettings: Settings = {
  storeName: "Life Energy Store",
  whatsapp: "5541984804537",
  banner: "⚡ Promoções da semana — peça pelo WhatsApp",
  adminPin: "1234",
  // Exemplo: o dono deve confirmar/ajustar estes percentuais em Configurações.
  kitTiers: [
    { items: 2, percent: 5 },
    { items: 3, percent: 8 },
    { items: 4, percent: 10 },
  ],
  // Exemplo para demonstração: o dono cria/remove cupons em Configurações.
  coupons: [{ code: "LIFE10", percent: 10 }],
};

export const CATEGORIES = ["Suplementos", "Vestuário", "Acessórios", "Bebidas e Snacks", "Outros"];

export const GOALS = [
  { id: "massa", label: "Ganhar massa", hint: "Whey, hipercalóricos, creatina" },
  { id: "energia", label: "Energia no treino", hint: "Pré-treino, cafeína, carbo" },
  { id: "definicao", label: "Definição", hint: "Termogênicos, proteínas leves" },
  { id: "saude", label: "Saúde e rotina", hint: "Vitaminas, ômega, colágeno" },
] as const;

export const PAYMENTS = { pix: "Pix", cartao: "Cartão", dinheiro: "Dinheiro" } as const;
