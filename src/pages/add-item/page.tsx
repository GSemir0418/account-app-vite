import React from 'react'
import { EmojiSelector } from './components/emoji-selector'
import { InputNumberPad } from './components/input-number-pad'

interface Props {}
export const AddItemPage: React.FC<Props> = () => {
  return (
    <div>
      <h3>Add Item</h3>
      <EmojiSelector />
      <InputNumberPad />
    </div>
  )
}