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
    { id: "pac-4", nome: "Beatriz Zanardi", clinicId: clinicOralTech, dentista: "Dr. Fernando Kuster" },
  ],
  catalogs: {
    servicos: [
      "Barra sobre implantes",
      "Prótese sobre implantes",
      "Guia cirúrgico",
      "Coroa em zircônia",
      "Prótese provisória",
      "Estratificação em dissilicato de lítio",
      "Planejamento digital",
      "Modelo impresso em 3D",
    ],
    materiais: ["Titânio fresado", "Zircônia", "Dissilicato de lítio", "PMMA", "Resina para guia cirúrgico"],
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
      idade: "52 anos",
      dentista: "Dr. Fernando Kuster",
      servico: "Barra sobre implantes",
      elementos: [14, 13, 12, 11, 21, 22, 23, 24],
      sobImplante: true,
      sistemaImplante: "Straumann",
      material: "Titânio fresado",
      cor: "A2",
      prazo: futureDate(4),
      prioridade: "Urgente",
      urgente: true,
      responsavelInterno: "Camila Duarte",
      observacoes: "Barra híbrida para protocolo superior. Verificar passividade antes da fresagem final.",
      status: "Em produção",
      arquivos: [
        { id: "file-1", nome: "planejamento_digital.stl", tipo: "arquivo", extensao: "stl", tamanhoKb: 9400, criadoEm: daysAgo(7) },
        { id: "file-2", nome: "tomografia.zip", tipo: "arquivo", extensao: "zip", tamanhoKb: 15200, criadoEm: daysAgo(7) },
      ],
      eventos: [
        { id: "evt-1", status: "Trabalho recebido", comentario: "Arquivo digital e tomografia recebidos.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(7) },
        { id: "evt-2", status: "Arquivos conferidos", comentario: "Escaneamento e tomografia validados sem inconsistências.", autor: "Camila Duarte", criadoEm: daysAgo(7) },
        { id: "evt-3", status: "Planejamento digital", comentario: "Planejamento digital da barra concluído.", autor: "Camila Duarte", criadoEm: daysAgo(6) },
        { id: "evt-4", status: "Aprovação do projeto", comentario: "Enviado para aprovação da clínica.", autor: "Camila Duarte", criadoEm: daysAgo(6) },
        { id: "evt-5", status: "Em produção", comentario: "Fresagem da barra em titânio em centro de usinagem.", autor: "Camila Duarte", criadoEm: daysAgo(2) },
      ],
      criadaEm: daysAgo(7),
    },
    {
      id: "ord-seed-2",
      numero: "OS-0002",
      clinicId: clinicImplantCenter,
      paciente: "Camila Souza Prado",
      idade: "47 anos",
      dentista: "Dra. Juliana Wroblevski",
      servico: "Guia cirúrgico",
      elementos: [16, 15, 14, 24, 25, 26],
      sobImplante: true,
      sistemaImplante: "Nobel Biocare",
      material: "Resina para guia cirúrgico",
      cor: "—",
      prazo: futureDate(3),
      prioridade: "Urgente",
      urgente: true,
      responsavelInterno: "Rodrigo Lima",
      observacoes: "Cirurgia agendada — guia deve estar pronto com 48h de antecedência.",
      status: "Aprovação do projeto",
      arquivos: [
        { id: "file-3", nome: "planejamento_cirurgico.stl", tipo: "arquivo", extensao: "stl", tamanhoKb: 6100, criadoEm: daysAgo(5) },
      ],
      eventos: [
        { id: "evt-6", status: "Trabalho recebido", comentario: "Planejamento cirúrgico recebido.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(5) },
        { id: "evt-7", status: "Arquivos conferidos", comentario: "Arquivos conferidos e liberados para planejamento.", autor: "Rodrigo Lima", criadoEm: daysAgo(4) },
        { id: "evt-8", status: "Planejamento digital", comentario: "Posicionamento dos implantes definido no guia.", autor: "Rodrigo Lima", criadoEm: daysAgo(3) },
        { id: "evt-9", status: "Aprovação do projeto", comentario: "Aguardando aprovação da clínica antes da impressão.", autor: "Rodrigo Lima", criadoEm: daysAgo(2) },
      ],
      criadaEm: daysAgo(5),
    },
    {
      id: "ord-seed-3",
      numero: "OS-0003",
      clinicId: clinicBiovidaOdonto,
      paciente: "Adriano Nakashima",
      idade: "39 anos",
      dentista: "Dr. Henrique Lacerda",
      servico: "Estratificação em dissilicato de lítio",
      elementos: [11, 21],
      sobImplante: false,
      material: "Dissilicato de lítio",
      cor: "A1",
      prazo: pastDate(1),
      prioridade: "Normal",
      urgente: false,
      responsavelInterno: "Camila Duarte",
      observacoes: "Estratificação para reproduzir translucidez natural dos incisivos centrais.",
      status: "Planejamento digital",
      arquivos: [],
      eventos: [
        { id: "evt-10", status: "Trabalho recebido", comentario: "Escaneamento recebido.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(4) },
        { id: "evt-11", status: "Arquivos conferidos", comentario: "Escaneamento sem falhas de leitura.", autor: "Camila Duarte", criadoEm: daysAgo(3) },
        { id: "evt-12", status: "Planejamento digital", comentario: "Definindo mapa de cor com o clínico.", autor: "Camila Duarte", criadoEm: daysAgo(2) },
      ],
      criadaEm: daysAgo(4),
    },
    {
      id: "ord-seed-4",
      numero: "OS-0004",
      clinicId: clinicOralTech,
      paciente: "Beatriz Zanardi",
      idade: "61 anos",
      dentista: "Dr. Fernando Kuster",
      servico: "Planejamento digital",
      elementos: [],
      sobImplante: true,
      sistemaImplante: "Straumann",
      material: "—",
      cor: "—",
      prazo: futureDate(15),
      prioridade: "Normal",
      urgente: false,
      responsavelInterno: "Rodrigo Lima",
      observacoes: "Planejamento para segunda fase do caso, após osseointegração.",
      status: "Trabalho recebido",
      arquivos: [],
      eventos: [
        { id: "evt-13", status: "Trabalho recebido", comentario: "Trabalho recebido pela equipe DLAB Digital.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(1) },
      ],
      criadaEm: daysAgo(1),
    },
    {
      id: "ord-seed-5",
      numero: "OS-0005",
      clinicId: clinicImplantCenter,
      paciente: "Camila Souza Prado",
      idade: "47 anos",
      dentista: "Dra. Juliana Wroblevski",
      servico: "Prótese sobre implantes",
      elementos: [36, 37, 46, 47],
      sobImplante: true,
      sistemaImplante: "Neodent",
      material: "Zircônia",
      cor: "A3",
      prazo: pastDate(12),
      prioridade: "Normal",
      urgente: false,
      responsavelInterno: "Camila Duarte",
      observacoes: "Trabalho completo, do recebimento à entrega.",
      status: "Entregue",
      arquivos: [
        { id: "file-4", nome: "prova_final.jpg", tipo: "foto", extensao: "jpg", tamanhoKb: 1040, criadoEm: daysAgo(14) },
      ],
      eventos: [
        { id: "evt-14", status: "Trabalho recebido", comentario: "Moldagem digital recebida.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(22) },
        { id: "evt-15", status: "Arquivos conferidos", comentario: "Arquivos conferidos e liberados.", autor: "Camila Duarte", criadoEm: daysAgo(21) },
        { id: "evt-16", status: "Planejamento digital", comentario: "Planejamento digital concluído.", autor: "Camila Duarte", criadoEm: daysAgo(20) },
        { id: "evt-17", status: "Aprovação do projeto", comentario: "Projeto aprovado pela clínica.", autor: "Dra. Juliana Wroblevski", criadoEm: daysAgo(19) },
        { id: "evt-18", status: "Em produção", comentario: "Fresagem em zircônia monolítica.", autor: "Camila Duarte", criadoEm: daysAgo(18) },
        { id: "evt-19", status: "Acabamento", comentario: "Acabamento e glazing concluídos.", autor: "Camila Duarte", criadoEm: daysAgo(16) },
        { id: "evt-20", status: "Controle de qualidade", comentario: "Conferência final de encaixe e oclusão.", autor: "Rodrigo Lima", criadoEm: daysAgo(15) },
        { id: "evt-21", status: "Pronto para entrega", comentario: "Trabalho pronto para envio.", autor: "Rodrigo Lima", criadoEm: daysAgo(15) },
        { id: "evt-22", status: "Entregue", comentario: "Entregue à clínica.", autor: "Dr. Geninho Thomé", criadoEm: daysAgo(14) },
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
