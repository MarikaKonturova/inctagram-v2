import clsx from 'clsx'
import React, { type InputHTMLAttributes, forwardRef } from 'react'
import cls from './Checkbox.module.scss'

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = forwardRef<HTMLInputElement, PropsType>(
    ({ className, ...props }, ref) => (
        <input
      type="checkbox"
      ref={ref}
      className={clsx(cls.checkbox, className)}
      {...props}
        />
    )
)
