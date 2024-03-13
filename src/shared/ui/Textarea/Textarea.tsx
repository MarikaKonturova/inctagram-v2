import clsx from 'clsx'
import React, { forwardRef, memo } from 'react'
import { type ChangeHandler } from 'react-hook-form'

import cls from './Textarea.module.scss'

interface TextareaProps {
  charactersCount?: number
  className?: string
  counterClassName?: string
  errorText?: string
  id?: string
  label?: string
  labelClassName?: string
  maxCharactersCount?: number
  name?: string
  onChange: ChangeHandler
  placeholder?: string
  textareaClassName?: string
}

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    const {
      charactersCount,
      className,
      counterClassName,
      errorText,
      id,
      label,
      labelClassName,
      maxCharactersCount = 500,
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
          className={clsx(cls.textarea, [errorText ? cls.error : textareaClassName])}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          {...otherProps}
        />
        {!!charactersCount && (
          <div
            className={clsx(cls.charactersCount, [counterClassName])}
          >{`${charactersCount}/${maxCharactersCount}`}</div>
        )}
        {!!errorText && <span className={clsx(cls.errorText)}>{errorText}</span>}
      </div>
    )
  })
)
