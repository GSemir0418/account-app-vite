import React from 'react'
import { Link } from 'react-router-dom'

interface Props { }
export const AddButton: React.FC<Props> = () => {
  return <span className='flex justify-center items-center w-14 h-14 border-solid shadow-2xl rounded-full fixed left-1 bottom-20 bg-teal-200 text-3xl'><Link to="/items/new">+</Link></span>
}