import React from 'react'
import { Avatar } from 'shared/ui'

import cls from './styled.module.scss'

interface IProps {
  avatarURL: string
  title: string
}

export const Header: React.FC<IProps> = ({ avatarURL, title }) => (
  <div className={cls.header}>
    <Avatar alt={'avatar'} size={36} src={avatarURL} viewBox={'-11 -11 70 70'} />
    <span className={cls.headerTitle}>{title}</span>
  </div>
)
