# MVP.sistema

Monorepo com três sistemas de gestão independentes para laboratórios de prótese dentária, todos construídos sobre a mesma base compartilhada (`packages/ui`): cadastro de clínicas e pacientes, abertura de ordens de serviço com odontograma clicável, upload de arquivos, linha do tempo de status, checklist de etapas, calendário de prazos, filtros e indicadores — com layout responsivo.

Cada aplicativo é uma marca independente, com sua própria configuração visual (`src/brand.ts`), dados fictícios de demonstração (`src/seedData.ts`) e persistência local isolada por namespace — nenhum dado ou imagem é compartilhado entre marcas.

## Estrutura

```
/apps
  /lv-laboratorio   → LV Laboratório Dental (Caxias do Sul/RS)
  /dlab-digital     → DLAB DIGITAL (Curitiba/PR)
  /ultra-dental     → Ultra Dental Lab (Maringá/PR)
/packages
  /ui               → componentes, páginas, contexto de marca e motor de dados compartilhados
```

## Stack

Vite + React 18 + TypeScript + Tailwind CSS + React Router, com persistência simulada em `localStorage` (sem backend configurado — ver seção "Dados e funcionamento" de cada app). Cada app compila para arquivos estáticos, prontos para deploy independente na Vercel.

## Rodando localmente

```sh
npm install
npm run dev:lv     # http://localhost:5173 — LV Laboratório Dental
npm run dev:dlab   # DLAB DIGITAL
npm run dev:ultra  # Ultra Dental Lab
```

## Build

```sh
npm run build:all
```

## Deploy (Vercel)

Crie **três projetos Vercel separados** apontando para este mesmo repositório, cada um com um *Root Directory* diferente:

| Projeto | Root Directory |
| --- | --- |
| LV Laboratório Dental | `apps/lv-laboratorio` |
| DLAB DIGITAL | `apps/dlab-digital` |
| Ultra Dental Lab | `apps/ultra-dental` |

Build command: `npm run build` · Output directory: `dist` (detectado automaticamente pelo preset Vite da Vercel, rodando a partir da raiz do monorepo).

## Logos e imagens reais

Cada app tem uma pasta `public/brand/` com instruções para receber o arquivo de logo oficial (`logo.png` ou `logo.svg`). Até a logo real ser adicionada, cada sistema exibe uma marca-d'água em texto com o nome da marca — nunca a logo de outro laboratório.
