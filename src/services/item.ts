import http from './http'

export function createItem(item: { amount: number, kind: string, tagId: number, userId?: number, happenedAt: string }) {
  item.userId = 1001
  return http.post('/items', item)
}

export function getPagedItems(page: number, pageSize: number) {
  return http.get(`/items?page=${page}&page_size=${pageSize}`)
}