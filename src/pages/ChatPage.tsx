import React from 'react'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import ChatMessage from '../components/ChatMessage/ChatMessage'
import ChatInput from '../components/ChatInput/ChatInput'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'
import { useChat } from '../hooks/useChat'

export default function ChatPage() {
  const { messages, loading, error, sendMessage, newConversation, clearHistory } = useChat()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4 bg-white p-4 rounded shadow-sm">
              <div className="text-lg font-semibold">Hola, soy el asistente técnico corporativo.</div>
              <div className="text-sm text-slate-600 mt-2">
                Puedo ayudarte a consultar la documentación y estándares técnicos de la empresa.
                <ul className="list-disc ml-5 mt-2">
                  <li>¿Cómo debo implementar una arquitectura hexagonal?</li>
                  <li>¿Dónde debe colocarse un Output Adapter?</li>
                  <li>¿Cómo debemos implementar un repositorio?</li>
                  <li>¿Qué estructura debe tener un microservicio Quarkus?</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded" style={{ minHeight: 400 }}>
              {error && (
                <div className="mb-3 text-red-600">No pudimos obtener una respuesta del asistente. Intenta nuevamente.</div>
              )}

              {loading && (
                <div className="mb-3">
                  <LoadingIndicator text={"Buscando en la documentación... Generando respuesta..."} />
                </div>
              )}

              <div>
                {messages.length === 0 && (
                  <div className="text-slate-500">Aquí aparecerán tus preguntas y las respuestas.</div>
                )}

                {messages.map((m) => (
                  <ChatMessage key={m.id} role={m.role} content={m.content} />
                ))}

              </div>

            </div>

            <div className="mt-4">
              <ChatInput onSend={sendMessage} loading={loading} />
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={newConversation} className="px-3 py-1 bg-white border rounded">Nueva conversación</button>
              <button onClick={clearHistory} className="px-3 py-1 bg-white border rounded">Eliminar historial</button>
            </div>

            <div className="mt-6">
              <div className="text-sm text-slate-500 mb-2">Fuentes consultadas (si están disponibles)</div>
              {/* Placeholder: when sources are returned, render SourceCard components */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
