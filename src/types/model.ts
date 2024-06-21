export interface Tag {
  id: number
  name: string
  sign: string
  kind: 'expense' | 'income'
}
export interface TagSummary extends Tag {
  summary: number
}
