import React, { useMemo, useState } from 'react'
import useSWR from 'swr'
import { getSummaryWithTags } from '../../services/tag'
import { AddButton } from './components/add-button'
import { DatePickerDrawer } from './components/date-picker-drawer'
import { Popover } from './components/popover'
import { Tab } from './components/tab'
import { useHomeStore } from '@/stores/useHomeStore'
import type { TagSummary } from '@/types/model'

interface Props { }
export const HomePage: React.FC<Props> = () => {
  const { yearMonth, setYearMonth } = useHomeStore()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const { data, error, isLoading } = useSWR(['getSummaryWithTags', yearMonth], ([_, yearMonth]) => getSummaryWithTags(yearMonth))
  const [showModal, setShowModal] = useState(false)
  const [total, setTotal] = useState({ income: 0, expense: 0 })

  const onSubmit = (yearMonth: string) => {
    setYearMonth(yearMonth)
  }

  const handleAddButtonClick = () => {
    setShowModal(true)
  }

  const handlePopoverClose = () => {
    setShowModal(false)
  }

  const dataGroupByKind = useMemo(() => {
    const _data = data?.data.resources
    if (!_data || _data.length === 0)
      return { income: [], expense: [] }
    const income: TagSummary[] = []
    const expense: TagSummary[] = []
    _data.forEach((tag) => {
      if (tag.kind === 'income')
        income.push(tag)
      else
        expense.push(tag)
    })
    setTotal({
      income: income.reduce((sum, tag) => sum + tag.summary / 1000, 0),
      expense: expense.reduce((sum, tag) => sum + tag.summary / 1000, 0),
    })
    return { income, expense }
  }, [data])

  if (error)
    return <div>failed to load data</div>

  return (
    <div className="h-full flex flex-col items-center">
      <div className="text-2xl text-teal-500 m-10 font-['ZiHunShiGuang']">这可能是一个记账软件？</div>
      <div className="text-teal-500 border-b-2 text-xl border-teal-200 mb-2" onClick={() => setIsDatePickerOpen(true)}>{yearMonth}</div>
      {isLoading && 'loading...'}
      <Tab
        defaultKey="expense"
        tabList={[
          { key: 'expense', label1: '支出', label2: total.expense.toFixed(2), className: 'text-red-500 ml-2', value: dataGroupByKind.expense },
          { key: 'income', label1: '收入', label2: total.income.toFixed(2), className: 'text-teal-500 ml-2', value: dataGroupByKind.income },
        ]}
      />
      <AddButton onAddClick={handleAddButtonClick} />
      <DatePickerDrawer isOpen={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)} onChange={onSubmit} />
      <Popover show={showModal} onClose={handlePopoverClose} />
    </div>
  )
}
