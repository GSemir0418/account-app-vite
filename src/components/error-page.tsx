import { Navigate, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  // 无组件，仅用于做路由重定向
  // 能够拿到路由的错误信息
  const error = useRouteError()
  const e = error as Error
  if (e instanceof ErrorUnauthorized)
    return <Navigate to="/sign-in" />
  else
    return <div>出错了</div>
}

export class ErrorUnauthorized extends Error {}
