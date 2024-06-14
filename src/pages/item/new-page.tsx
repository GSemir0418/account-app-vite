import type { ChangeEvent, FormEvent } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createItem } from '@/services/item'
import { TagPicker } from './components/tag-picker'
import { Tag } from '@/types/model'

interface Props { }
export const NewItemPage: React.FC<Props> = () => {
  const nav = useNavigate()

  const [formData, setFormData] = useState<{
    kind: string
    amount: number
    tag: Tag | null
  }>({
    amount: 0,
    kind: 'income',
    tag: null
  })

  const [tagPickerVisible, setTagPickerVisible] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // 暂时在这里做校验，TODO: 后续会集成到组件中
    if (!formData.tag) {
      alert('请选择标签')
      return
    }
    if (!formData.amount) {
      alert('请输入金额')
      return
    }
    try {
      const body = {
        kind: formData.kind,
        amount: Number(formData.amount) * 1000,
        tagId: formData.tag.id,
        happenedAt: new Date().toISOString(),
      }
      await createItem(body)
      alert('创建成功')
      nav('/')
    }
    catch (error) {
      alert('创建失败')
    }
  }

  const handleTagClick = () => {
    setTagPickerVisible(!tagPickerVisible)
  }

  const handleTagSelect = (tag: Tag) => {
    setTagPickerVisible(false)
    setFormData({
      ...formData,
      tag,
    })
  }

  return (
    <div className='h-full flex flex-col items-center mr-4 ml-4'>
      <div className='text-2xl text-teal-500 font-bold m-10'>记一笔</div>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='relative mb-4'>
          <input
            type="text"
            id="tagId"
            name="tagId"
            value={formData.tag?.name}
            readOnly
            placeholder=" "
            onClick={handleTagClick}
            className='
              block
              rounded-md
              px-6
              pt-6
              pb-1
              w-full
              text-md
              text-black
              bg-teal-100
              appearance-none
              focus:outline-none
              focus:ring-0
              peer
            '
          />
          <label
            htmlFor="tagId"
            className='
              absolute
              text-md
              text-zinc-400
              duration-300
              transform
              -translate-y-3
              scale-75
              top-4
              z-10
              origin-[0]
              left-6
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-3'
          >
            标签
          </label>
          {tagPickerVisible && <TagPicker onTagClick={handleTagSelect} />}
        </div>
        <div className='relative mb-4'>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            placeholder=" "
            onChange={handleChange}
            className='
              block
              rounded-md
              px-6
              pt-6
              pb-1
              w-full
              text-md
              text-black
              bg-teal-100
              appearance-none
              focus:outline-none
              focus:ring-0
              peer
            '
          />
          <label
            htmlFor="amount"
            className='
              absolute
              text-md
              text-zinc-400
              duration-300
              transform
              -translate-y-3
              scale-75
              top-4
              z-10
              origin-[0]
              left-6
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-3'
          >
            金额（元）
          </label>
        </div>
        <div className='w-full mt-2 flex'>
          <label className='bg-teal-100 text-zinc-400 px-2 py-1 rounded-md mr-2 w-[50%]'>
            <input
              className='mr-2'
              type="radio"
              name="kind"
              value="income"
              checked={formData.kind === 'income'}
              onChange={handleChange}
            />
            收入
          </label>
          <label className='bg-teal-100 text-zinc-400 px-2 py-1 rounded-md mr-2 w-[50%]'>
            <input
              className='mr-2'
              type="radio"
              name="kind"
              value="expense"
              checked={formData.kind === 'expense'}
              onChange={handleChange}
            />
            支出
          </label>
        </div>
        <button className='w-full mt-4 rounded-md bg-teal-500 px-6 py-1.5 text-center text-md text-white duration-300' type="submit">保存</button>
      </form>
    </div>
  )
}
