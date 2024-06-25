import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TagCard } from './tag-card'
import type { TagSummary } from '@/types/model'

interface Props {
  tabList: {
    key: React.Key
    label1: string
    label2: string
    className: string
    value: TagSummary[]
  }[]
}

interface TabCardProps {
  tagList: TagSummary[]
  id: React.Key
}

export const TabCard: React.FC<TabCardProps> = ({ tagList, id }) => {
  return (
    <div id={id as string} className="h-full min-w-full snap-center snap-normal text-center px-4">
      {tagList.length === 0
        ? (
          <div className="text-teal-700">
            暂无记录，去
            <Link className="text-blue-500" to="/tags/new">创建标签</Link>
          </div>
        )
        : (
          <div className="grid grid-cols-3 gap-2">
            {tagList.map(tag => (
              <TagCard {...tag} key={tag.id} />
            ))}
          </div>
        )}
    </div>
  )
}

export const Tab: React.FC<Props> = ({ tabList }) => {
  const [activeKey, setActiveKey] = useState('expense')
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActiveKey(entry.target.id)
        })
      },
      { threshold: 0.5 },
    )

    tabList.forEach((tab) => {
      observer.current?.observe(document.getElementById(tab.key as string)!)
    })

    return () => {
      observer.current?.disconnect()
      observer.current = undefined
    }
  }, [])

  const handleTabClick = (key: string) => {
    document.getElementById(tabList.find(tab => tab.key === key)?.key as string)?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    setActiveKey(key)
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="w-full flex justify-between px-8 mb-2 text-lg text-zinc-400">
        {tabList.map(tab => (
          <span
            key={tab.key}
            className={`${activeKey === tab.key ? ' border-b-2 border-teal-200 text-zinc-600 text-xl' : ''}`}
            onClick={() => handleTabClick(tab.key as string)}
          >
            {tab.label1}
            <span className={tab.className}>{tab.label2}</span>
          </span>
        ))}
      </div>
      <div className="flex-1 flex w-full relative snap-x snap-mandatory overflow-auto hide-scrollbar">
        {tabList.map(tab => (
          <TabCard key={tab.key} id={tab.key} tagList={tab.value} />
        ))}
      </div>
    </div>
  )
}
