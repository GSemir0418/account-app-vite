import React from 'react'
import type { Item } from '@/types/model'

interface Props {
  items: Item[]
}
export const ItemList: React.FC<Props> = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          {item.happenedAt}
          {' '}
          {item.amount / 1000}
        </div>
      ))}
    </div>
  )
}
