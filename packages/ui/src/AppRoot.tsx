import { Navigate, Route, HashRouter, Routes } from "react-router-dom";
import type { BrandConfig } from "./brand/BrandConfig";
import { BrandProvider } from "./brand/BrandProvider";
import { DataProvider, useData } from "./hooks/DataProvider";
import type { LabDataset } from "./types";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { NovaOrdemPage } from "./pages/NovaOrdemPage";
import { OrdensListPage } from "./pages/OrdensListPage";
import { OrdemDetalhePage } from "./pages/OrdemDetalhePage";
import { CalendarioPage } from "./pages/CalendarioPage";
import { ClinicasPage } from "./pages/ClinicasPage";
import { PacientesPage } from "./pages/PacientesPage";
import { ConfiguracoesPage } from "./pages/ConfiguracoesPage";

function Protected({ children, labOnly = false }: { children: React.ReactNode; labOnly?: boolean }) {
  const { currentUser } = useData();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (labOnly && currentUser.role !== "laboratorio") return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export function AppRoot({ brand, seed }: { brand: BrandConfig; seed: LabDataset }) {
  return (
    <BrandProvider brand={brand}>
      <DataProvider brandId={brand.id} seed={seed}>
        <style>{`
          @keyframes lab-fade-in {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
            <Route path="/nova-ordem" element={<Protected><NovaOrdemPage /></Protected>} />
            <Route path="/ordens" element={<Protected><OrdensListPage /></Protected>} />
            <Route path="/ordens/:id" element={<Protected><OrdemDetalhePage /></Protected>} />
            <Route path="/calendario" element={<Protected><CalendarioPage /></Protected>} />
            <Route path="/clinicas" element={<Protected labOnly><ClinicasPage /></Protected>} />
            <Route path="/pacientes" element={<Protected><PacientesPage /></Protected>} />
            <Route path="/configuracoes" element={<Protected labOnly><ConfiguracoesPage /></Protected>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </HashRouter>
      </DataProvider>
    </BrandProvider>
  );
}
