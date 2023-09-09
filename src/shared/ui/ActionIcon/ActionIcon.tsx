import clsx from 'clsx'
import React, { useState, type ReactNode } from 'react'
import cls from './ActionIcon.module.scss'
interface ActionIconProps {
    outlineIcon: ReactNode
    filledIcon: ReactNode
    onClick: () => Promise<void> | void
    initialState?: boolean
}
export const ActionIcon = ({ onClick, filledIcon, outlineIcon, initialState = false }: ActionIconProps) => {
    const [fill, setFill] = useState(initialState)
    const onIconClick = async () => {
        await onClick()
        setFill(!fill)
    }
    return <div onClick={onIconClick} className={clsx(cls.icon)}>
        {fill ? filledIcon : outlineIcon }
    </div>
}
