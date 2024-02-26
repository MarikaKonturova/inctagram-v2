import clsx from 'clsx'
import React, { type ButtonHTMLAttributes, type ReactNode, memo } from 'react'

import cls from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean
  children?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  theme?: 'clear' | 'outline' | 'primary' | 'secondary' | 'textButton'
}

export const Button = memo((props: ButtonProps) => {
  const { block, children, className, disabled, onClick, theme = 'primary', ...otherProps } = props

  const mods = {
    [cls.block]: block,
    [cls.disabled]: disabled,
  }

  return (
    <button
      className={clsx(cls.Button, mods, [className, cls[theme]])}
      disabled={disabled}
      onClick={onClick}
      type={'button'}
      {...otherProps}
    >
      {children}
    </button>
  )
})
