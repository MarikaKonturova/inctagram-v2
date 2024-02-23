import clsx from 'clsx'
import React, { type ReactNode, memo, useEffect, useState } from 'react'

import cls from './ActionIcon.module.scss'
interface ActionIconProps {
  className?: string
  filledIcon: ReactNode
  initialState?: boolean
  isLoading?: boolean
  onClick: () => Promise<void> | void
  outlineIcon: ReactNode
}
export const ActionIcon = memo(
  ({
    className,
    filledIcon,
    initialState = false,
    isLoading,
    onClick,
    outlineIcon,
  }: ActionIconProps) => {
    const [fill, setFill] = useState(initialState)

    const onIconClick = async () => {
      await onClick()
      setFill(!fill)
    }

    useEffect(() => {
      if (fill !== initialState) {
        setFill(initialState)
      }
    }, [fill, initialState])

    return (
      <button className={clsx(cls.icon, className)} disabled={isLoading} onClick={onIconClick}>
        {fill ? filledIcon : outlineIcon}
      </button>
    )
  }
)
