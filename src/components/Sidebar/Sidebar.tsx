import React from 'react'

const sections = [
  'Arquitectura',
  'Quarkus',
  'Java',
  'APIs',
  'Seguridad',
  'Testing',
  'Observabilidad'
]

export default function Sidebar({ onSelect }: { onSelect?: (s: string) => void }) {
  return (
    <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 md:block">
      <div className="mb-4">
        <button className="w-full text-left px-3 py-2 rounded bg-indigo-50 hover:bg-indigo-100">+ Nueva conversación</button>
      </div>

      <div className="mb-4">
        <div className="text-xs text-slate-500 uppercase">Documentación</div>
        <ul className="mt-2 space-y-1">
          {sections.map((s) => (
            <li key={s}>
              <button onClick={() => onSelect?.(s)} className="w-full text-left px-2 py-1 rounded hover:bg-slate-100">{s}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-xs text-slate-400 mt-6">Historial (local)</div>
    </aside>
  )
}
