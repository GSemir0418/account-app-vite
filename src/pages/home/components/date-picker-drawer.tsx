import { animated, useSpring } from '@react-spring/web'
import { useRef } from 'react'
import Wheel from '../../../components/wheel/wheel'

interface Props {
  isOpen: boolean
  onClose: () => void
  onChange: (yearMonth: string) => void
}

export const DatePickerDrawer: React.FC<Props> = ({ isOpen, onClose, onChange }) => {
  const year = useRef(new Date().getFullYear())
  const month = useRef(new Date().getMonth() + 1)

  const drawerAnimation = useSpring({
    transform: isOpen ? `translateY(0)` : `translateY(100%)`,
  })
  const maskAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
  })

  const closeDrawer = () => onClose()

  const onSelect = () => {
    const yearMonth = `${year.current}-${month.current.toString().padStart(2, '0')}`
    onChange(yearMonth)
    onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 transition-all ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={maskAnimation as any}
      onClick={closeDrawer}
    >
      <animated.div
        className="w-full bg-white rounded-t-xl shadow-xl"
        style={drawerAnimation}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <button className="mb-4 py-2 text-zinc-500" onClick={closeDrawer}>
              关闭
            </button>
            <button className="mb-4 py-2 px-4 bg-teal-500 text-white rounded" onClick={onSelect}>
              查询
            </button>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full h-60">
              <Wheel
                getCurrentValue={(s) => {
                  year.current = s?.abs ? new Date().getFullYear() + s.abs - 10 : year.current
                }}
                setValue={(_, abs) => String(abs + new Date().getFullYear() - 10)}
                initIdx={10}
                length={20}
                width={23}
                loop={false}
              />
            </div>
            <div className="w-full h-60">
              <Wheel
                getCurrentValue={s => month.current = s?.abs ?? month.current}
                initIdx={month.current - 1}
                length={12}
                width={23}
                loop={false}
              />
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  )
}
