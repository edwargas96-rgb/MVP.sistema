import type { BrandConfig } from "@mvp/ui";

export const brand: BrandConfig = {
  id: "lv-laboratorio",
  nome: "LV Laboratório Dental",
  tagline: "Prótese Dentária",
  cidade: "Caxias do Sul",
  estado: "RS",
  responsavelLabel: "Responsável técnico",
  responsavelNome: "Lucas de Vargas",
  descricao:
    "Acompanhe suas ordens de serviço com a proximidade e o cuidado no acabamento que aproximam o LV Laboratório do dentista.",
  cores: {
    primaria: "#1565C0",
    primariaEscura: "#0D47A1",
    fundo: "#F2F6FA",
    superficie: "#FFFFFF",
    texto: "#152331",
    textoSecundario: "#5B6B78",
    borda: "#DDE6EE",
  },
  fontes: {
    titulo: "'Space Grotesk', sans-serif",
    corpo: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  logoPath: "/brand/logo.png",
};
