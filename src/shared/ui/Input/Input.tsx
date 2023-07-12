import clsx from 'clsx'
import { forwardRef, type InputHTMLAttributes, memo, type ReactNode, useState } from 'react'
import Search from 'shared/assets/icons/general/search.svg'
import { Eye } from 'shared/ui/Eye/Eye'
import cls from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: 'email' | 'password' | 'text' | 'search'/* text or password */
    variant?: 'outline' | 'standard'
    placeholder?: string
    error?: boolean
    errorText?: string
    className?: string
    label?: string
    labelClassName?: string
    disabled?: boolean
    children?: ReactNode
}

export const Input = memo(forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        className,
        variant = 'standard',
        children,
        disabled,
        error,
        errorText,
        placeholder,
        label,
        labelClassName,
        id,
        type = 'text',
        ...otherProps
    } = props

    const mods = {
        [cls.disabled]: disabled,
        [cls.outline]: type === 'search',
        [cls.error]: error
    }

    const mod = {
        [cls.error]: error
    }

    const [isVisible, setIsVisible] = useState(false)

    const onClickChangeVisible = (): void => {
        setIsVisible(!isVisible)
    }

    const isPassword = type === 'password' && !isVisible ? 'password' : 'text'

    return (
        <div className={clsx(cls.field, className)}>
            {label && <label htmlFor={id} className={labelClassName}>{label}</label>}
            <div className={clsx(cls.wrapper, mod, cls[variant])}>
                <input
                    ref={ref}
                    type={type !== 'password' ? type : isPassword}
                    className={clsx(cls.input, mods, [cls[type]])}
                    disabled={disabled}
                    placeholder={placeholder}
                    autoComplete={type === 'password' ? 'new-password' : ''}
                    {...otherProps}
                />
                {type === 'password' && <Eye isVisible={isVisible} onClick={onClickChangeVisible}/>}
                {type === 'search' && <Search className={cls.icon}/>}
            </div>
            {!!errorText && <span className={clsx(cls.message)}>{errorText}</span>}
        </div>
    )
}))
