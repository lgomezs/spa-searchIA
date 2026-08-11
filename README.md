# Developer AI Assistant - Frontend

Portal frontend para Developer AI Assistant (React + TypeScript + Vite + Tailwind).

Resumen
- UI tipo chat para consultar documentación técnica corporativa.
- Cliente sólo habla con el backend Quarkus a través de POST /assistant/search

Requisitos
- Node 18+
- npm

Instalación

1. Copia .env.example a .env.local y ajusta VITE_API_URL si tu backend no está en http://localhost:8080

2. Instala dependencias

npm install

3. Ejecuta en modo desarrollo

npm run dev

Estructura principal

src/
  components/  # UI components
  pages/       # page-level components (ChatPage)
  services/    # aiService - comunicación con backend
  config/      # api.ts - URL centralizada
  hooks/       # useChat
  types/       # tipos TypeScript

Contrato backend
- POST ${VITE_API_URL}/assistant/search
  Request: { "question": "..." }
  Response: { "answer": "..." }

Notas
- El frontend NO contiene claves ni secretos.
- Preparado para soportar sources cuando el backend las retorne.

