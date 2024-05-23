import {
  createBrowserRouter,
} from 'react-router-dom'
import { HomePage } from '../pages/home/page'
import { NewItemPage } from '../pages/item/new-item-page'
import { NewTagPage } from '../pages/tag/new-tag-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/items/new',
    element: <NewItemPage />,
  },
  {
    path: '/tags/new',
    element: <NewTagPage />,
  },
])
