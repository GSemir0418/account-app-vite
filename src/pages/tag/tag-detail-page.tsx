import React from 'react'
import { ItemList } from './components/item-list'
import { useTagDetailStore } from '@/stores/useTagDetailStore'
import { Header } from '@/components/header'

interface Props { }
export const TagDetailPage: React.FC<Props> = () => {
  const { tagDetail } = useTagDetailStore()

  if (!tagDetail)
    return 'fail to load data'

  return (
    <div className="h-full flex flex-col items-center mr-4 ml-4">
      <Header title={tagDetail.name} />
      <ItemList items={tagDetail.items} />
    </div>
  )
}
