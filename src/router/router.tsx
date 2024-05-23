import {
  createBrowserRouter,
} from 'react-router-dom'
import { HomePage } from '../pages/home/page'
import { AddItemPage } from '../pages/add-item/page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/add-item',
    element: <AddItemPage />,
  },
])
