import type { LabDataset } from "@mvp/ui";

const clinicOralTech = "cli-oral-tech";
const clinicImplantCenter = "cli-implant-center";
const clinicBiovidaOdonto = "cli-biovida-odonto";

export const seed: LabDataset = {
  clinics: [
    {
      id: clinicOralTech,
      nome: "OralTech Implantes",
      responsavel: "Dr. Fernando Kuster",
      telefone: "(41) 3352-1190",
      email: "contato@oraltechimplantes.com.br",
      endereco: "Av. Sete de Setembro, 4120 — Curitiba/PR",
      documento: "45.678.901/0001-33",
      ativo: true,
    },
    {
      id: clinicImplantCenter,
      nome: "Implant Center Curitiba",
      responsavel: "Dra. Juliana Wroblevski",
      telefone: "(41) 3029-6644",
      email: "atendimento@implantcentercuritiba.com.br",
      endereco: "Rua Comendador Araújo, 615 — Curitiba/PR",
      documento: "56.789.012/0001-44",
      ativo: true,
    },
    {
      id: clinicBiovidaOdonto,
      nome: "Biovida Odontologia Avançada",
      responsavel: "Dr. Henrique Lacerda",
      telefone: "(41) 3244-8821",
      email: "clinica@biovidaodonto.com.br",
      endereco: "Al. Dr. Carlos de Carvalho, 980 — Curitiba/PR",
      documento: "67.890.123/0001-55",
      ativo: true,
    },
  ],
  patients: [
    { id: "pac-1", nome: "Marcelo Andrade Reis", clinicId: clinicOralTech, dentista: "Dr. Fernando Kuster" },
    { id: "pac-2", nome: "Camila Souza Prado", clinicId: clinicImplantCenter, dentista: "Dra. Juliana Wroblevski" },
    { id: "pac-3", nome: "Adriano Nakashima", clinicId: clinicBiovidaOdonto, dentista: "Dr. Henrique Lacerda" },
  ],
  catalogs: {
    servicos: [
      "Barra sobre implante",
      "Guia cirúrgico",
      "Prótese sobre implante",
      "Estratificação sobre dissilicato de lítio",
      "Planejamento digital",
      "Trabalho completo (recebimento à entrega)",
    ],
    materiais: ["Titânio fresado", "Dissilicato de lítio", "Zircônia monolítica", "PMMA", "Resina para guia cirúrgico"],
    sistemasImplante: ["Straumann", "Nobel Biocare", "Neodent", "Zimmer Biomet"],
    coresVita: ["A1", "A2", "A3", "B1", "B2", "C2", "D3"],
  },
  credentials: [
    {
      email: "geninho@dlabdigital.com.br",
      senha: "demo123",
      user: { id: "user-lab", nome: "Dr. Geninho Thomé", email: "geninho@dlabdigital.com.br", role: "laboratorio" },
    },
    {
      email: "clinica@oraltechimplantes.com.br",
      senha: "demo123",
      user: {
        id: "user-clinic-1",
        nome: "Dr. Fernando Kuster",
        email: "clinica@oraltechimplantes.com.br",
        role: "clinica",
        clinicId: clinicOralTech,
      },
    },
  ],
  orders: [
    {
      id: "ord-seed-1",
      numero: "OS-0001",
      clinicId: clinicOralTech,
      paciente: "Marcelo Andrade Reis",
      dentista: "Dr. Fernando Kuster",
      servico: "Barra sobre implante",
      elementos: [14, 13, 12, 11, 21, 22, 23, 24],
      sobImplante: true,
      sistemaImplante: "Straumann",
      material: "Titânio fresado",
      cor: "A2",
      prazo: futureDate(4),
      urgente: true,
      observacoes: "Barra híbrida para protocolo superior. Verificar passividade antes da fresagem final.",
      status: "Em produção",
      arquivos: [
        { id: "file-1", nome: "planejamento_digital.stl", tipo: "arquivo", extensao: "stl", tamanhoKb: 9400, criadoEm: daysAgo(7) },
        { id: "file-2", nome: "tomografia.zip", tipo: "arquivo", extensao: "zip", tamanhoKb: 15200, criadoEm: daysAgo(7) },
      ],
      eventos: [
        { id: "evt-1", status: "Recebida", comentario: "Arquivo digital e tomografia recebidos.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(7) },
        { id: "evt-2", status: "Em análise", comentario: "Planejamento digital validado com a clínica.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(6) },
        { id: "evt-3", status: "Em produção", comentario: "Fresagem da barra em titânio em centro de usinagem.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(2) },
      ],
      criadaEm: daysAgo(7),
    },
    {
      id: "ord-seed-2",
      numero: "OS-0002",
      clinicId: clinicImplantCenter,
      paciente: "Camila Souza Prado",
      dentista: "Dra. Juliana Wroblevski",
      servico: "Guia cirúrgico",
      elementos: [16, 15, 14, 24, 25, 26],
      sobImplante: true,
      sistemaImplante: "Nobel Biocare",
      material: "Resina para guia cirúrgico",
      cor: "—",
      prazo: futureDate(3),
      urgente: true,
      observacoes: "Cirurgia agendada — guia deve estar pronto com 48h de antecedência.",
      status: "Em prova",
      arquivos: [
        { id: "file-3", nome: "planejamento_cirurgico.stl", tipo: "arquivo", extensao: "stl", tamanhoKb: 6100, criadoEm: daysAgo(5) },
      ],
      eventos: [
        { id: "evt-4", status: "Recebida", comentario: "Planejamento cirúrgico recebido.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(5) },
        { id: "evt-5", status: "Em produção", comentario: "Impressão 3D do guia concluída.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(2) },
        { id: "evt-6", status: "Em prova", comentario: "Conferência de encaixe antes do envio.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(1) },
      ],
      criadaEm: daysAgo(5),
    },
    {
      id: "ord-seed-3",
      numero: "OS-0003",
      clinicId: clinicBiovidaOdonto,
      paciente: "Adriano Nakashima",
      dentista: "Dr. Henrique Lacerda",
      servico: "Estratificação sobre dissilicato de lítio",
      elementos: [11, 21],
      sobImplante: false,
      material: "Dissilicato de lítio",
      cor: "A1",
      prazo: pastDate(1),
      urgente: false,
      observacoes: "Estratificação para reproduzir translucidez natural dos incisivos centrais.",
      status: "Em análise",
      arquivos: [],
      eventos: [
        { id: "evt-7", status: "Recebida", comentario: "Escaneamento recebido.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(4) },
        { id: "evt-8", status: "Em análise", comentario: "Definição de mapa de cor com o clínico.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(3) },
      ],
      criadaEm: daysAgo(4),
    },
    {
      id: "ord-seed-4",
      numero: "OS-0004",
      clinicId: clinicOralTech,
      paciente: "Marcelo Andrade Reis",
      dentista: "Dr. Fernando Kuster",
      servico: "Planejamento digital",
      elementos: [],
      sobImplante: true,
      sistemaImplante: "Straumann",
      material: "—",
      cor: "—",
      prazo: futureDate(15),
      urgente: false,
      observacoes: "Planejamento para segunda fase do caso, após osseointegração.",
      status: "Recebida",
      arquivos: [],
      eventos: [
        { id: "evt-9", status: "Recebida", comentario: "Ordem criada e recebida pelo laboratório.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(1) },
      ],
      criadaEm: daysAgo(1),
    },
    {
      id: "ord-seed-5",
      numero: "OS-0005",
      clinicId: clinicImplantCenter,
      paciente: "Camila Souza Prado",
      dentista: "Dra. Juliana Wroblevski",
      servico: "Prótese sobre implante",
      elementos: [36, 37, 46, 47],
      sobImplante: true,
      sistemaImplante: "Neodent",
      material: "Zircônia monolítica",
      cor: "A3",
      prazo: pastDate(12),
      urgente: false,
      observacoes: "Trabalho completo, do recebimento à entrega.",
      status: "Enviada/Entregue",
      arquivos: [
        { id: "file-4", nome: "prova_final.jpg", tipo: "foto", extensao: "jpg", tamanhoKb: 1040, criadoEm: daysAgo(14) },
      ],
      eventos: [
        { id: "evt-10", status: "Recebida", comentario: "Moldagem digital recebida.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(22) },
        { id: "evt-11", status: "Em produção", comentario: "Fresagem em zircônia monolítica.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(19) },
        { id: "evt-12", status: "Pronta", comentario: "Acabamento e glazing concluídos.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(16) },
        { id: "evt-13", status: "Enviada/Entregue", comentario: "Entregue à clínica.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(14) },
      ],
      criadaEm: daysAgo(22),
    },
  ],
};

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function futureDate(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

function pastDate(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}
