import React from 'react'

export default function LoadingIndicator({ text = 'Analizando documentación...' }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-500">
      <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      <div>{text}</div>
    </div>
  )
}
