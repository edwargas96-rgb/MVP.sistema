import { useEffect, useState } from "react";
import Admin from "./Admin";
import Shop from "./Shop";
import { useCart, useProducts, useSettings } from "./store";

/** Roteamento mínimo por hash: "#/" = loja, "#/admin" = painel do dono. */
export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [products, setProducts] = useProducts();
  const [settings, setSettings] = useSettings();
  const [cart, setCart] = useCart();

  useEffect(() => {
    const on = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  useEffect(() => {
    document.title = settings.storeName;
  }, [settings.storeName]);

  if (route.startsWith("#/admin")) {
    return <Admin products={products} setProducts={setProducts} settings={settings} setSettings={setSettings} />;
  }
  return <Shop products={products} settings={settings} cart={cart} setCart={setCart} />;
}
