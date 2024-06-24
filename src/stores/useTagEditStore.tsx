import { create } from 'zustand'
import type { Tag } from '@/types/model'

interface TagEditStore {
  editTag: Tag | null
  setEditTag: (editTag: Tag | null) => void
}

export const useTagEditStore = create<TagEditStore>(set => ({
  editTag: null,
  setEditTag: t => set({ editTag: t }),
}))
