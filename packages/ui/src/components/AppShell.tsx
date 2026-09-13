import { useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useBrand } from "../brand/BrandProvider";
import { useData } from "../hooks/DataProvider";
import { Logo } from "./Logo";

interface NavItem {
  to: string;
  label: string;
  icon: string;
  labOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", label: "Painel", icon: "📊" },
  { to: "/ordens", label: "Ordens de serviço", icon: "🧾" },
  { to: "/nova-ordem", label: "Nova ordem", icon: "➕" },
  { to: "/calendario", label: "Calendário", icon: "🗓️" },
  { to: "/pacientes", label: "Pacientes", icon: "🧑‍⚕️" },
  { to: "/clinicas", label: "Clínicas", icon: "🏥", labOnly: true },
  { to: "/configuracoes", label: "Configurações", icon: "⚙️", labOnly: true },
];

export function AppShell({ children }: { children: ReactNode }) {
  const brand = useBrand();
  const { currentUser, logout } = useData();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const items = NAV_ITEMS.filter((i) => !i.labOnly || currentUser?.role === "laboratorio");

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--brand-bg)", fontFamily: "var(--brand-font-body)" }}>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r p-5 transition-transform md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "var(--brand-surface)", borderColor: "var(--brand-border)" }}
      >
        <div className="mb-8">
          <Logo size="md" />
        </div>
        <nav className="space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "hover:bg-black/5"
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "var(--brand-primary)" : "transparent",
                color: isActive ? "white" : "var(--brand-text)",
              })}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 border-t pt-4" style={{ borderColor: "var(--brand-border)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--brand-text)" }}>
            {currentUser?.nome}
          </p>
          <p className="text-xs" style={{ color: "var(--brand-text-secondary)" }}>
            {currentUser?.role === "laboratorio" ? "Laboratório" : "Clínica parceira"}
          </p>
          <button
            onClick={handleLogout}
            className="mt-3 text-xs font-semibold hover:underline"
            style={{ color: "var(--brand-primary)" }}
          >
            Sair da conta
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="flex-1">
        <header
          className="flex items-center justify-between border-b px-4 py-3 md:hidden"
          style={{ backgroundColor: "var(--brand-surface)", borderColor: "var(--brand-border)" }}
        >
          <Logo size="sm" />
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg border px-3 py-1.5 text-sm"
            style={{ borderColor: "var(--brand-border)" }}
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">{children}</main>
        <footer className="px-4 pb-6 text-center text-xs md:px-8" style={{ color: "var(--brand-text-secondary)" }}>
          {brand.nome} · {brand.cidade}/{brand.estado} · Ambiente de demonstração (MVP)
        </footer>
      </div>
    </div>
  );
}
