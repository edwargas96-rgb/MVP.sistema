export interface StatCardConfig {
  label: string;
  /** "atrasadas" is computed from prazo < hoje && status não é o último da statusFlow. Qualquer outro valor filtra pelas statuses informadas. */
  tipo: "status" | "atrasadas";
  statuses?: string[];
}

export interface BrandTextos {
  loginTitulo: string;
  loginSubtitulo: string;
  loginBotaoPrincipal: string;
  loginLinkSecundario: string;
  dashboardTituloLab: string;
  dashboardSubtituloLab: string;
  dashboardTituloClinica: string;
  dashboardSubtituloClinica: string;
  novaOrdemTitulo: string;
  novaOrdemSubtitulo: string;
  uploadTitulo: string;
  uploadSubtitulo: string;
}

export interface BrandConfig {
  id: string;
  nome: string;
  nomeDestaque: string;
  tagline: string;
  cidade: string;
  estado: string;
  responsavelLabel: string;
  responsavelNome: string;
  headline: string;
  subheadline: string;
  /** Etapas do fluxo de produção, na ordem. A última é considerada "concluída". */
  statusFlow: string[];
  dashboard: {
    statCards: StatCardConfig[];
  };
  textos: BrandTextos;
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
    statusNeutroBg: string;
    statusNeutroTexto: string;
    statusInfoBg: string;
    statusInfoTexto: string;
    statusAlertaBg: string;
    statusAlertaTexto: string;
    statusSucessoBg: string;
    statusSucessoTexto: string;
    statusErroBg: string;
    statusErroTexto: string;
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
  /**
   * Imagem decorativa opcional (ex.: ícone de dente da marca) exibida como
   * destaque discreto na tela de login. Omitido = nenhuma imagem extra.
   */
  imagemDestaque?: string;
  compatibilidades?: string[];
}
