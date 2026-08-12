import React, { useState } from 'react'

export default function ChatInput({ onSend, loading }: { onSend: (value: string) => void; loading?: boolean }) {
  const [value, setValue] = useState('')

  const submit = () => {
    const v = value.trim()
    if (!v) return
    onSend(v)
    setValue('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="p-4 border-t bg-white">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Pregunta sobre la arquitectura o framework corporativo..."
        className="w-full h-28 p-3 border rounded resize-none focus:outline-none focus:ring"
      />
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-slate-500">Shift + Enter = nueva línea</div>
        <div>
          <button onClick={submit} disabled={loading} className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-60">
            {loading ? 'Consultando...' : 'Preguntar'}
          </button>
        </div>
      </div>
    </div>
  )
}
