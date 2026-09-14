import { useBrand, useLogoAvailable } from "../brand/BrandProvider";

export function Logo({ size = "md", variant = "default" }: { size?: "sm" | "md" | "lg"; variant?: "default" | "sidebar" }) {
  const brand = useBrand();
  const available = useLogoAvailable(brand);
  const heights = { sm: 36, md: 44, lg: 56 };
  const height = heights[size];
  const isSidebar = variant === "sidebar";

  return (
    <div className="flex items-center gap-3">
      {available ? (
        <img
          src={brand.logoPath}
          alt={brand.nome}
          className="shrink-0 rounded-xl object-contain"
          style={{ height, width: height }}
        />
      ) : (
        <div
          className="flex shrink-0 items-center justify-center rounded-xl font-bold"
          style={{
            height,
            width: height,
            backgroundColor: isSidebar ? "var(--brand-sidebar-accent)" : "var(--brand-primary)",
            color: isSidebar ? "var(--brand-sidebar-primary)" : "white",
            fontFamily: "var(--brand-font-title)",
            fontSize: height * 0.42,
          }}
          aria-hidden
        >
          {brand.nomeDestaque.charAt(0)}
        </div>
      )}
      <div className="min-w-0 flex-1 overflow-hidden">
        <div
          className="font-bold leading-tight break-words"
          style={{
            fontFamily: "var(--brand-font-title)",
            color: isSidebar ? "var(--brand-sidebar-accent-text)" : "var(--brand-text)",
            fontSize: isSidebar ? (size === "lg" ? 22 : 15) : size === "lg" ? 24 : size === "md" ? 18 : 15,
          }}
        >
          {brand.nome}{" "}
          <span style={{ color: isSidebar ? "var(--brand-sidebar-primary)" : "var(--brand-primary)" }}>
            {brand.nomeDestaque}
          </span>
        </div>
        <div
          className="mt-1.5 truncate text-[11px] uppercase"
          style={{
            letterSpacing: "0.14em",
            color: isSidebar ? "var(--brand-sidebar-text)" : "var(--brand-text-secondary)",
            opacity: isSidebar ? 0.55 : 1,
          }}
        >
          {brand.tagline}
        </div>
      </div>
    </div>
  );
}
