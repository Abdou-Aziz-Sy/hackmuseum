import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Starting application...");

try {
  createRoot(document.getElementById("root")!).render(<App />);
  console.log("Application rendered successfully");
} catch (error) {
  console.error("Error rendering application:", error);
  document.getElementById("root")!.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; background: #f5f5f5; min-height: 100vh;">
      <h1 style="color: #d2691e;">Musée des Civilisations Noires</h1>
      <div style="background: #ffebee; padding: 15px; border-radius: 8px; border: 1px solid #f44336; margin: 20px 0;">
        <h2 style="color: #c62828; margin: 0 0 10px 0;">Erreur de chargement</h2>
        <p style="color: #d32f2f; margin: 0;">${error instanceof Error ? error.message : 'Erreur inconnue'}</p>
      </div>
    </div>
  `;
}
