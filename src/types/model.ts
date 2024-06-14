
export interface Tag {
  id: number
  name: string
  sign: string
  kind: string
}
export interface TagSummary extends Tag {
  summary: number
}