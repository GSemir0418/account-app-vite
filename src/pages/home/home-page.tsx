import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { getSummaryWithTags } from '../../services/tag'
import { TagCard } from './components/tag-card'
import { AddButton } from './components/add-button'
import { DatePickerDrawer } from './components/date-picker-drawer'
import { Popover } from './components/popover'
import { useHomeStore } from '@/stores/useHomeStore'

interface Props { }
export const HomePage: React.FC<Props> = () => {
  const { yearMonth, setYearMonth } = useHomeStore()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const { data, error, isLoading } = useSWR(['getSummaryWithTags', yearMonth], ([_, yearMonth]) => getSummaryWithTags(yearMonth))
  const [showModal, setShowModal] = useState(false)
  const onSubmit = (yearMonth: string) => {
    setYearMonth(yearMonth)
  }

  const handleAddButtonClick = () => {
    setShowModal(true)
  }

  const handlePopoverClose = () => {
    setShowModal(false)
  }

  if (error)
    return <div>failed to load data</div>

  return (
    <div className="h-full flex flex-col items-center">
      <div className="text-2xl text-teal-500 m-10 font-['ZiHunShiGuang']">这可能是一个记账软件？</div>
      <div className="text-teal-500 border-b-2 border-teal-200 mb-2" onClick={() => setIsDatePickerOpen(true)}>{yearMonth}</div>
      {isLoading && 'loading...'}
      {!data?.data.resources
        ? (
          <div className="text-teal-700">
            暂无记录，去
            <Link className="text-blue-500" to="/tags/new">创建标签</Link>
          </div>
          )
        : (
          <div className="grid grid-cols-3 gap-2">
            {data?.data.resources.map(tag => (
              <TagCard {...tag} key={tag.id} />
            ))}
          </div>
          )}
      <AddButton onAddClick={handleAddButtonClick} />
      <DatePickerDrawer isOpen={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)} onChange={onSubmit} />
      <Popover show={showModal} onClose={handlePopoverClose} />
    </div>
  )
}
