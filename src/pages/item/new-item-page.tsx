import type { ChangeEvent, FormEvent } from 'react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createItem } from '../../services/item'
import { getAllTags } from '../../services/tag'

interface Props { }
export interface Tag {
  ID: number
  name: string
  sign: string
}
export const NewItemPage: React.FC<Props> = () => {
  const nav = useNavigate()

  const [formData, setFormData] = useState<{
    kind: string
    amount: number
  }>({
    amount: 0,
    kind: 'income',
  })

  const [tagList, setTagList] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState<Tag>()

  useEffect(() => {
    // 获取 tag 列表
    getAllTags().then((res) => {
      if (res.data.resources.length)
        setTagList(res.data.resources)
    })
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const body = {
        ...formData,
        amount: Number(formData.amount),
        tagIds: [selectedTag!.ID],
        happenedAt: new Date().toISOString(),
      }
      const response = await createItem(body)
      console.log('Response:', response.data)
      alert('Item created successfully')
      nav('/')
    }
    catch (error) {
      alert('Error create item')
    }
  }

  const handleCreateTag = () => {
    nav('/tags/new')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="tag">Tag:</label>
        <div>
          {tagList.length > 0
            && tagList.map(tag => (
              <span key={tag.ID} onClick={() => { setSelectedTag(tag) }}>
                {selectedTag?.ID === tag.ID && '✅'}
                {tag.sign}
                {tag.name}
                |
              </span>
            ),
            )}
          <button onClick={handleCreateTag}>创建 tag</button>
        </div>
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="kind"
            value="income"
            checked={formData.kind === 'income'}
            onChange={handleChange}
          />
          Income
        </label>
        <label>
          <input
            type="radio"
            name="kind"
            value="expense"
            checked={formData.kind === 'expense'}
            onChange={handleChange}
          />
          Expense
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
