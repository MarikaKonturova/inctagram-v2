import clsx from 'clsx'
import React from 'react'
import cls from './Tab.module.scss'

interface TabProps {
    className?: string
    isSelected: boolean
    text: string
    onClick: () => void
}

export const Tab = (props: TabProps) => {
    const {
        text, className, isSelected, onClick
    } = props

    const mods = {
        [cls.selectedTab]: isSelected
    }

    return (
        <div onClick={onClick} className={clsx(cls.tab, mods, className)}>
            {text}
        </div>
    )
}
