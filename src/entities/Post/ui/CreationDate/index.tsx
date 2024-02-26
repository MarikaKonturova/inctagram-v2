import clsx from 'clsx'
import React, { type FC } from 'react'
import { formattedDate } from 'shared/utils'
import { formatCommentTime } from 'shared/utils/formatCommentTime'

import cls from './styles.module.scss'

interface Props {
  className?: string
  date: string
  type?: 'agoTime'
}

export const CreationDate: FC<Props> = ({ className, date, type }) => {
  const classNames = clsx(cls.container, className)

  return (
    <div className={classNames}>
      {type === 'agoTime' ? formatCommentTime(date) : formattedDate(date)}
    </div>
  )
}
