import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { TagSummary } from '../../../types/model'
import { getItemsByTagId } from '@/services/tag'
import { useTagStore } from '@/stores/useTagStore'

interface Props extends TagSummary {
  key: React.Key
}

export const TagCard: React.FC<Props> = ({
  name,
  summary,
  sign,
  kind,
  id,
}) => {
  const { setTag } = useTagStore()

  const nav = useNavigate()

  const onTagClick = () => {
    getItemsByTagId(id).then((res) => {
      setTag(res.data)
      nav(`/tags/${id}`)
    }).catch(() => {
      alert('get tag details error')
    })
  }

  return (
    <div onClick={onTagClick} className="touch-pan-up max-h-30 w-[30vw] relative flex flex-col items-start p-2 rounded-md shadow-lg bg-neutral-100">
      <span className="text-md text-neutral-500 font-bold truncate max-w-full">
        <span>{sign}</span>
        {name}
      </span>
      <span className={`${kind === 'income' ? 'text-emerald-400' : 'text-rose-300'} text-sm pt-2`}>{summary / 1000}</span>
    </div>
  )
}
