# LV Laboratório Dental — Sistema de Gestão (MVP)

Portal de acompanhamento de ordens de serviço do **LV Laboratório Dental**, laboratório de prótese dentária em Caxias do Sul/RS, com foco em fluxo digital, escaneamento intraoral, impressão 3D e acompanhamento próximo das clínicas parceiras.

Este é um **MVP de demonstração comercial**: os dados (clínicas, pacientes, dentistas e ordens) são fictícios e ficam salvos apenas no navegador (localStorage), namespaced por `lv-laboratorio` para nunca se misturar com os outros laboratórios do monorepo.

## Acesso de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Laboratório (admin) | `lucas@lvlaboratoriodental.com.br` | `demo123` |
| Clínica parceira | `clinica@serradental.com.br` | `demo123` |

## Logo e imagens reais

Coloque o arquivo de logo oficial em `public/brand/logo.png` (ou `.svg`). Até lá, o sistema exibe automaticamente uma marca-d'água em texto com o nome "LV Laboratório Dental" — nenhuma logo de outro laboratório é usada aqui.

## Rodando localmente

```sh
npm install
npm run dev -w apps/lv-laboratorio
```

## Build de produção

```sh
npm run build -w apps/lv-laboratorio
```

Gera arquivos estáticos em `dist/` — pronto para publicar como projeto Vercel com raiz em `apps/lv-laboratorio`.
