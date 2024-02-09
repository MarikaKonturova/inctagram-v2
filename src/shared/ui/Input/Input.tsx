import clsx from 'clsx'
import { type InputHTMLAttributes, type ReactNode, forwardRef, memo, useState } from 'react'
import Search from 'shared/assets/icons/general/search.svg'
import { Eye } from 'shared/ui/Eye/Eye'

import cls from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  className?: string
  disabled?: boolean
  errorText?: string
  inputClassName?: string
  isRequired?: boolean
  label?: string
  labelClassName?: string
  placeholder?: string
  type?: 'email' | 'password' | 'search' | 'text' /* text or password */
  variant?: 'outline' | 'standard'
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
      children,
      className,
      disabled,
      errorText,
      id,
      inputClassName,
      isRequired,
      label,
      labelClassName,
      placeholder,
      type = 'text',
      variant = 'standard',
      ...otherProps
    } = props

    const mods = {
      [cls.disabled]: disabled,
      [cls.error]: !!errorText,
      [cls.outline]: type === 'search',
    }

    const mod = {
      [cls.error]: !!errorText,
    }

    const [isVisible, setIsVisible] = useState(false)

    const onClickChangeVisible = (): void => {
      setIsVisible(!isVisible)
    }

    const isPassword = type === 'password' && !isVisible ? 'password' : 'text'

    return (
      <div className={clsx(cls.field, className)}>
        {label && (
          <span className={labelClassName}>
            {label}
            {isRequired && <span className={cls.required}>*</span>}
          </span>
        )}
        <div className={clsx(cls.wrapper, mod, cls[variant])}>
          <input
            autoComplete={type === 'password' ? 'on' : 'off'}
            className={clsx(cls.input, mods, [cls[type]], inputClassName)}
            disabled={disabled}
            placeholder={placeholder}
            ref={ref}
            type={type !== 'password' ? type : isPassword}
            {...otherProps}
          />
          {type === 'password' && <Eye isVisible={isVisible} onClick={onClickChangeVisible} />}
          {type === 'search' && <Search className={cls.icon} />}
        </div>
        {!!errorText && <span className={clsx(cls.message)}>{errorText}</span>}
      </div>
    )
  })
)
