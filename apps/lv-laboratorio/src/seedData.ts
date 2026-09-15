import type { LabDataset } from "@mvp/ui";

const clinicSerraDental = "cli-serra-dental";
const clinicOdontoVargas = "cli-odonto-vargas";
const clinicSorrisoCaxiense = "cli-sorriso-caxiense";

export const seed: LabDataset = {
  clinics: [
    {
      id: clinicSerraDental,
      nome: "Clínica Serra Dental",
      responsavel: "Dra. Marina Bertoncello",
      telefone: "(54) 3221-4455",
      email: "contato@serradental.com.br",
      endereco: "Rua Os Dezoito do Forte, 1220 — Caxias do Sul/RS",
      documento: "12.345.678/0001-90",
      ativo: true,
    },
    {
      id: clinicOdontoVargas,
      nome: "OdontoVargas Clínica Integrada",
      responsavel: "Dr. Rafael Zanetti",
      telefone: "(54) 3212-9080",
      email: "recepcao@odontovargas.com.br",
      endereco: "Av. Júlio de Castilhos, 3040 — Caxias do Sul/RS",
      documento: "23.456.789/0001-11",
      ativo: true,
    },
    {
      id: clinicSorrisoCaxiense,
      nome: "Clínica Sorriso Caxiense",
      responsavel: "Dra. Patrícia Follmann",
      telefone: "(54) 3025-7788",
      email: "contato@sorrisocaxiense.com.br",
      endereco: "Rua Sinimbu, 1780 — Caxias do Sul/RS",
      documento: "34.567.890/0001-22",
      ativo: true,
    },
  ],
  patients: [
    { id: "pac-1", nome: "Osvaldo Menegotto", clinicId: clinicSerraDental, dentista: "Dra. Marina Bertoncello" },
    { id: "pac-2", nome: "Beatriz Conti", clinicId: clinicOdontoVargas, dentista: "Dr. Rafael Zanetti" },
    { id: "pac-3", nome: "Ivo Sperafico", clinicId: clinicSorrisoCaxiense, dentista: "Dra. Patrícia Follmann" },
    { id: "pac-4", nome: "Neusa Dal Bosco", clinicId: clinicSerraDental, dentista: "Dr. Anderson Piccoli" },
  ],
  catalogs: {
    servicos: [
      "Prótese protocolo",
      "Prótese total",
      "PPR metálica",
      "Prótese provisória",
      "Impressão 3D",
      "Fluxo digital",
      "Recebimento de escaneamento intraoral",
    ],
    materiais: ["Zircônia", "Dissilicato de lítio", "Metalocerâmica", "PMMA", "Resina 3D"],
    sistemasImplante: ["Neodent", "Straumann", "Nobel Biocare", "Conexão"],
    coresVita: ["A1", "A2", "A3", "A3.5", "B1", "B2", "C1", "D2"],
  },
  credentials: [
    {
      email: "lucas@lvlaboratoriodental.com.br",
      senha: "demo123",
      user: { id: "user-lab", nome: "Lucas de Vargas", email: "lucas@lvlaboratoriodental.com.br", role: "laboratorio" },
    },
    {
      email: "clinica@serradental.com.br",
      senha: "demo123",
      user: {
        id: "user-clinic-1",
        nome: "Dra. Marina Bertoncello",
        email: "clinica@serradental.com.br",
        role: "clinica",
        clinicId: clinicSerraDental,
      },
    },
  ],
  orders: [
    {
      id: "ord-seed-1",
      numero: "OS-0001",
      clinicId: clinicSerraDental,
      paciente: "Osvaldo Menegotto",
      idade: "61 anos",
      dentista: "Dra. Marina Bertoncello",
      servico: "Prótese protocolo",
      elementos: [11, 12, 13, 21, 22, 23],
      sobImplante: true,
      sistemaImplante: "Neodent",
      material: "Zircônia",
      cor: "A2",
      prazo: futureDate(2),
      prioridade: "Urgente",
      urgente: true,
      observacoes:
        "Paciente com bruxismo controlado. Priorizar espessura de zircônia na região anterior. Alinhamento técnico definido com a clínica antes do início da produção.",
      status: "Em produção",
      arquivos: [
        { id: "file-1", nome: "escaneamento_superior.stl", tipo: "arquivo", extensao: "stl", tamanhoKb: 5860, criadoEm: daysAgo(6) },
        { id: "file-2", nome: "foto_sorriso.jpg", tipo: "foto", extensao: "jpg", tamanhoKb: 890, criadoEm: daysAgo(6) },
      ],
      eventos: [
        { id: "evt-1", status: "Recebido", comentario: "Ordem recebida via escaneamento intraoral.", autor: "Lucas de Vargas", criadoEm: daysAgo(6) },
        { id: "evt-2", status: "Recebido", comentario: "Caso avaliado — planejamento individualizado, do jeito que cada trabalho merece.", autor: "Lucas de Vargas", criadoEm: daysAgo(5) },
        { id: "evt-3", status: "Recebido", comentario: "Protocolo definido junto à clínica.", autor: "Lucas de Vargas", criadoEm: daysAgo(4) },
        { id: "evt-4", status: "Em produção", comentario: "Fresagem da estrutura em andamento.", autor: "Lucas de Vargas", criadoEm: daysAgo(2) },
      ],
      criadaEm: daysAgo(6),
    },
    {
      id: "ord-seed-2",
      numero: "OS-0002",
      clinicId: clinicOdontoVargas,
      paciente: "Beatriz Conti",
      idade: "58 anos",
      dentista: "Dr. Rafael Zanetti",
      servico: "Prótese total",
      elementos: [],
      sobImplante: false,
      material: "Resina 3D",
      cor: "B1",
      prazo: futureDate(5),
      prioridade: "Normal",
      urgente: false,
      observacoes: "Prova de mordida aprovada. Suporte ao profissional durante o ajuste final antes do acabamento.",
      status: "Em prova",
      arquivos: [
        { id: "file-3", nome: "moldagem_arcada.zip", tipo: "arquivo", extensao: "zip", tamanhoKb: 3200, criadoEm: daysAgo(9) },
      ],
      eventos: [
        { id: "evt-5", status: "Recebido", comentario: "Moldagem física recebida na portaria.", autor: "Lucas de Vargas", criadoEm: daysAgo(9) },
        { id: "evt-6", status: "Recebido", comentario: "Caso avaliado.", autor: "Lucas de Vargas", criadoEm: daysAgo(8) },
        { id: "evt-7", status: "Recebido", comentario: "Plano de tratamento alinhado com o dentista.", autor: "Lucas de Vargas", criadoEm: daysAgo(7) },
        { id: "evt-8", status: "Em produção", comentario: "Impressão 3D do modelo concluída.", autor: "Lucas de Vargas", criadoEm: daysAgo(4) },
        { id: "evt-9", status: "Em produção", comentario: "Acabamento finalizado com atenção aos detalhes.", autor: "Lucas de Vargas", criadoEm: daysAgo(2) },
        { id: "evt-10", status: "Em prova", comentario: "Enviado para prova de mordida com o dentista.", autor: "Lucas de Vargas", criadoEm: daysAgo(1) },
      ],
      criadaEm: daysAgo(9),
    },
    {
      id: "ord-seed-3",
      numero: "OS-0003",
      clinicId: clinicSorrisoCaxiense,
      paciente: "Ivo Sperafico",
      idade: "70 anos",
      dentista: "Dra. Patrícia Follmann",
      servico: "PPR metálica",
      elementos: [36, 37, 46, 47],
      sobImplante: false,
      material: "Metalocerâmica",
      cor: "A3",
      prazo: pastDate(2),
      prioridade: "Alta",
      urgente: false,
      observacoes: "Confirmar retenção dos grampos com o clínico antes do acabamento. Próteses planejadas de forma individualizada.",
      status: "Recebido",
      arquivos: [],
      eventos: [
        { id: "evt-11", status: "Recebido", comentario: "Ordem recebida.", autor: "Lucas de Vargas", criadoEm: daysAgo(10) },
        { id: "evt-12", status: "Recebido", comentario: "Caso avaliado com atenção aos detalhes clínicos.", autor: "Lucas de Vargas", criadoEm: daysAgo(8) },
        { id: "evt-13", status: "Recebido", comentario: "Aguardando confirmação do desenho da PPR com a clínica.", autor: "Lucas de Vargas", criadoEm: daysAgo(6) },
      ],
      criadaEm: daysAgo(10),
    },
    {
      id: "ord-seed-4",
      numero: "OS-0004",
      clinicId: clinicSerraDental,
      paciente: "Neusa Dal Bosco",
      idade: "45 anos",
      dentista: "Dr. Anderson Piccoli",
      servico: "Prótese provisória",
      elementos: [21, 22],
      sobImplante: false,
      material: "PMMA",
      cor: "A2",
      prazo: futureDate(12),
      prioridade: "Normal",
      urgente: false,
      observacoes: "",
      status: "Recebido",
      arquivos: [],
      eventos: [
        { id: "evt-14", status: "Recebido", comentario: "Trabalho recebido e organizado para análise.", autor: "Lucas de Vargas", criadoEm: daysAgo(1) },
      ],
      criadaEm: daysAgo(1),
    },
    {
      id: "ord-seed-5",
      numero: "OS-0005",
      clinicId: clinicOdontoVargas,
      paciente: "Beatriz Conti",
      idade: "58 anos",
      dentista: "Dr. Rafael Zanetti",
      servico: "Impressão 3D",
      elementos: [],
      sobImplante: false,
      material: "Resina 3D",
      cor: "A1",
      prazo: pastDate(10),
      prioridade: "Normal",
      urgente: false,
      observacoes: "Modelo de estudo para planejamento ortodôntico. Mais integração entre consultório e laboratório em cada etapa.",
      status: "Finalizado",
      arquivos: [
        { id: "file-4", nome: "modelo_estudo.stl", tipo: "arquivo", extensao: "stl", tamanhoKb: 2100, criadoEm: daysAgo(20) },
      ],
      eventos: [
        { id: "evt-15", status: "Recebido", comentario: "Arquivo STL recebido — fluxo digital.", autor: "Lucas de Vargas", criadoEm: daysAgo(20) },
        { id: "evt-16", status: "Em produção", comentario: "Impressão 3D realizada.", autor: "Lucas de Vargas", criadoEm: daysAgo(18) },
        { id: "evt-17", status: "Em produção", comentario: "Modelo finalizado e higienizado.", autor: "Lucas de Vargas", criadoEm: daysAgo(16) },
        { id: "evt-18", status: "Em prova", comentario: "Pronto para retirada pela clínica.", autor: "Lucas de Vargas", criadoEm: daysAgo(15) },
        { id: "evt-19", status: "Finalizado", comentario: "Retirado pela clínica. Trabalho concluído do planejamento ao acabamento.", autor: "Lucas de Vargas", criadoEm: daysAgo(14) },
      ],
      criadaEm: daysAgo(20),
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
