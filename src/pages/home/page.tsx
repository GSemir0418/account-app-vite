import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPagedItems } from '../../services/item'
import type { Tag } from '../item/new-item-page'

interface Item {
  ID: number
  amount: number
  kind: string
  Tags: Tag[]
}
interface Props { }
export const HomePage: React.FC<Props> = () => {
  const [itemList, setItemList] = useState<Item[]>([])
  useEffect(() => {
    getPagedItems(1, 10).then((res) => {
      if (res.data.resources.length)
        setItemList(res.data.resources)
    })
  }, [])
  return (
    <div>
      <h3>这可能是一个记账软件？</h3>
      {itemList.length > 0 && (
        <ul>
          {itemList.map(item => (
            <li key={item.ID}>
              {item.kind === 'expenses' ? '➖' : '➕'}
              {item.Tags[0].name}
              {' '}
              {item.amount}
            </li>
          ))}
        </ul>
      )}
      <Link to="/items/new">记一笔</Link>
    </div>
  )
}
