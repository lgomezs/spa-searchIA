import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import type { ApiSource, ExecutionMetadata } from '../../types/api'

interface Props {
  role: 'user' | 'assistant'
  content: string
  sources?: ApiSource[]
  executionMetadata?: ExecutionMetadata
}

function normalizeAssistantContent(value: string) {
  return value
    .replace(/:sectnums:\s*/g, '')
    .replace(/:source-highlighter:\s*[^\s]+\s*/g, '')
    .replace(/^==\s+(.+)$/gm, '## $1')
    .replace(/^===\s+(.+)$/gm, '### $1')
    .replace(/^\*\s+/gm, '- ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function CodeBlock({ children, className }: { children?: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(children ?? '')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="relative my-3 overflow-hidden rounded-lg bg-slate-900">
      <button onClick={copy} className="absolute right-2 top-2 rounded bg-slate-700 px-2 py-1 text-xs text-white hover:bg-slate-600" type="button">
        {copied ? 'Copiado' : 'Copiar'}
      </button>
      <pre className="overflow-x-auto p-4 pt-10 text-sm"><code className={className}>{children}</code></pre>
    </div>
  )
}

export default function ChatMessage({ role, content, sources = [] }: Props) {
  const isUser = role === 'user'
  const formattedContent = isUser ? content : normalizeAssistantContent(content)
  return (
    <div className={`my-3 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`${isUser ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-white text-slate-800'} w-fit max-w-[min(95%,1100px)] rounded-xl p-4 shadow-sm`}>
        {isUser ? <div className="whitespace-pre-wrap">{content}</div> : (
          <>
            <div className="mb-3 text-xs font-medium text-slate-500">Respuesta basada en documentación corporativa</div>
            <div className="prose prose-slate max-w-none text-[15px] leading-6 prose-headings:mb-3 prose-headings:mt-5 prose-p:my-3 prose-li:my-1 prose-table:block prose-table:overflow-x-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={{
                code({ className, children, ...props }) {
                  const text = String(children).replace(/\n$/, '')
                  return className ? <CodeBlock className={className}>{text}</CodeBlock> : <code className="rounded bg-slate-100 px-1 py-0.5 text-sm" {...props}>{children}</code>
                }
              }}>{formattedContent}</ReactMarkdown>
            </div>
            {sources.length > 0 && (
              <div className="mt-4 border-t border-slate-200 pt-3">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Fuentes consultadas</div>
                <ul className="space-y-1 text-sm text-slate-600">
                  {sources.map((source, index) => <li key={`${source.chunkId ?? source.title ?? 'source'}-${index}`}>{source.url ? <a className="text-indigo-600 hover:underline" href={source.url} target="_blank" rel="noreferrer">{source.title ?? source.url}</a> : (source.title ?? `Documento ${index + 1}`)}</li>)}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
