# Escopo — Life Energy Store

## Ponto de partida e limitações da análise
Os sites de referência (academialifeenergy.com.br/unidades e Instagram @lifeenergystore) **não puderam ser acessados** do ambiente em que isto foi construído (rede bloqueada). Nada aqui foi copiado deles: nome, cores (preto/amarelo, da logo), categorias e produtos são **placeholders** de demonstração. Pendente do cliente: logo, paleta oficial, número de WhatsApp real, catálogo real, unidades/endereços.

## Objetivo
Um lugar onde o dono publica produtos e promoções, e o cliente monta o pedido e o envia direto para o WhatsApp da loja.

## MVP (esta entrega)
**Cliente (`/#/`)**
- Faixa de aviso configurável, destaque de promoções, busca, filtro por categoria e por "só promoções"
- Preço riscado + selo PROMO quando há preço promocional
- Carrinho (persistido) → nome, retirada/entrega, endereço, observações → abre `wa.me` com mensagem pronta (itens, quantidades, total)

**Dono (`/#/admin`, protegido por PIN)**
- CRUD de produtos (nome, categoria, preço, preço promo, imagem por URL, descrição)
- Mostrar/ocultar produto sem excluir
- Configurações: nome da loja, WhatsApp, faixa de aviso, PIN

## Diferenciais (v0.2)
- **Cronômetro nas promoções** (`promoEndsAt`): ao fim do prazo o preço volta ao normal sozinho; aviso "restam N" (`unitsLeft`)
- **Compra por objetivo**: ganhar massa, energia, definição, saúde (produtos marcados no painel)
- **Monte seu kit**: desconto por quantidade (5/8/10% são EXEMPLOS, o dono ajusta em Configurações)
- **Vitrine estilo stories** com as promoções ativas
- **Pedido WhatsApp organizado**: número `LE-DDMM-001`, itens, desconto, recebimento, pagamento; histórico local em "Pedidos"
- Visual: preto/amarelo, títulos condensados, cantos cortados (etiqueta de anilha)
- Fora: pontos de fidelidade (decidido não fazer por ora)

## Fora do MVP (decisões conscientes)
- Pagamento online, estoque, frete calculado, login real: o pedido é fechado conversando no WhatsApp
- **Os dados ficam só no navegador de quem edita.** Ou seja, hoje o dono edita no próprio aparelho e os clientes NÃO veem essas mudanças. O PIN é proteção leve no front-end, não segurança real.

## Próximos passos (ordem sugerida)
1. **Backend (Supabase)**: produtos/configurações compartilhados + login real do dono + upload de fotos — necessário antes de ir ao ar
2. Dados reais da loja, logo e identidade visual oficial
3. Promoções com validade (início/fim) e cupons
4. Multi-unidade (a academia tem página de unidades): WhatsApp por unidade
5. Registro de pedidos no painel, status, relatório simples
6. Deploy na Vercel (Root Directory `apps/life-energy-store`) e domínio próprio
