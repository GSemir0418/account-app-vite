import React from 'react'
import type { TagSummary } from '../../../types/model'

interface Props extends TagSummary { }
export const TagCard: React.FC<Props> = ({
  name,
  summary,
  sign,
}) => {
  return (
    <div className=" max-w-3 text-blue-400 border-2 border-stone-700 border-solid flex flex-col items-center justify-center p-4 rounded-md">
      <span>{name}</span>
      <span>{sign}</span>
      <span>{summary}</span>
    </div>
  )
}
