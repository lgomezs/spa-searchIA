import { useCallback, useEffect, useState } from 'react'
import type { Message } from '../types/chat'
import { askQuestion } from '../services/aiService'

const STORAGE_KEY = 'dev-ai-assistant:history'

function createMessageId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) as Message[] : []
    } catch (e) {
      console.error('Could not read history', e)
      return []
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch (e) {
      console.error('Could not persist history', e)
    }
  }, [messages])

  const sendMessage = useCallback(async (content: string) => {
    if (loading) return
    setError(null)
    setMessages((m) => [...m, { id: createMessageId(), role: 'user', content, timestamp: new Date().toISOString() }])
    setLoading(true)

    try {
      const res = await askQuestion(content)
      setMessages((m) => [...m, {
        id: createMessageId(),
        role: 'assistant',
        content: res.answer,
        timestamp: new Date().toISOString(),
        sources: res.sources,
        executionMetadata: res.executionMetadata
      }])
    } catch (err: unknown) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'No pudimos obtener una respuesta del asistente. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }, [loading])

  const newConversation = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const clearHistory = useCallback(() => {
    setMessages([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error('Could not clear history', e)
    }
  }, [])

  return { messages, loading, error, sendMessage, newConversation, clearHistory }
}
