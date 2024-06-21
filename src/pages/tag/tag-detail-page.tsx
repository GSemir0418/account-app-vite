import React from 'react'
import { ItemList } from './components/item-list'
import { useTagStore } from '@/stores/useTagStore'
import { Header } from '@/components/header'

interface Props { }
export const TagDetailPage: React.FC<Props> = () => {
  const { tag } = useTagStore()
  if (!tag)
    return 'fail to load data'
  return (
    <div className="h-full flex flex-col items-center mr-4 ml-4">
      <Header title={tag.name} />
      <ItemList items={tag.items} />
    </div>
  )
}
