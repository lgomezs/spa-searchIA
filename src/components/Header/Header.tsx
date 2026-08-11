import React from 'react'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-sky-400 rounded flex items-center justify-center text-white font-bold">AI</div>
        <div>
          <div className="text-lg font-semibold">Developer AI Assistant</div>
          <div className="text-sm text-slate-500">Asistente técnico corporativo</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700">Nueva conversación</button>
        <div className="w-8 h-8 rounded-full bg-slate-200" />
      </div>
    </header>
  )
}
