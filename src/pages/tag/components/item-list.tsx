import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import type { Item } from '@/types/model'
import { useHomeStore } from '@/stores/useHomeStore'

interface Props {
  items: Item[]
}
export const ItemList: React.FC<Props> = ({ items }) => {
  const { yearMonth } = useHomeStore()

  const filteredData = useMemo(() => {
    const monthStart = dayjs(yearMonth).startOf('month')
    const monthEnd = dayjs(yearMonth).endOf('month')
    return items.filter((item) => {
      const itemDate = dayjs(item.happenedAt)
      return itemDate.isAfter(monthStart) && itemDate.isBefore(monthEnd)
    })
  }, [yearMonth, items])

  return (
    <div>
      {filteredData.map(item => (
        <div key={item.id}>
          {item.happenedAt}
          {' '}
          {item.amount / 1000}
        </div>
      ))}
    </div>
  )
}
