import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
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
    <div className="flex-1 w-full">
      {!filteredData || filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <span className="text-xl text-zinc-400">
            暂无记录，去
            <Link to="/items/new" className="text-teal-500">记一笔</Link>
          </span>
        </div>
      )}
      {filteredData.map(item => (
        <div key={item.id} className="flex flex-row items-center justify-between p-2 border-b">
          <span className={`text-xl ${item.kind === 'income' ? 'text-green-500' : 'text-red-500'}`}>
            {item.kind === 'income' ? '+' : '-'}
            {item.amount / 1000}
          </span>
          <span className="text-sm text-zinc-400">{dayjs(item.happenedAt).format('YYYY-MM-DD HH:mm')}</span>
        </div>
      ))}
    </div>
  )
}
