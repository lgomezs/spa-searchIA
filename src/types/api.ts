export interface ApiSource {
  title?: string
  url?: string
  chunkId?: string
  parentId?: string
  content?: string
}

export interface ExecutionMetadata {
  latencyMs?: number
  retrievedDocuments?: number
  model?: string
  [key: string]: unknown
}

export interface ApiResponse {
  answer?: string
  sources?: ApiSource[]
  data?: {
    queryResult?: {
      response?: string
      sources?: ApiSource[]
      [key: string]: unknown
    }
    executionMetadata?: ExecutionMetadata
    [key: string]: unknown
  }
  executionMetadata?: ExecutionMetadata
}

export interface NormalizedAnswer {
  answer: string
  sources: ApiSource[]
  executionMetadata?: ExecutionMetadata
}
