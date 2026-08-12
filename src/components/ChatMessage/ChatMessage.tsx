import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

export default function ChatMessage({ role, content }: { role: 'user' | 'assistant'; content: string }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-3`}> 
      <div className={`${isUser ? 'bg-indigo-600 text-white' : 'bg-white text-slate-800 border'} w-fit max-w-[95%] p-4 rounded-lg shadow-sm`}>
        {isUser ? (
          <div>{content}</div>
        ) : (
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  )
}
