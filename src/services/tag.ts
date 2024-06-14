import http from './http'
import { TagSummary } from '@/types/model'

export function getAllTags() {
  return http.get('/tags')
}

export function createTag(tag: { name: string, sign: string, userId?: number, kind?: string}) {
  tag.userId = 1001
  tag.kind = 'expense'
  return http.post('/tags', tag)
}

export function getSummaryWithTags(month: string) {
  return http.get<{resources: TagSummary[]}>(`/tags/summary?month=${month}`)
}
