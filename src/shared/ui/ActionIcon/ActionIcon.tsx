import clsx from 'clsx'
import React, { useState, type ReactNode } from 'react'
import cls from './ActionIcon.module.scss'
interface ActionIconProps {
    outlineIcon: ReactNode
    filledIcon: ReactNode
    onClick: () => Promise<void> | void
    initialState?: boolean
    className?: string
}
export const ActionIcon = ({ onClick, filledIcon, outlineIcon, initialState = false, className }: ActionIconProps) => {
    const [fill, setFill] = useState(initialState)

    const onIconClick = async () => {
        await onClick()
        setFill(!fill)
    }

    return <div onClick={onIconClick} className={clsx(cls.icon, className)}>
        {fill ? filledIcon : outlineIcon }
    </div>
}
