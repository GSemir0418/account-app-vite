import http from './http'
import type { Tag, TagDetail, TagSummary } from '@/types/model'

export function getAllTags() {
  return http.get<{ resources: Tag[] }>('/tags')
}

export function createTag(tag: { name: string, sign: string, kind?: string }) {
  return http.post('/tags', tag)
}

export function getSummaryWithTags(month: string) {
  return http.get<{ resources: TagSummary[] }>(`/tags/summary?month=${month}`)
}

export function getTagDetailByTagId(id: number) {
  return http.get<TagDetail>(`/tags/${id}`)
}

export function updateTag(tag: Tag) {
  return http.patch(`/tags/${tag.id}`, tag)
}

export function removeTag(id: number) {
  return http.delete(`/tags/${id}`)
}
