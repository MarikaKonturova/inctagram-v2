import clsx from 'clsx'
import React, { type InputHTMLAttributes, forwardRef } from 'react'

import cls from './Checkbox.module.scss'

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = forwardRef<HTMLInputElement, PropsType>(({ className, ...props }, ref) => (
  <input className={clsx(cls.checkbox, className)} ref={ref} type={'checkbox'} {...props} />
))
