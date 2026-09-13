# Ultra Dental Lab — Sistema de Gestão (MVP)

Portal de acompanhamento de ordens de serviço do **Ultra Dental Lab**, laboratório premium de fluxo digital completo (escaneamento, design CAD, fresagem em cinco eixos e impressão 3D), em Maringá/PR. Compatível com 3Shape, Medit, Cerec e iTero.

MVP de demonstração comercial: dados fictícios, persistidos apenas no navegador (localStorage) sob o namespace `ultra-dental`, isolados de qualquer outro laboratório do monorepo.

## Acesso de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Laboratório (admin) | `tecnico@ultradentallab.com.br` | `demo123` |
| Clínica parceira | `clinica@maringasmile.com.br` | `demo123` |

## Logo e imagens reais

Coloque o arquivo de logo oficial em `public/brand/logo.png` (ou `.svg`). Até lá, o sistema exibe uma marca-d'água em texto com "Ultra Dental Lab" — nenhuma imagem de outra marca é usada aqui.

## Rodando localmente

```sh
npm install
npm run dev -w apps/ultra-dental
```

## Build de produção

```sh
npm run build -w apps/ultra-dental
```
