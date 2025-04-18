import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/global.css";
import { CartProvider } from "./contexts/CartContext";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <App />
  </CartProvider>
);
