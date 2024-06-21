import dayjs from 'dayjs'
import { create } from 'zustand'

interface HomeStore {
  yearMonth: string
  setYearMonth: (yearMonth: string) => void
}
export const useHomeStore = create<HomeStore>(set => ({
  yearMonth: dayjs().format('YYYY-MM'),
  setYearMonth: (yearMonth: string) => set(() => ({ yearMonth })),
}))
