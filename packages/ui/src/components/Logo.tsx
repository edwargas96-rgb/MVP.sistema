import { useBrand, useLogoAvailable } from "../brand/BrandProvider";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const brand = useBrand();
  const available = useLogoAvailable(brand);
  const heights = { sm: 28, md: 36, lg: 56 };
  const height = heights[size];

  if (available) {
    return (
      <img
        src={brand.logoPath}
        alt={brand.nome}
        style={{ height, width: "auto", objectFit: "contain" }}
      />
    );
  }

  return (
    <div className="flex flex-col leading-tight select-none">
      <span
        style={{
          fontFamily: "var(--brand-font-title)",
          color: "var(--brand-text)",
          fontSize: size === "lg" ? 26 : size === "md" ? 19 : 15,
          fontWeight: 700,
          letterSpacing: "-0.01em",
        }}
      >
        {brand.nome}
      </span>
      <span
        style={{
          fontFamily: "var(--brand-font-body)",
          color: "var(--brand-primary)",
          fontSize: size === "lg" ? 11 : 9,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {brand.tagline}
      </span>
    </div>
  );
}
