/** Shared Tailwind preset for all lab apps. Brand colors are applied at runtime via CSS variables (see BrandProvider), not here. */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--brand-font-title)"],
        body: ["var(--brand-font-body)"],
        mono: ["var(--brand-font-mono)"],
      },
    },
  },
};
