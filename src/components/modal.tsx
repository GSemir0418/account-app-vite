import { animated, useSpring } from '@react-spring/web'
import React from 'react'

interface Props {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}
export const Modal: React.FC<Props> = ({ show, onClose, children }) => {
  const fade = useSpring({
    to: { opacity: show ? 0.5 : 0 },
    from: { opacity: 0 },
  })

  const slideIn = useSpring({
    to: { transform: show ? 'translateY(0%)' : 'translateY(50%)' },
    from: { transform: 'translateY(0%)' },
  })

  if (!show)
    return null

  return (
    <animated.div
      style={fade}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      <animated.div
        style={slideIn}
        className="bg-white h-30 z-50 p-2 text-xl rounded-md"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </animated.div>
    </animated.div>
  )
}
