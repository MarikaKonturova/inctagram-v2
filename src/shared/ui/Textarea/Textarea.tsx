import clsx from 'clsx'
import React, { forwardRef, memo } from 'react'
import { type ChangeHandler } from 'react-hook-form'

import cls from './Textarea.module.scss'

interface TextareaProps {
  className?: string
  errorText?: string
  id?: string
  label?: string
  labelClassName?: string
  name?: string
  onChange: ChangeHandler
  placeholder?: string
  textareaClassName?: string
}

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    const {
      className,
      errorText,
      id,
      label,
      labelClassName,
      name,
      onChange,
      placeholder,
      textareaClassName,
      ...otherProps
    } = props

    return (
      <div className={className}>
        <label className={labelClassName} htmlFor={id}>
          {label}
        </label>
        <textarea
          className={clsx(cls.textarea, [textareaClassName], errorText && cls.error)}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          {...otherProps}
        />
        {!!errorText && <span className={clsx(cls.errorText)}>{errorText}</span>}
      </div>
    )
  })
)
