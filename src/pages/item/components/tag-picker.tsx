import { getAllTags } from "@/services/tag"
import { Tag } from "@/types/model"
import React from "react"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"
interface Props {
  onTagClick: (tag: Tag) => void
}
export const TagPicker: React.FC<Props> = ({ onTagClick }) => {
  const nav = useNavigate()
  const { data, error, isLoading } = useSWR('getAllTags', getAllTags)
  const handleCreateTag = () => {
    nav('/tags/new')
  }
  if (error) return <div>Failed to load tags</div>
  if (isLoading) return <div>Loading tags...</div>
  return (
    <div className="mt-1 w-full bg-teal-100 opacity-50 max-h-40 overflow-auto grid grid-cols-3 gap-2">
      <div className="bg-cyan-300 text-center rounded-md px-2 py-1 cursor-pointer" onClick={handleCreateTag}>+</div>
      {
        data?.data.resources.map(tag => (
          <div key={tag.id} className="bg-cyan-200 text-center rounded-md px-2 py-1 cursor-pointer" onClick={() => onTagClick(tag)}>{tag.name}</div>
        ))
      }
    </div>
  )
}