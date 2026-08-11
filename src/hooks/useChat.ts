import { useCallback, useEffect, useState } from 'react'
import { Message } from '../types/chat'
import { askQuestion } from '../services/aiService'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'dev-ai-assistant:history'

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

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }

    setMessages((m) => [...m, userMessage])
    setLoading(true)

    try {
      const res = await askQuestion(content)
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: res.answer,
        timestamp: new Date().toISOString()
      }
      setMessages((m) => [...m, assistantMessage])
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'No pudimos obtener una respuesta del asistente. Intenta nuevamente.')
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

  return {
    messages,
    loading,
    error,
    sendMessage,
    newConversation,
    clearHistory
  }
}
