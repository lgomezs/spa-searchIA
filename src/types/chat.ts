import type { ApiSource, ExecutionMetadata } from './api'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  sources?: ApiSource[]
  executionMetadata?: ExecutionMetadata
}
