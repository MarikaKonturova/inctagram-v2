import clsx from 'clsx'
import React, { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'
import IconLogOut from 'shared/assets/icons/general/log-out.svg'
import { Button } from 'shared/ui/Button/Button'
import cls from './LogoutButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement>

type PropsType = DefaultButtonPropsType

export const LogoutButton: React.FC<PropsType> = ({ className, disabled, onClick }) => (
    <Button theme={'clear'}
            disabled={disabled}
            className={clsx(cls.button, className)}
            onClick={onClick}>
        <IconLogOut className={cls.icon} />
        Log Out
    </Button>
)
