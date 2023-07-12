import React from 'react'
import { Avatar } from 'shared/ui'

import cls from './styled.module.scss'

interface IProps {
    avatarURL: string
    title: string
}

export const Header: React.FC<IProps> = ({ avatarURL, title }) => (
    <div className={cls.header}>
        <Avatar src={avatarURL} size={36} alt="avatar" />
        <span className={cls.headerTitle}>{title}</span>
    </div>
)
