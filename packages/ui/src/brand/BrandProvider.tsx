import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { BrandConfig } from "./BrandConfig";

const BrandContext = createContext<BrandConfig | null>(null);

export function BrandProvider({ brand, children }: { brand: BrandConfig; children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand-primary", brand.cores.primaria);
    root.style.setProperty("--brand-primary-dark", brand.cores.primariaEscura);
    root.style.setProperty("--brand-bg", brand.cores.fundo);
    root.style.setProperty("--brand-surface", brand.cores.superficie);
    root.style.setProperty("--brand-text", brand.cores.texto);
    root.style.setProperty("--brand-text-secondary", brand.cores.textoSecundario);
    root.style.setProperty("--brand-border", brand.cores.borda);
    root.style.setProperty("--brand-sidebar-bg", brand.cores.sidebarFundo);
    root.style.setProperty("--brand-sidebar-text", brand.cores.sidebarTexto);
    root.style.setProperty("--brand-sidebar-accent", brand.cores.sidebarAccent);
    root.style.setProperty("--brand-sidebar-accent-text", brand.cores.sidebarAccentTexto);
    root.style.setProperty("--brand-sidebar-border", brand.cores.sidebarBorda);
    root.style.setProperty("--brand-sidebar-primary", brand.cores.sidebarPrimaria);
    root.style.setProperty("--brand-font-title", brand.fontes.titulo);
    root.style.setProperty("--brand-font-body", brand.fontes.corpo);
    root.style.setProperty("--brand-font-mono", brand.fontes.mono);
    document.title = brand.nome;
  }, [brand]);

  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandConfig {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand deve ser usado dentro de um BrandProvider");
  return ctx;
}

export function useLogoAvailable(brand: BrandConfig) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => !cancelled && setAvailable(true);
    img.onerror = () => !cancelled && setAvailable(false);
    img.src = brand.logoPath;
    return () => {
      cancelled = true;
    };
  }, [brand.logoPath]);
  return available;
}
