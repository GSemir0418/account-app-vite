import { animated, useSpring } from '@react-spring/web'
import React, { useState } from 'react'

interface Props {
  onAddClick: () => void
}
export const AddButton: React.FC<Props> = ({ onAddClick }) => {
  const [clicked, setClicked] = useState(false)

  const props = useSpring({
    to: {
      transform: clicked ? 'scale(1.2)' : 'scale(1)',
    },
    from: {
      transform: 'scale(1)',
    },
    reset: clicked,
    onRest: () => clicked && setClicked(false),
    config: { duration: 80 },
  })

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => {
      onAddClick()
    }, 100)
  }

  return (
    <animated.button
      className="flex justify-center items-center w-14 h-14 shadow rounded-full fixed left-1 bottom-20 bg-teal-300 text-white text-3xl"
      style={props}
      onClick={handleClick}
    >
      <span className="-translate-y-1">+</span>
    </animated.button>
  )
}
