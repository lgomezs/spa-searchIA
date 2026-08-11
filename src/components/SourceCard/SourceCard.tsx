import React from 'react'

export default function SourceCard({ title, chunkId }: { title: string; chunkId?: string }) {
  return (
    <div className="border rounded p-3 bg-white">
      <div className="font-medium">📄 {title}</div>
      {chunkId && <div className="text-xs text-slate-500 mt-1">Chunk: {chunkId}</div>}
    </div>
  )
}
