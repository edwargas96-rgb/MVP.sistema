export type TipKind = "Receitas" | "Suplementos" | "Rotina";

export interface Tip {
  id: string;
  kind: TipKind;
  title: string;
  summary: string;
  /** Passos ou pontos principais, um por linha. */
  body: string[];
  /** Botão opcional que filtra o catálogo por este termo. */
  cta?: { label: string; search: string };
}

/**
 * Conteúdo genérico de partida (sem promessas de resultado, sem números nutricionais).
 * O dono poderá editar/publicar dicas pelo painel quando houver backend.
 */
export const tips: Tip[] = [
  {
    id: "panqueca",
    kind: "Receitas",
    title: "Panqueca de banana, aveia e whey",
    summary: "Café da manhã rápido, feito em uma frigideira.",
    body: ["Amasse 1 banana e misture com 2 ovos.", "Acrescente 3 colheres (sopa) de aveia e 1 scoop de whey.", "Cozinhe em frigideira antiaderente, uns 2 minutos de cada lado.", "Finalize com fruta ou mel, se quiser."],
    cta: { label: "Ver whey", search: "Whey" },
  },
  {
    id: "overnight",
    kind: "Receitas",
    title: "Aveia da noite com whey",
    summary: "Deixe pronta na geladeira e leve para o trabalho.",
    body: ["Em um pote, misture 4 colheres (sopa) de aveia e 150 ml de leite (ou bebida vegetal).", "Junte 1 scoop de whey e mexa bem.", "Tampe e deixe na geladeira durante a noite.", "Na hora de comer, cubra com frutas."],
    cta: { label: "Ver whey", search: "Whey" },
  },
  {
    id: "shake",
    kind: "Receitas",
    title: "Shake pós-treino de banana",
    summary: "Três ingredientes e o liquidificador.",
    body: ["Bata 1 scoop de whey, 1 banana e 200 ml de leite ou água.", "Adicione gelo para ficar mais cremoso.", "Beba logo depois de preparar."],
    cta: { label: "Ver whey", search: "Whey" },
  },
  {
    id: "creatina",
    kind: "Suplementos",
    title: "Creatina: para que serve",
    summary: "Um dos suplementos mais estudados no esporte.",
    body: [
      "A creatina (a mais usada é a monohidratada) pode ajudar na força e no desempenho em exercícios curtos e intensos, como a musculação.",
      "Combinada com treino regular, também pode contribuir para o ganho de massa magra.",
      "O uso mais comum é de 3 a 5 g por dia, todos os dias. Não há horário obrigatório.",
      "Beba água ao longo do dia.",
      "Se você tem alguma doença, sobretudo dos rins, ou toma medicamentos, converse antes com seu médico ou nutricionista.",
    ],
    cta: { label: "Ver creatinas", search: "Creatina" },
  },
  {
    id: "whey",
    kind: "Suplementos",
    title: "Whey: quando faz sentido",
    summary: "Praticidade para completar a proteína do dia.",
    body: ["É um complemento, não substitui refeição.", "O que mais conta é a proteína total do dia, não o horário do shake.", "Ajuda quando a rotina corrida deixa a alimentação faltando proteína.", "Se tiver intolerância à lactose, leia o rótulo e escolha o tipo adequado."],
    cta: { label: "Ver whey", search: "Whey" },
  },
  {
    id: "pre",
    kind: "Suplementos",
    title: "Pré-treino: use com atenção",
    summary: "A maioria contém cafeína.",
    body: ["Comece com uma porção menor para ver como seu corpo reage.", "Evite perto da hora de dormir.", "Some a cafeína de café, chás e energéticos do dia.", "Gestantes, hipertensos e pessoas com problemas de coração devem consultar um profissional antes."],
    cta: { label: "Ver pré-treino", search: "Pré" },
  },
  {
    id: "agua",
    kind: "Rotina",
    title: "Água ao longo do dia",
    summary: "Não espere a sede chegar no treino.",
    body: ["Leve uma garrafa e beba aos poucos durante o dia.", "No treino, faça pequenos goles entre as séries.", "Se o calor ou o suor forem intensos, aumente a quantidade."],
  },
  {
    id: "sono",
    kind: "Rotina",
    title: "Sono também é treino",
    summary: "É durante o descanso que o corpo se recupera.",
    body: ["Procure dormir e acordar em horários parecidos.", "Reduza telas e cafeína no fim do dia.", "Treinar cansado e sem dormir bem costuma render menos."],
  },
];
