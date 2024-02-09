import clsx from 'clsx'
import React, { type FC } from 'react'
import { formattedDate } from 'shared/utils'

import cls from './styles.module.scss'

interface Props {
  className?: string
  date: string
}

export const CreationDate: FC<Props> = ({ className, date }) => {
  const classNames = clsx(cls.container, className)

  return <div className={classNames}>{formattedDate(date)}</div>
}
