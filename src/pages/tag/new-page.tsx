import type { ChangeEvent, FormEvent } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react'
import type { MouseDownEvent } from 'emoji-picker-react/dist/config/config'
import { createTag } from '../../services/tag'

interface Props { }
export const NewTagPage: React.FC<Props> = () => {
  const nav = useNavigate()
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    sign: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData({
      ...formData,
      name: value,
    })
  }

  const handleEmojiSelect: MouseDownEvent = (emojiObject) => {
    setEmojiPickerVisible(false)
    setFormData({
      ...formData,
      sign: emojiObject.emoji,
    })
  }

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
    <div className='h-full flex flex-col items-center mr-4 ml-4'>
      <div className='text-2xl text-teal-500 font-bold m-10'>创建标签</div>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='relative mb-4'>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
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
            htmlFor="name"
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
            标签名称
          </label>
        </div>
        <div className='relative mb-4'>
          <input
            type="text"
            id="emoji"
            name="emoji"
            value={formData.sign}
            readOnly
            placeholder=" "
            onClick={handleEmojiClick}
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
            htmlFor="emoji"
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
            Emoji
          </label>
          {emojiPickerVisible && <EmojiPicker previewConfig={{ showPreview: false }} width='100%' height={300} onEmojiClick={handleEmojiSelect} />}
        </div>
        <button className='w-full rounded-md bg-teal-500 px-6 py-1.5 text-center text-md text-white duration-300'>保存</button>
      </form>
    </div>
  )
}
