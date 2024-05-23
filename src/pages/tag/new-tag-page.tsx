import type { ChangeEvent, FormEvent } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmojiPicker from 'emoji-picker-react'
import type { MouseDownEvent } from 'emoji-picker-react/dist/config/config'
import { createTag } from '../../services/tag'

interface Props { }
export const NewTagPage: React.FC<Props> = () => {
  const nav = useNavigate()
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
    setFormData({
      ...formData,
      sign: emojiObject.emoji,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await createTag(formData)
      console.log(response)
      alert('Create tag successfully!')
      nav('/items/new')
    }
    catch (error) {
      alert('Error creating tag')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="emoji">Emoji:</label>
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
          {formData.sign && (
            <p>
              Selected Emoji:
              {formData.sign}
            </p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
