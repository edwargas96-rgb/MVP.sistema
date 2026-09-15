import type { LabDataset } from "@mvp/ui";

const clinicMaringaSmile = "cli-maringa-smile";
const clinicOdontoPremium = "cli-odonto-premium";
const clinicCentroImplantologia = "cli-centro-implantologia";

export const seed: LabDataset = {
  clinics: [
    {
      id: clinicMaringaSmile,
      nome: "Maringá Smile Odontologia",
      responsavel: "Dra. Larissa Hachmann",
      telefone: "(44) 3028-5510",
      email: "contato@maringasmile.com.br",
      endereco: "Av. Cerro Azul, 900 — Maringá/PR",
      documento: "78.901.234/0001-66",
      ativo: true,
    },
    {
      id: clinicOdontoPremium,
      nome: "Odonto Premium Maringá",
      responsavel: "Dr. Vinícius Cavassin",
      telefone: "(44) 3226-7712",
      email: "recepcao@odontopremiummga.com.br",
      endereco: "Av. Colombo, 5330 — Maringá/PR",
      documento: "89.012.345/0001-77",
      ativo: true,
    },
    {
      id: clinicCentroImplantologia,
      nome: "Centro de Implantologia do Norte do Paraná",
      responsavel: "Dr. Eduardo Bianchini",
      telefone: "(44) 3031-4499",
      email: "contato@cinp.com.br",
      endereco: "Av. Duque de Caxias, 1288 — Maringá/PR",
      documento: "90.123.456/0001-88",
      ativo: true,
    },
  ],
  patients: [
    { id: "pac-1", nome: "Renato Coimbra Salles", clinicId: clinicMaringaSmile, dentista: "Dra. Larissa Hachmann" },
    { id: "pac-2", nome: "Priscila Amaral Bueno", clinicId: clinicOdontoPremium, dentista: "Dr. Vinícius Cavassin" },
    { id: "pac-3", nome: "Wagner Tadeu Ferraz", clinicId: clinicCentroImplantologia, dentista: "Dr. Eduardo Bianchini" },
    { id: "pac-4", nome: "Helena Marques Itô", clinicId: clinicMaringaSmile, dentista: "Dra. Larissa Hachmann" },
  ],
  catalogs: {
    servicos: [
      "Protocolo All-on-4",
      "Protocolo All-on-6",
      "Coroa sobre implante",
      "Barra fresada em titânio",
      "Coroa em zircônia",
      "Dissilicato de lítio",
      "Metalocerâmica",
      "Prótese provisória em PMMA",
      "Faceta ou lente de contato",
      "Guia cirúrgico",
      "Modelo impresso em 3D",
      "Planejamento CAD",
    ],
    materiais: ["Zircônia", "Dissilicato de lítio", "Titânio fresado", "PMMA", "Metalocerâmica", "Resina 3D"],
    sistemasImplante: ["Straumann", "Nobel Biocare", "Neodent", "Zimmer Biomet", "Bicon"],
    coresVita: ["A1", "A2", "A3", "A3.5", "B1", "B2", "C2", "D3"],
    scanners: ["3Shape", "Medit", "Cerec", "iTero"],
  },
  credentials: [
    {
      email: "tecnico@ultradentallab.com.br",
      senha: "demo123",
      user: { id: "user-lab", nome: "Equipe Ultra Dental Lab", email: "tecnico@ultradentallab.com.br", role: "laboratorio" },
    },
    {
      email: "clinica@maringasmile.com.br",
      senha: "demo123",
      user: {
        id: "user-clinic-1",
        nome: "Dra. Larissa Hachmann",
        email: "clinica@maringasmile.com.br",
        role: "clinica",
        clinicId: clinicMaringaSmile,
      },
    },
  ],
  orders: [
    {
      id: "ord-seed-1",
      numero: "OS-0001",
      clinicId: clinicCentroImplantologia,
      paciente: "Wagner Tadeu Ferraz",
      idade: "61 anos",
      dentista: "Dr. Eduardo Bianchini",
      servico: "Protocolo All-on-6",
      elementos: [16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26],
      sobImplante: true,
      sistemaImplante: "Straumann",
      material: "Titânio fresado",
      cor: "A2",
      scanner: "3Shape",
      prazo: futureDate(3),
      urgente: true,
      prioridade: "Urgente",
      responsavelInterno: "Marcelo Yamasaki",
      observacoes: "Compatível com escaneamento 3Shape. Confirmar passividade da barra antes da caracterização.",
      status: "Em produção",
      arquivos: [
        { id: "file-1", nome: "escaneamento_3shape.stl", tipo: "arquivo", extensao: "stl", tamanhoKb: 11200, criadoEm: daysAgo(6) },
        { id: "file-2", nome: "planejamento_cad.zip", tipo: "arquivo", extensao: "zip", tamanhoKb: 8300, criadoEm: daysAgo(6) },
      ],
      eventos: [
        { id: "evt-1", status: "Recebido", comentario: "Arquivos STL recebidos via 3Shape.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(6) },
        { id: "evt-2", status: "Recebido", comentario: "Escaneamento validado, sem ruídos.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(5) },
        { id: "evt-3", status: "Recebido", comentario: "Design CAD da barra concluído.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(5) },
        { id: "evt-4", status: "Em prova", comentario: "Planejamento enviado ao cirurgião para aprovação.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(4) },
        { id: "evt-5", status: "Em produção", comentario: "Planejamento aprovado pela clínica. Iniciando fresagem em titânio.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(3) },
        { id: "evt-6", status: "Em produção", comentario: "Fresagem em centro de usinagem de 5 eixos em andamento.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(2) },
      ],
      criadaEm: daysAgo(6),
    },
    {
      id: "ord-seed-2",
      numero: "OS-0002",
      clinicId: clinicMaringaSmile,
      paciente: "Renato Coimbra Salles",
      idade: "47 anos",
      dentista: "Dra. Larissa Hachmann",
      servico: "Faceta ou lente de contato",
      elementos: [12, 11, 21, 22],
      sobImplante: false,
      material: "Dissilicato de lítio",
      cor: "A1",
      scanner: "Medit",
      prazo: futureDate(6),
      urgente: false,
      prioridade: "Normal",
      responsavelInterno: "Camila Rezende",
      observacoes: "Recebido via Medit. Paciente busca resultado natural, sem excesso de opacidade.",
      status: "Em produção",
      arquivos: [
        { id: "file-3", nome: "escaneamento_medit.ply", tipo: "arquivo", extensao: "ply", tamanhoKb: 4700, criadoEm: daysAgo(8) },
      ],
      eventos: [
        { id: "evt-7", status: "Recebido", comentario: "Arquivo PLY recebido via Medit.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(8) },
        { id: "evt-8", status: "Recebido", comentario: "Mock-up digital enviado para aprovação estética.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(6) },
        { id: "evt-9", status: "Em produção", comentario: "Fresagem em dissilicato concluída.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(3) },
        { id: "evt-10", status: "Em produção", comentario: "Estratificação e glazeamento em andamento.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(1) },
      ],
      criadaEm: daysAgo(8),
    },
    {
      id: "ord-seed-3",
      numero: "OS-0003",
      clinicId: clinicOdontoPremium,
      paciente: "Priscila Amaral Bueno",
      idade: "38 anos",
      dentista: "Dr. Vinícius Cavassin",
      servico: "Guia cirúrgico",
      elementos: [24, 25, 26, 27],
      sobImplante: true,
      sistemaImplante: "Nobel Biocare",
      material: "Resina 3D",
      cor: "—",
      scanner: "iTero",
      prazo: futureDate(2),
      urgente: true,
      prioridade: "Urgente",
      responsavelInterno: "Marcelo Yamasaki",
      observacoes: "Compatível com planejamento iTero. Cirurgia confirmada — priorizar impressão 3D.",
      status: "Recebido",
      arquivos: [],
      eventos: [
        { id: "evt-11", status: "Recebido", comentario: "Planejamento recebido via iTero.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(3) },
        { id: "evt-12", status: "Recebido", comentario: "Validando posicionamento dos implantes no guia.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(2) },
      ],
      criadaEm: daysAgo(3),
    },
    {
      id: "ord-seed-4",
      numero: "OS-0004",
      clinicId: clinicCentroImplantologia,
      paciente: "Helena Marques Itô",
      idade: "55 anos",
      dentista: "Dra. Larissa Hachmann",
      servico: "Coroa sobre implante",
      elementos: [36],
      sobImplante: true,
      sistemaImplante: "Neodent",
      material: "Zircônia",
      cor: "A3",
      scanner: "3Shape",
      prazo: futureDate(5),
      urgente: false,
      prioridade: "Alta",
      responsavelInterno: "Camila Rezende",
      observacoes: "Planejamento digital finalizado. Aguardando validação do dentista antes da fresagem em zircônia.",
      status: "Em prova",
      arquivos: [
        { id: "file-5", nome: "planejamento_coroa_36.zip", tipo: "arquivo", extensao: "zip", tamanhoKb: 6100, criadoEm: daysAgo(2) },
        { id: "file-6", nome: "preview_zirconia.jpg", tipo: "foto", extensao: "jpg", tamanhoKb: 1240, criadoEm: daysAgo(2) },
      ],
      eventos: [
        { id: "evt-13", status: "Recebido", comentario: "Escaneamento recebido via 3Shape.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(4) },
        { id: "evt-14", status: "Recebido", comentario: "Design CAD da coroa concluído.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(2) },
        { id: "evt-15", status: "Em prova", comentario: "Planejamento pronto para aprovação da clínica.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(1) },
      ],
      criadaEm: daysAgo(4),
    },
    {
      id: "ord-seed-5",
      numero: "OS-0005",
      clinicId: clinicOdontoPremium,
      paciente: "Priscila Amaral Bueno",
      idade: "38 anos",
      dentista: "Dr. Vinícius Cavassin",
      servico: "Prótese provisória em PMMA",
      elementos: [13, 12, 11, 21, 22, 23],
      sobImplante: false,
      material: "PMMA",
      cor: "A1",
      scanner: "Cerec",
      prazo: pastDate(9),
      urgente: false,
      prioridade: "Normal",
      responsavelInterno: "Camila Rezende",
      observacoes: "Trabalho completo, do escaneamento à entrega — Cerec.",
      status: "Finalizado",
      arquivos: [
        { id: "file-7", nome: "resultado_final.jpg", tipo: "foto", extensao: "jpg", tamanhoKb: 980, criadoEm: daysAgo(11) },
      ],
      eventos: [
        { id: "evt-16", status: "Recebido", comentario: "Escaneamento recebido via Cerec.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(18) },
        { id: "evt-17", status: "Em produção", comentario: "Design CAD e fresagem em PMMA concluídos.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(15) },
        { id: "evt-18", status: "Em produção", comentario: "Ajuste oclusal e polimento finalizados.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(12) },
        { id: "evt-19", status: "Finalizado", comentario: "Entregue à clínica dentro do prazo.", autor: "Equipe Ultra Dental Lab", criadoEm: daysAgo(9) },
      ],
      criadaEm: daysAgo(18),
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
