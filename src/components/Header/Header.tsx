import React from 'react'

interface HeaderProps {
  onNewConversation?: () => void
}

export default function Header({ onNewConversation }: HeaderProps) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 font-bold text-white">AI</div>
        <div>
          <div className="text-lg font-semibold text-slate-900">Developer AI Assistant</div>
          <div className="text-sm text-slate-500">Asistente técnico corporativo</div>
        </div>
      </div>
      <button onClick={onNewConversation} className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700" type="button">Nueva conversación</button>
    </header>
  )
}
