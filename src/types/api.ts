export interface ApiResponse {
  answer: string
  sources?: Array<{
    title: string
    chunkId?: string
    parentId?: string
  }>
}
