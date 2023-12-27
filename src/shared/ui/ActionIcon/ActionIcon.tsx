import clsx from 'clsx'
import React, { type ReactNode, useState } from 'react'

import cls from './ActionIcon.module.scss'
interface ActionIconProps {
  className?: string
  filledIcon: ReactNode
  initialState?: boolean
  onClick: () => Promise<void> | void
  outlineIcon: ReactNode
}
export const ActionIcon = ({
  className,
  filledIcon,
  initialState = false,
  onClick,
  outlineIcon,
}: ActionIconProps) => {
  const [fill, setFill] = useState(initialState)

  const onIconClick = async () => {
    await onClick()
    setFill(!fill)
  }

  return (
    <div className={clsx(cls.icon, className)} onClick={onIconClick}>
      {fill ? filledIcon : outlineIcon}
    </div>
  )
}
