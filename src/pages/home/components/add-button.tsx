import { animated, useSpring } from '@react-spring/web'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props { }
export const AddButton: React.FC<Props> = () => {
  const navigate = useNavigate()

  const [props, set] = useSpring(() => ({
    to: {
      transform: 'scale(1)',
      opacity: '1',
    },
    from: {
      transform: 'scale(0)',
      opacity: '1',
    },
  }))

  const expandAndNavigate = () => {
    set({
      to: {
        transform: 'scale(30)',
        opacity: '0',
      },
      config: { duration: 500 },
    })

    setTimeout(() => navigate('/items/new'), 200)
  }

  return (
    <animated.button className="flex justify-center items-center w-14 h-14 shadow-2xl rounded-full fixed left-1 bottom-20 bg-teal-400 text-white text-3xl" style={props} onClick={expandAndNavigate}>
      <span className="-translate-y-1">+</span>
    </animated.button>
  )
}
