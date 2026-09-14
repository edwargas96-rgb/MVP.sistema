import type { BrandConfig } from "@mvp/ui";

export const brand: BrandConfig = {
  id: "ultra-dental",
  nome: "ULTRA",
  nomeDestaque: "DENTAL LAB",
  tagline: "Precisão Digital",
  cidade: "Maringá",
  estado: "PR",
  responsavelLabel: "Técnico responsável",
  responsavelNome: "Equipe Ultra Dental Lab",
  descricao: "Acesso das clínicas e dentistas parceiros. Use o e-mail e a senha do seu cadastro.",
  headline: "Precisão CAD/CAM do escaneamento à fresagem em cinco eixos.",
  subheadline:
    "Rastreie cada caso em tempo real, envie arquivos STL e PLY e fale direto com o técnico responsável pelo seu trabalho.",
  cores: {
    primaria: "#0D9488",
    primariaEscura: "#0F766E",
    fundo: "#F1F5F4",
    superficie: "#FFFFFF",
    texto: "#0F172A",
    textoSecundario: "#54687A",
    borda: "#DCE6E3",
    sidebarFundo: "#0A1210",
    sidebarTexto: "#DCEAE6",
    sidebarAccent: "#142521",
    sidebarAccentTexto: "#FFFFFF",
    sidebarBorda: "#1F332E",
    sidebarPrimaria: "#2DD4BF",
  },
  fontes: {
    titulo: "'Space Grotesk', sans-serif",
    corpo: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  logoPath: "/brand/logo.png",
  compatibilidades: ["3Shape", "Medit", "Cerec", "iTero"],
};
