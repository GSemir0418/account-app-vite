import React from 'react'
import { Link } from 'react-router-dom'

interface Props {}
export const HomePage: React.FC<Props> = () => {
  return (
    <div>
      <h3>这可能是一个记账软件？</h3>
      <Link to={'/add-item'}>记一笔</Link>
    </div>
  )
}
