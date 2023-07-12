import clsx from 'clsx'
import React, { memo, forwardRef } from 'react'
import { type ChangeHandler } from 'react-hook-form'
import cls from './Textarea.module.scss'

interface TextareaProps {
    className?: string
    name?: string
    id?: string
    label?: string
    labelClassName?: string
    textareaClassName?: string
    errorText?: string
    placeholder?: string
    onChange: ChangeHandler
}

export const Textarea = memo(forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    const {
        className,
        name,
        id,
        placeholder,
        label,
        labelClassName,
        textareaClassName,
        errorText,
        onChange,
        ...otherProps
    } = props

    return (
        <div className={className}>
            <label htmlFor={id} className={labelClassName}>{label}</label>
            <textarea
                className={clsx(cls.textarea, [textareaClassName])}
                name={name}
                id={id}
                ref={ref}
                placeholder={placeholder}
                onChange={onChange}
                {...otherProps}
            />
            {!!errorText && <span className={clsx(cls.errorText)}>{errorText}</span>}
        </div>
    )
}))
