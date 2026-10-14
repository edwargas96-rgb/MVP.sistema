import { useEffect, useState } from "react";
import { defaultSettings } from "./brand";
import { seedProducts } from "./seed";
import type { CartLine, Product, Settings } from "./types";

const NS = "life-energy-store:";

/** useState persistido em localStorage (sem backend nesta fase do MVP). */
function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(NS + key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value));
    } catch {
      /* armazenamento indisponível: segue só em memória */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

export const useProducts = () => usePersisted<Product[]>("products", seedProducts);
export const useSettings = () => usePersisted<Settings>("settings", defaultSettings);
export const useCart = () => usePersisted<CartLine[]>("cart", []);

export const isPromo = (p: Product) => p.promoPrice != null && p.promoPrice > 0 && p.promoPrice < p.price;
export const finalPrice = (p: Product) => (isPromo(p) ? (p.promoPrice as number) : p.price);
export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
