import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  isBackIcon?: boolean
}

export const Header: React.FC<Props> = ({ title, isBackIcon = true }) => {
  const nav = useNavigate()

  return (
    <div className="relative text-2xl text-teal-500 font-['ZiHunShiGuang'] m-10 w-full text-center">
      {isBackIcon && <span className="absolute left-0 top-0 text-xl text-teal-500 opacity-50" onClick={() => nav(-1)}>{'<'}</span>}
      {title}
    </div>
  )
}
