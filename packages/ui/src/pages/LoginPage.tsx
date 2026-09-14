import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBrand } from "../brand/BrandProvider";
import { useData } from "../hooks/DataProvider";
import { Button, Input, Label } from "../components/primitives";
import { Logo } from "../components/Logo";

export function LoginPage() {
  const brand = useBrand();
  const { loginDemo } = useData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);

  function entrarComo(role: "laboratorio" | "clinica") {
    setEnviando(true);
    loginDemo(email, role);
    navigate("/dashboard", { replace: true });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Ambiente de demonstração: o login funciona mesmo sem preencher os campos.
    entrarComo("laboratorio");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2" style={{ fontFamily: "var(--brand-font-body)" }}>
      <div
        className="relative hidden flex-col justify-between p-12 lg:flex"
        style={{ backgroundColor: "var(--brand-sidebar-bg)" }}
      >
        <Logo size="lg" variant="sidebar" />

        <div className="max-w-md">
          <h2
            className="text-3xl leading-tight font-bold"
            style={{ color: "var(--brand-sidebar-accent-text)", fontFamily: "var(--brand-font-title)" }}
          >
            {brand.headline}
          </h2>
          <p className="mt-4 text-sm" style={{ color: "var(--brand-sidebar-text)", opacity: 0.7 }}>
            {brand.subheadline}
          </p>
        </div>

        <div
          className="text-xs"
          style={{ color: "var(--brand-sidebar-text)", opacity: 0.45, fontFamily: "var(--brand-font-mono)" }}
        >
          {brand.statusFlow.join(" → ")}
        </div>
      </div>

      <div className="flex items-center justify-center p-6" style={{ backgroundColor: "var(--brand-bg)" }}>
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo size="sm" />
          </div>

          <h1 className="text-2xl font-semibold" style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}>
            {brand.textos.loginTitulo}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--brand-text-secondary)" }}>
            {brand.textos.loginSubtitulo}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label>E-mail</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="clinica@exemplo.com.br"
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Senha</Label>
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={enviando}>
              {enviando ? "Entrando…" : brand.textos.loginBotaoPrincipal}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => entrarComo("clinica")}
              className="text-sm font-semibold hover:underline"
              style={{ color: "var(--brand-primary)" }}
            >
              {brand.textos.loginLinkSecundario}
            </button>
          </div>

          <p className="mt-6 text-xs" style={{ color: "var(--brand-text-secondary)" }}>
            Ainda não tem acesso? Solicite o cadastro da sua clínica ao {brand.nome} {brand.nomeDestaque}.
          </p>
        </div>
      </div>
    </div>
  );
}
