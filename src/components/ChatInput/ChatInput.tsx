import React, { useEffect, useRef, useState } from 'react'

export default function ChatInput({ onSend, loading }: { onSend: (value: string) => void; loading?: boolean }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }, [value])

  const submit = () => {
    const v = value.trim()
    if (!v || loading) return
    onSend(v)
    setValue('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <textarea ref={textareaRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKeyDown} disabled={loading} rows={1} placeholder="Pregunta sobre la arquitectura o framework corporativo..." className="max-h-40 min-h-12 w-full resize-none overflow-y-auto p-2 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none" aria-label="Pregunta para el asistente" />
      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500">Enter para enviar · Shift + Enter para nueva línea</div>
        <button onClick={submit} disabled={loading || !value.trim()} className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50" type="button">
          {loading ? 'Procesando...' : 'Preguntar'}
        </button>
      </div>
    </div>
  )
}
