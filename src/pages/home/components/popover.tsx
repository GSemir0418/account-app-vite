import { animated, useSpring } from '@react-spring/web'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  show: boolean
  onClose: () => void
}
export const Popover: React.FC<Props> = ({ show, onClose }) => {
  const fade = useSpring({
    to: { opacity: show ? 0.5 : 0 },
    from: { opacity: 0 },
  })

  const slideIn = useSpring({
    to: { transform: show ? 'translateX(45%)' : 'translateX(30%)' },
    from: { transform: 'translateX(30%)' },
  })

  if (!show)
    return null

  return (
    <animated.div
      style={fade}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
      onClick={onClose}
    >
      <animated.div
        style={slideIn}
        className="fixed bottom-24 bg-white w-36 h-30 z-50 p-2 text-xl rounded-md"
        onClick={e => e.stopPropagation()}
      >
        <Link className="block mb-1 text-teal-500" to="/items/new">记一笔</Link>
        <Link className="block border-t" to="/tags/new?from=/">新增标签</Link>
      </animated.div>
    </animated.div>
  )
}
