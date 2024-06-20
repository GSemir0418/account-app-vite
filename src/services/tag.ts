import http from './http'
import type { Tag, TagSummary } from '@/types/model'

export function getAllTags() {
  return http.get<{ resources: Tag[] }>('/tags')
}

export function createTag(tag: { name: string, sign: string, userId?: number, kind?: string }) {
  return http.post('/tags', tag)
}

export function getSummaryWithTags(month: string) {
  return http.get<{ resources: TagSummary[] }>(`/tags/summary?month=${month}`)
}
