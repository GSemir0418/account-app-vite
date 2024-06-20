import { type ChangeEvent, type ReactNode, useEffect, useState } from 'react'

interface InputProps {
  type?: 'text' | 'number'
  name: string
  value: string | number | undefined
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
  readOnly?: boolean
  onClick?: () => void
  picker?: ReactNode
}
interface InputCodeProps {
  name: string
  value: string | number | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
  handleSendCode: () => void
  countdown: boolean
  shutdownCountdown: () => void
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  label,
  readOnly = false,
  onClick,
  picker,
}) => {
  return (
    <div className="relative mb-4">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        onClick={onClick}
        placeholder=" "
        className="
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-black
          bg-teal-100
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
        "
      />
      <label
        htmlFor={name}
        className="
          absolute
          text-md
          text-zinc-400
          duration-300
          transform
          -translate-y-3
          scale-75
          top-4
          z-10
          origin-[0]
          left-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3"
      >
        {label}
      </label>
      {picker}
    </div>
  )
}

// 验证码表单
export const InputCode: React.FC<InputCodeProps> = ({
  name,
  value,
  onChange,
  label,
  handleSendCode,
  countdown,
  shutdownCountdown,
}) => {
  const [count, setCount] = useState(30)

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (count > 0 && countdown) {
        setCount(c => c - 1)
      }
      else {
        clearInterval(timeInterval)
        shutdownCountdown()
        setCount(30)
      }
    }, 1000)
    return () => clearInterval(timeInterval)
  }, [countdown, count])

  return (
    <div className="relative mb-4 flex flex-row gap-2">
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-black
          bg-teal-100
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
        "
      />
      <label
        htmlFor={name}
        className="
          absolute
          text-md
          text-zinc-400
          duration-300
          transform
          -translate-y-3
          scale-75
          top-4
          z-10
          origin-[0]
          left-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3"
      >
        {label}
      </label>
      <button disabled={countdown} type="button" className="bg-teal-300 w-40 rounded-md px-4 py-2 text-white disabled:bg-gray-300" onClick={handleSendCode}>{countdown ? count : '发送'}</button>
    </div>
  )
}
