import { create } from 'zustand'
import type { TagDetail } from '@/types/model'

interface TagStore {
  tag: TagDetail | null
  setTag: (tag: TagDetail) => void
}
export const useTagStore = create<TagStore>(set => ({
  tag: null,
  setTag: t => set({ tag: t }),
}))
