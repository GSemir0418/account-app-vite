import http from './http'

export function getAllTags() {
  return http.get('/tags')
}

export function createTag(tag: { name: string, sign: string, userId?: number }) {
  tag.userId = 1
  return http.post('/tags', tag)
}
