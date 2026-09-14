export interface BrandConfig {
  id: string;
  nome: string;
  nomeDestaque: string;
  tagline: string;
  cidade: string;
  estado: string;
  responsavelLabel: string;
  responsavelNome: string;
  descricao: string;
  headline: string;
  subheadline: string;
  cores: {
    primaria: string;
    primariaEscura: string;
    fundo: string;
    superficie: string;
    texto: string;
    textoSecundario: string;
    borda: string;
    sidebarFundo: string;
    sidebarTexto: string;
    sidebarAccent: string;
    sidebarAccentTexto: string;
    sidebarBorda: string;
    sidebarPrimaria: string;
  };
  fontes: {
    titulo: string;
    corpo: string;
    mono: string;
  };
  /**
   * Path under /public/brand/ where the real logo file should be dropped in.
   * Until it exists, the UI falls back to a text wordmark using `nome`.
   */
  logoPath: string;
  compatibilidades?: string[];
}
