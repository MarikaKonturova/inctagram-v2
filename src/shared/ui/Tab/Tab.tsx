import clsx from 'clsx'
import React from 'react'
import cls from './Tab.module.scss'

interface TabProps {
    className?: string
    isSelected: boolean
    text: string
}

export const Tab = (props: TabProps) => {
    const {
        text, className, isSelected
    } = props

    return (
        <div className={clsx(className, cls.tab, isSelected && cls.selectedTab)}>
            {text}
        </div>
    )
}
