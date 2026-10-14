# Prompt: importar promoções do Instagram @lifeenergystore

Como usar: abra um chat que consiga ver o Instagram (ou anexe prints/legendas dos posts), cole o bloco abaixo e
devolva aqui o JSON que ele gerar. Eu coloco em `src/seed.ts` e as imagens em `public/promo/`.

---

```
CONTEXTO
Estou montando a loja online da "Life Energy Store" (suplementos e artigos fitness, Brasil).
O cliente monta o pedido no site e finaliza pelo WhatsApp. O dono quer publicar as promoções
que já divulga no Instagram (https://www.instagram.com/lifeenergystore/).
Identidade: preto + amarelo, tom direto e energético, em português do Brasil.

TAREFA
Analise os posts/stories/destaques recentes do perfil e extraia SOMENTE as promoções e produtos
que aparecem com preço ou oferta clara. Para cada um, gere um objeto no formato abaixo.

REGRAS (importante)
1. NÃO invente preço, marca, sabor ou validade. Se não estiver no post, use null e liste em "pendencias".
2. "price" = preço normal em reais (número, ponto decimal). "promoPrice" = preço da oferta.
   Se o post só mostra o preço final (ex.: kit por R$ 139,95) e não o preço normal, coloque o valor
   em "price", deixe "promoPrice" null e use "badge" (ex.: "KIT PROMO", "50% OFF").
3. Kits/combos: um único produto, com os itens no nome (ex.: "Kit Whey 900g + Creatina 300g").
4. "category": uma de Suplementos | Vestuário | Acessórios | Bebidas e Snacks | Outros.
5. "description": 1 frase factual, sem promessas de saúde/resultado (ex.: nada de "emagrece", "cura").
6. Informe "fonte" (URL do post) e "validade" (se o post disser; senão null).
7. Ignore posts sem produto/preço (motivacional, treino, sorteio).

FORMATO DE SAÍDA (JSON puro, sem comentários)
{
  "produtos": [
    {
      "id": "slug-curto-unico",
      "name": "Nome do produto ou kit",
      "description": "Frase curta e factual.",
      "category": "Suplementos",
      "price": 139.95,
      "promoPrice": null,
      "badge": "KIT PROMO",
      "imageUrl": "./promo/nome-do-arquivo.png",
      "active": true,
      "fonte": "https://www.instagram.com/p/...",
      "validade": null
    }
  ],
  "pendencias": ["o que faltou confirmar com o dono, item a item"]
}

Se não conseguir acessar o Instagram, me diga e peça que eu cole as legendas/prints
em vez de inventar qualquer informação.
```

## Depois
- Salve as artes dos posts em `apps/life-energy-store/public/promo/` com o nome usado em `imageUrl`.
- Confirme as `pendencias` com o dono antes de publicar.
