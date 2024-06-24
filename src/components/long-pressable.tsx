import type { TouchEventHandler } from 'react'
import React, { useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  onEnd?: () => void
  onClick?: () => void
}

export const LongPressable: React.FC<Props> = ({
  children,
  className,
  onEnd,
  onClick,
}) => {
  const touchTimer = useRef<number>()
  const touchPosition = useRef<{ x?: number, y?: number }>({
    x: undefined,
    y: undefined,
  })
  const longPressTriggered = useRef(false)

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchTimer.current = window.setTimeout(() => {
      longPressTriggered.current = true
      onEnd?.()
    }, 500)
    const { clientX: x, clientY: y } = e.touches[0]
    touchPosition.current = { x, y }
  }
  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const { clientX: newX, clientY: newY } = e.touches[0]
    const { x, y } = touchPosition.current
    if (x === undefined || y === undefined)
      return
    const distance = Math.sqrt((newX - x) ** 2 + (newY - y) ** 2)
    if (distance > 10) {
      window.clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }
  const onTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
    if (touchTimer.current) {
      window.clearTimeout(touchTimer.current)

      if (!longPressTriggered.current && onClick)
        onClick()

      touchTimer.current = undefined
    }
    longPressTriggered.current = false
  }

  return (
    <div
      className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
