import clsx from 'clsx'
import React from 'react'

import cls from './Tab.module.scss'

interface TabProps {
  className?: string
  isSelected: boolean
  onClick: () => void
  text: string
}

export const Tab = (props: TabProps) => {
  const { className, isSelected, onClick, text } = props

  const mods = {
    [cls.selectedTab]: isSelected,
  }

  return (
    <div className={clsx(cls.tab, mods, className)} onClick={onClick}>
      {text}
    </div>
  )
}
