import clsx from 'clsx'
import React, { type ButtonHTMLAttributes, memo, type ReactNode } from 'react'
import cls from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: 'outline' | 'secondary' | 'primary' | 'textButton' | 'clear'
    disabled?: boolean
    children?: ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    block?: boolean
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = 'primary',
        disabled,
        onClick,
        block,
        ...otherProps
    } = props

    const mods = {
        [cls.disabled]: disabled,
        [cls.block]: block
    }

    return (
        <button
                type='button'
                className={clsx(cls.Button, mods, [className, cls[theme]])}
                disabled={disabled}
                onClick={onClick}
                {...otherProps}
        >
            {children}
        </button>
    )
}
)
