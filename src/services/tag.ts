import http from './http'
import { TagSummary } from '@/types/model'

export function getAllTags() {
  return http.get('/tags')
}

export function createTag(tag: { name: string, sign: string, userId?: number }) {
  tag.userId = 1
  return http.post('/tags', tag)
}

export function getSummaryWithTags(month: string) {
  return http.get<{resources: TagSummary[]}>(`api/v1/tags/summary?month=${month}`)
}
