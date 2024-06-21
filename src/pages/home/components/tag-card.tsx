import React from 'react'
import type { TagSummary } from '../../../types/model'

interface Props extends TagSummary {
  key: React.Key
}

export const TagCard: React.FC<Props> = ({
  key,
  name,
  summary,
  sign,
  kind,
}) => {
  console.log(kind)
  return (
    <div key={key} className="max-h-30 w-[30vw] relative flex flex-col items-start p-2 rounded-md shadow-lg bg-neutral-100">
      <span className="text-md text-neutral-500 font-bold truncate max-w-full">
        <span>{sign}</span>
        {name}
      </span>
      <span className={`${kind === 'income' ? 'text-emerald-400' : 'text-rose-300'} text-sm pt-2`}>{summary / 1000}</span>
    </div>
  )
}
