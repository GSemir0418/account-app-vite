import type { ChangeEvent, FormEvent } from 'react'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react'
import type { MouseDownEvent } from 'emoji-picker-react/dist/config/config'
import { createTag } from '../../services/tag'
import { Input } from '@/components/form/input'
import { Radio } from '@/components/form/radio'

interface Props { }
export const NewTagPage: React.FC<Props> = () => {
  const nav = useNavigate()
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    sign: '',
    kind: 'expense',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleEmojiSelect: MouseDownEvent = (emojiObject) => {
    setEmojiPickerVisible(false)
    setFormData({
      ...formData,
      sign: emojiObject.emoji,
    })
  }

  const [searchParams] = useSearchParams()
  const fromUrl = searchParams.get('from')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // 暂时在这里做校验，TODO: 后续会集成到组件中
    if (!formData.name) {
      alert('请输入标签名称')
      return
    }
    if (!formData.sign) {
      alert('请输入标签名称')
      return
    }
    try {
      await createTag(formData)
      alert('创建成功')

      if (fromUrl)
        nav(fromUrl)
      else
        nav(-1)
    }
    catch (error) {
      alert('Error creating tag')
    }
  }

  const handleEmojiClick = () => {
    setEmojiPickerVisible(!emojiPickerVisible)
  }

  return (
    <div className="h-full flex flex-col items-center mr-4 ml-4">
      <div className="text-2xl text-teal-500 font-['ZiHunShiGuang'] m-10">创建标签</div>
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
          label="标签名称"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Emoji"
          name="emoji"
          onChange={handleChange}
          value={formData.sign}
          readOnly
          onClick={handleEmojiClick}
          picker={emojiPickerVisible && <EmojiPicker previewConfig={{ showPreview: false }} width="100%" height={300} onEmojiClick={handleEmojiSelect} />}
        />
        <button className="w-full rounded-md bg-teal-500 px-6 py-1.5 text-center text-md text-white duration-300">保存</button>
      </form>
    </div>
  )
}
