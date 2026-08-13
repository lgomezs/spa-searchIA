import { API_URL } from '../config/api'
import type { ApiResponse, NormalizedAnswer } from '../types/api'

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function askQuestion(question: string, timeoutMs = 30000): Promise<NormalizedAnswer> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(`${API_URL.replace(/\/$/, '')}/assistant/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: controller.signal
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      if (res.status === 400) throw new ApiError('Petición incorrecta (400).', 400)
      if (res.status === 401) throw new ApiError('No autorizado (401).', 401)
      if (res.status === 403) throw new ApiError('Prohibido (403).', 403)
      if (res.status === 404) throw new ApiError('Endpoint no encontrado (404).', 404)
      if (res.status >= 500) throw new ApiError('Error del servidor (5xx).', res.status)
      throw new ApiError(text || `HTTP ${res.status}`, res.status)
    }

    const data = (await res.json()) as ApiResponse
    const queryResult = data.queryResult ?? data.data?.queryResult
    const answer = queryResult?.response ?? data.answer
    if (typeof answer !== 'string' || !answer.trim()) {
      throw new ApiError('Respuesta inválida del servidor.', 500)
    }

    return {
      answer,
      sources: queryResult?.sources ?? data.sources ?? [],
      executionMetadata: data.executionMetadata ?? data.data?.executionMetadata
    }
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Timeout: la petición tardó demasiado.')
    }
    throw err
  } finally {
    clearTimeout(id)
  }
}
