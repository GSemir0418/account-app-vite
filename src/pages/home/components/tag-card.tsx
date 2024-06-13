import React from 'react'
import type { TagSummary } from '../../../types/model'

interface Props extends TagSummary { }
export const TagCard: React.FC<Props> = ({
  name,
  summary,
  sign,
}) => {
  return (
    <div className="max-h-30 w-[30vw] relative flex flex-col items-start p-2 rounded-md shadow-lg bg-neutral-100">
      <span className='text-md text-neutral-500 font-bold truncate max-w-full'><span>{sign}</span>{name}</span>
      <span className='text-sm text-neutral-400 pt-2'>{summary}</span>
    </div>
  )
}
