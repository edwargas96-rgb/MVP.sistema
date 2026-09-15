import { useState, type ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  ClipboardList,
  FilePlus,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useBrand } from "../brand/BrandProvider";
import { useData } from "../hooks/DataProvider";
import { Logo } from "./Logo";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const BASE_ITEMS: NavItem[] = [{ to: "/dashboard", label: "Painel", icon: LayoutDashboard }];
const CLINICA_ITEMS: NavItem[] = [
  { to: "/nova-ordem", label: "Nova ordem", icon: FilePlus },
  { to: "/calendario", label: "Calendário", icon: CalendarDays },
  { to: "/pacientes", label: "Pacientes", icon: Users },
];
const LAB_ITEMS: NavItem[] = [
  { to: "/ordens", label: "Ordens", icon: ClipboardList },
  { to: "/nova-ordem", label: "Nova ordem", icon: FilePlus },
  { to: "/calendario", label: "Calendário", icon: CalendarDays },
  { to: "/pacientes", label: "Pacientes", icon: Users },
  { to: "/clinicas", label: "Clínicas", icon: Building2 },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
];

function SidebarHeader() {
  const brand = useBrand();
  return (
    <div className="flex min-w-0 items-center gap-3 overflow-hidden px-5 py-6">
      <Logo size={brand.sidebarLogoSomenteImagem ? "lg" : "md"} variant="sidebar" showText={!brand.sidebarLogoSomenteImagem} />
    </div>
  );
}

function SidebarFooter({ onLogout }: { onLogout: () => void }) {
  const { currentUser, clinicName } = useData();
  return (
    <div className="border-t px-4 py-4" style={{ borderColor: "var(--brand-sidebar-border)" }}>
      <div className="truncate text-sm font-medium" style={{ color: "var(--brand-sidebar-accent-text)" }}>
        {currentUser?.nome}
      </div>
      <div className="truncate text-xs" style={{ color: "var(--brand-sidebar-text)", opacity: 0.6 }}>
        {currentUser?.role === "laboratorio" ? "Laboratório" : currentUser?.clinicId ? clinicName(currentUser.clinicId) : "Clínica"}
      </div>
      <button
        onClick={onLogout}
        className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:opacity-80"
        style={{ color: "var(--brand-sidebar-text)", opacity: 0.85 }}
      >
        <LogOut className="size-4" />
        Sair
      </button>
    </div>
  );
}

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate: () => void }) {
  return (
    <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "var(--brand-sidebar-accent)" : "transparent",
            color: isActive ? "var(--brand-sidebar-accent-text)" : "var(--brand-sidebar-text)",
            opacity: isActive ? 1 : 0.8,
            fontWeight: isActive ? 600 : 400,
          })}
        >
          <item.icon className="size-4.5 shrink-0" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function AppShell({
  titulo,
  descricao,
  acao,
  children,
}: {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
  children: ReactNode;
}) {
  const { currentUser, logout } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = [...BASE_ITEMS, ...(currentUser?.role === "laboratorio" ? LAB_ITEMS : CLINICA_ITEMS)];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen w-full" style={{ backgroundColor: "var(--brand-bg)", fontFamily: "var(--brand-font-body)" }}>
      <aside
        className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col md:flex"
        style={{ backgroundColor: "var(--brand-sidebar-bg)" }}
      >
        <SidebarHeader />
        <NavList items={items} onNavigate={() => {}} />
        <SidebarFooter onLogout={handleLogout} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col" style={{ backgroundColor: "var(--brand-sidebar-bg)" }}>
            <div className="flex items-start justify-between">
              <SidebarHeader />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu"
                className="mt-6 mr-4"
                style={{ color: "var(--brand-sidebar-text)", opacity: 0.7 }}
              >
                <X className="size-5" />
              </button>
            </div>
            <NavList items={items} onNavigate={() => setMobileOpen(false)} />
            <SidebarFooter onLogout={handleLogout} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="sticky top-0 z-30 border-b backdrop-blur"
          style={{ borderColor: "var(--brand-border)", backgroundColor: "color-mix(in srgb, var(--brand-bg) 85%, transparent)" }}
        >
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              className="rounded-md p-1.5 md:hidden"
              style={{ color: "var(--brand-text-secondary)" }}
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1
                className="truncate text-xl font-semibold sm:text-2xl"
                style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}
              >
                {titulo}
              </h1>
              {descricao && (
                <p className="truncate text-sm" style={{ color: "var(--brand-text-secondary)" }}>
                  {descricao}
                </p>
              )}
            </div>
            {acao}
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div key={location.pathname} className="animate-[lab-fade-in_280ms_ease-out]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
