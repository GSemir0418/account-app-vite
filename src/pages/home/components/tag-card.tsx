import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { TagSummary } from '../../../types/model'
import { getTagDetailByTagId } from '@/services/tag'
import { useTagDetailStore } from '@/stores/useTagDetailStore'
import { LongPressable } from '@/components/long-pressable'
import { Modal } from '@/components/modal'
import { useTagEditStore } from '@/stores/useTagEditStore'

interface Props extends TagSummary {
  key: React.Key
}

export const TagCard: React.FC<Props> = ({
  name,
  summary,
  sign,
  kind,
  id,
}) => {
  const { setTagDetail } = useTagDetailStore()
  const { setEditTag } = useTagEditStore()
  const [modalShow, setModalShow] = useState(false)

  const handleModalClose = () => setModalShow(false)

  const nav = useNavigate()

  const onTagClick = () => {
    getTagDetailByTagId(id).then((res) => {
      setTagDetail(res.data)
      nav(`/tags/${id}`)
    }).catch(() => {
      alert('get tag details error')
    })
  }

  const handleLongPress = () => {
    setModalShow(true)
  }

  const handleTagDelete = () => {
    const yes = confirm('删除标签同时会删除全部关联账目，确定删除吗？')
    console.log(yes)
  }

  const handleTagEdit = () => {
    setEditTag({ id, name, kind, sign })
  }

  return (
    <>
      <LongPressable onEnd={handleLongPress} onClick={onTagClick} className="max-h-30 w-[30vw] relative flex flex-col items-start p-2 rounded-md shadow-lg bg-neutral-100 active:shadow-inner">
        <span className="text-md text-neutral-500 font-bold truncate max-w-full">
          <span>{sign}</span>
          {name}
        </span>
        <span className={`${kind === 'income' ? 'text-emerald-400' : 'text-rose-300'} text-sm pt-2`}>{summary / 1000}</span>
      </LongPressable>
      <Modal onClose={handleModalClose} show={modalShow}>
        <Link className="block mb-1" to="/tags/edit" onClick={handleTagEdit}>编辑标签</Link>
        <div className="block border-t text-rose-500" onClick={handleTagDelete}>删除标签</div>
      </Modal>
    </>
  )
}
