import React from 'react'
import { CreationDate } from 'entities/Post/ui/CreationDate'
import { Header } from 'entities/Post/ui/Header'
import { LikesInfo } from 'entities/Post/ui/LikesInfo'
import catImg from 'shared/assets/images/MicrosoftTeams-image.png'
import { Card } from 'shared/ui/Card/Card'
import cls from './styled.module.scss'

interface IProps {
    actionSlot: React.ReactNode
}

export const Post: React.FC<IProps> = ({ actionSlot }) => (
    <div className={cls.container}>
        <Card cardWrapperClassName={cls.cardWrapperClassName} src={catImg} alt="card" />

        <div className={cls.rightBlock}>
            <Header avatarURL={catImg.src} title="URL Profile" />
            <div>{actionSlot}</div>
            <LikesInfo />
            <CreationDate />
        </div>
    </div>
)
