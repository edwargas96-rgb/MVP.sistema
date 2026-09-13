import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBrand } from "../brand/BrandProvider";
import { useData } from "../hooks/DataProvider";
import { Button, Card, ErrorState, Input, Label } from "../components/primitives";
import { Logo } from "../components/Logo";

export function LoginPage() {
  const brand = useBrand();
  const { login, data } = useData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = login(email.trim(), senha.trim());
    if (!user) {
      setErro("E-mail ou senha inválidos. Confira as credenciais de demonstração abaixo.");
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-10"
      style={{ backgroundColor: "var(--brand-bg)", fontFamily: "var(--brand-font-body)" }}
    >
      <div className="mb-8">
        <Logo size="lg" />
      </div>
      <Card className="w-full max-w-md p-6">
        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--brand-text)", fontFamily: "var(--brand-font-title)" }}
        >
          Acessar o sistema
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--brand-text-secondary)" }}>
          {brand.descricao}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label>E-mail</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com.br"
              required
            />
          </div>
          <div>
            <Label>Senha</Label>
            <Input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {erro && <ErrorState message={erro} />}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-slate-50 p-4 text-xs" style={{ color: "var(--brand-text-secondary)" }}>
          <p className="mb-2 font-semibold" style={{ color: "var(--brand-text)" }}>
            Credenciais de demonstração
          </p>
          <ul className="space-y-1">
            {data.credentials.map((c) => (
              <li key={c.email}>
                <span className="font-medium">{c.user.role === "laboratorio" ? "Laboratório" : "Clínica"}:</span>{" "}
                {c.email} / {c.senha}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
