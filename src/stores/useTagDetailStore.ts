import { create } from 'zustand'
import type { TagDetail } from '@/types/model'

interface TagDetailStore {
  tagDetail: TagDetail | null
  setTagDetail: (tagDetail: TagDetail) => void
}

export const useTagDetailStore = create<TagDetailStore>(set => ({
  tagDetail: null,
  setTagDetail: t => set({ tagDetail: t }),
}))
