import { type ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, InputCode } from '@/components/form/input'
import { sendCode, signIn } from '@/services/session'
import { Header } from '@/components/header'

export function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    code: '',
  })
  const [countdown, setCountdown] = useState(false)

  const nav = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSendCode = async () => {
    if (formData.email === '' || !/^.[^\n\r@\u2028\u2029]*@.+$/.test(formData.email)) {
      alert('请输入正确的邮箱')
      return
    }
    try {
      const res = await sendCode(formData.email)
      if (res.status === 200) {
        alert('验证码已发送')
        setCountdown(true)
      }
    }
    catch (error) {
      alert('Error send code')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 校验
    if (formData.email === '' || formData.code === '') {
      alert('请输入邮箱和验证码')
      return
    }
    try {
      const res = await signIn(formData)
      if (res.status === 200) {
        alert('登录成功')
        localStorage.setItem('jwt', res.data.jwt)
        nav('/')
      }
    }
    catch (error) {
      alert(`Error login with ${error}`)
    }
  }

  return (
    <div className="h-full flex flex-col items-center mr-4 ml-4">
      <Header title="登录" isBackIcon={false} />
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          label="邮箱"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputCode
          label="验证码"
          name="code"
          value={formData.code}
          onChange={handleChange}
          handleSendCode={handleSendCode}
          countdown={countdown}
          shutdownCountdown={() => setCountdown(false)}
        />
        <button type="submit" className="w-full rounded-md bg-teal-500 px-6 py-1.5 text-center text-md text-white duration-300">登录</button>
      </form>
    </div>
  )
}
