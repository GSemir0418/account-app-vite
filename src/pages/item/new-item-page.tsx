import type { ChangeEvent, FormEvent } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TagPicker } from './components/tag-picker'
import { createItem } from '@/services/item'
import type { Tag } from '@/types/model'
import { Radio } from '@/components/form/radio'
import { Input } from '@/components/form/input'

interface Props { }
export const NewItemPage: React.FC<Props> = () => {
  const nav = useNavigate()

  const [formData, setFormData] = useState<{
    kind: 'expense' | 'income'
    amount: number
    tag: Tag | null
  }>({
    amount: 0,
    kind: 'expense',
    tag: null,
  })

  const [tagPickerVisible, setTagPickerVisible] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (name === 'kind') {
      setFormData({
        ...formData,
        tag: null,
      })
    }
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
    <div className="h-full flex flex-col items-center mr-4 ml-4">
      <div className="text-2xl text-teal-500 font-bold m-10">记一笔</div>
      <form onSubmit={handleSubmit} className="w-full">
        <Radio
          props={[
            {
              name: 'kind',
              value: 'income',
              checked: formData.kind === 'income',
              label: '收入',
              onChange: handleChange,
            },
            {
              name: 'kind',
              value: 'expense',
              checked: formData.kind === 'expense',
              label: '支出',
              onChange: handleChange,
            },
          ]}
        />
        <Input
          label="标签"
          name="tagId"
          readOnly
          value={formData.tag?.name}
          onClick={handleTagClick}
          picker={tagPickerVisible && <TagPicker kind={formData.kind} onTagClick={handleTagSelect} />}
        />
        <Input
          type="number"
          label="金额（元）"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <button className="w-full mt-4 rounded-md bg-teal-500 px-6 py-1.5 text-center text-md text-white duration-300" type="submit">保存</button>
      </form>
    </div>
  )
}
