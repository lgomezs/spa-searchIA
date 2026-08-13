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

export interface QueryResult {
  response?: string
  sources?: ApiSource[]
  [key: string]: unknown
}

export interface ApiResponse {
  queryId?: string
  timestamp?: string
  queryRequest?: {
    query?: string
    metadata?: Record<string, unknown>
  }
  queryResult?: QueryResult
  answer?: string
  sources?: ApiSource[]
  executionMetadata?: ExecutionMetadata
  data?: {
    queryResult?: QueryResult
    executionMetadata?: ExecutionMetadata
    [key: string]: unknown
  }
}

export interface NormalizedAnswer {
  answer: string
  sources: ApiSource[]
  executionMetadata?: ExecutionMetadata
}
