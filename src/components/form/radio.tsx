import type { ChangeEvent } from 'react'

interface RadioProps {
  name: string
  value: string
  checked: boolean
  label: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Radio: React.FC<{ props: RadioProps[] }> = ({ props }) => {
  return (
    <div className="w-full mb-4 flex gap-2">
      {props.map((radio, index) => (
        <label key={index} className="bg-teal-100 text-zinc-400 px-2 py-1 rounded-md flex-1">
          <input
            className="mr-2"
            type="radio"
            name={radio.name}
            value={radio.value}
            checked={radio.checked}
            onChange={radio.onChange}
          />
          {radio.label}
        </label>
      ))}
    </div>
  )
}
