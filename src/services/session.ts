import http from './http'

export function sendCode(email: string) {
  return http.post(`/validation-codes`, { email })
}

export function signIn(data: {email: string, code: string}){
  return http.post(`/session`, data)
}