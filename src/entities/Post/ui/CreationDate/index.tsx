import React, { type FC } from 'react'

import cls from './styles.module.scss'

interface Props {
  date: string
}

export const CreationDate: FC<Props> = ({ date }) => <div className={cls.container}>{date}</div>
