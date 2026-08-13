import React from 'react'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import ChatMessage from '../components/ChatMessage/ChatMessage'
import ChatInput from '../components/ChatInput/ChatInput'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'
import { useChat } from '../hooks/useChat'

export default function ChatPage() {
  const { messages, loading, error, sendMessage, newConversation } = useChat()

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header onNewConversation={newConversation} />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-5">
          <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col">
            <section className="mb-3 shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">Hola, soy el asistente técnico corporativo.</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">Consulta documentación y estándares técnicos internos sobre arquitectura, Java, Quarkus, APIs y seguridad.</p>
              <p className="mt-2 hidden text-sm text-slate-500 sm:block">Prueba con: arquitectura hexagonal, repositorios, Output Adapters o estructura de microservicios Quarkus.</p>
            </section>

            <section className="min-h-0 flex-1 overflow-y-auto rounded-xl bg-slate-50 px-1 py-2 sm:px-3" aria-live="polite">
              {error && <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
              {messages.length === 0 && !loading && <div className="py-10 text-center text-sm text-slate-500">Aquí aparecerán tus preguntas y respuestas.</div>}
              {messages.map((message) => <ChatMessage key={message.id} {...message} />)}
              {loading && <div className="mb-3"><LoadingIndicator text="Buscando en la documentación... Generando respuesta..." /></div>}
            </section>

            <div className="mt-3 shrink-0"><ChatInput onSend={sendMessage} loading={loading} /></div>
          </div>
        </main>
      </div>
    </div>
  )
}
