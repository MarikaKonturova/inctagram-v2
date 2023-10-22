/* eslint-disable max-len */
import { type ProfileDataModel } from 'shared/types/auth'
import { Avatar } from 'shared/ui'
import cls from './styles.module.scss'

interface LikesInfoProps {
    newLikes: Array<Pick <ProfileDataModel, 'id' | 'avatars'> & { username: string }>
    likeCount: number
}

export const LikesInfo = ({ newLikes, likeCount }: LikesInfoProps) => {
    const likesCountEnhance = `${likeCount?.toString()[0]} ${likeCount?.toString().slice(1)}`
    return (
        <div className={cls.container}>
            {newLikes.length > 0 && <div className={cls.avatars}>
                { newLikes.map(el => (
                    <Avatar key={el?.avatars?.thumbnail?.url } className={cls.avatar}
                            src={el?.avatars?.thumbnail?.url}
                            size={24}
                            alt="avatar" />
                ))}
            </div>}
            <div className={cls.likes}>{likesCountEnhance} &quot;Like&quot;</div>
        </div>
    )
}
