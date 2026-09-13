import type { BrandConfig } from "@mvp/ui";

export const brand: BrandConfig = {
  id: "ultra-dental",
  nome: "Ultra Dental Lab",
  tagline: "Precisão Digital",
  cidade: "Maringá",
  estado: "PR",
  responsavelLabel: "Técnico responsável",
  responsavelNome: "Equipe Ultra Dental Lab",
  descricao:
    "Rastreabilidade total do escaneamento à finalização — design CAD, fresagem em cinco eixos e contato direto com o técnico responsável.",
  cores: {
    primaria: "#0EA5A0",
    primariaEscura: "#0B7C78",
    fundo: "#0B1220",
    superficie: "#111A2E",
    texto: "#F1F5F9",
    textoSecundario: "#94A3B8",
    borda: "#233047",
  },
  fontes: {
    titulo: "'Space Grotesk', sans-serif",
    corpo: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  logoPath: "/brand/logo.png",
  compatibilidades: ["3Shape", "Medit", "Cerec", "iTero"],
};
