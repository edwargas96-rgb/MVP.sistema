# DLAB DIGITAL — Sistema de Gestão (MVP)

Portal de acompanhamento de ordens de serviço da **DLAB DIGITAL**, laboratório especializado em fluxo digital e alta tecnologia (barras sobre implante, próteses digitais e guias cirúrgicos), em Curitiba/PR.

MVP de demonstração comercial: dados fictícios, persistidos apenas no navegador (localStorage) sob o namespace `dlab-digital`, isolados de qualquer outro laboratório do monorepo.

## Acesso de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Laboratório (admin) | `geninho@dlabdigital.com.br` | `demo123` |
| Clínica parceira | `clinica@oraltechimplantes.com.br` | `demo123` |

## Logo e imagens reais

Coloque o arquivo de logo oficial em `public/brand/logo.png` (ou `.svg`). Até lá, o sistema exibe uma marca-d'água em texto com "DLAB DIGITAL" — nenhuma imagem de outra marca é usada aqui.

## Rodando localmente

```sh
npm install
npm run dev -w apps/dlab-digital
```

## Build de produção

```sh
npm run build -w apps/dlab-digital
```
