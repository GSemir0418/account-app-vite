type Kind = 'expense' | 'income'

export interface Tag {
  id: number
  name: string
  sign: string
  kind: Kind
}

export interface TagSummary extends Tag {
  summary: number
}

export interface TagDetail extends Tag {
  items: Item[]
}

export interface Item {
  id: number
  amount: number
  kind: Kind
  happenedAt: string
}
