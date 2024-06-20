import {
  createBrowserRouter,
} from 'react-router-dom'
import type { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { HomePage } from '../pages/home/home-page'
import { NewItemPage } from '../pages/item/new-item-page'
import { NewTagPage } from '../pages/tag/new-tag-page'
import { ErrorPage, ErrorUnauthorized } from '@/components/error-page'
import { getSummaryWithTags } from '@/services/tag'
import { SignInPage } from '@/pages/signin/signin-page'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    loader: async () => {
      // 预请求页面数据，然后在 errorElement 中捕获并处理错误
      const onError = (error: AxiosError) => {
        if (error.response?.status === 401)
          throw new ErrorUnauthorized()
        throw error
      }
      const response = await getSummaryWithTags(dayjs().format('YYYY-MM')).catch(onError)
      // 这里返回的数据可以在组件中使用 useLoaderData 获取到
      return response.data
      // 可以在这里使用 swr 的 preload 方法预请求页面数据
    },
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
  { path: '/sign-in', element: <SignInPage /> },
])
