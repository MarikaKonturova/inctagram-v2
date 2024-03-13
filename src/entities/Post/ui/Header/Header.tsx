import React from 'react'
import userPhoto from 'shared/assets/images/user.png'
import { Avatar } from 'shared/ui'

import cls from './Header.module.scss'

interface IProps {
  avatarURL?: string
  title: string
}

export const Header: React.FC<IProps> = ({ avatarURL, title }) => (
  <div className={cls.header}>
    <Avatar src={avatarURL || userPhoto.src} />
    <h3 className={cls.headerTitle}>{title}</h3>
  </div>
)
