import React from 'react'
import { Link } from 'react-router-dom'
import { TagCard } from './components/tag-card'

interface Props { }
export const HomePage: React.FC<Props> = () => {
  const tag = {
    id: 1,
    name: '测试',
    sign: '❤️',
    summary: 100,
    kind: 'expenses',
  }
  return (
    <div className="h-full flex flex-col items-center justify-center text-white">
      <div>这可能是一个记账软件？</div>
      <div className="flex flex-wrap">
        <TagCard {...tag} />
        <TagCard {...tag} />
        <TagCard {...tag} />
        <TagCard {...tag} />
        <TagCard {...tag} />
        <TagCard {...tag} />
        <TagCard {...tag} />
      </div>
      <Link to="/items/new">记一笔</Link>
    </div>
  )
}
