/* eslint-disable max-len */
import { useTranslation } from 'react-i18next'
import userPhoto from 'shared/assets/images/user.png'
import { type ProfileDataModel } from 'shared/types/auth'
import { AvatarSizes } from 'shared/types/post'
import { Avatar } from 'shared/ui'

import cls from './styles.module.scss'

interface LikesInfoProps {
  likeCount: number
  newLikes: Array<Pick<ProfileDataModel, 'avatars' | 'id'> & { username: string }>
}

export const LikesInfo = ({ likeCount, newLikes }: LikesInfoProps) => {
  const likesCountEnhance = `${likeCount?.toString()[0]} ${likeCount?.toString().slice(1)}`
  const { t } = useTranslation(['profile'])

  return (
    <div className={cls.container}>
      {newLikes.length > 0 && (
        <div className={cls.avatars}>
          {newLikes.map(el => (
            <Avatar
              className={cls.avatar}
              key={el?.avatars?.thumbnail?.url}
              size={AvatarSizes.small}
              src={el?.avatars?.thumbnail?.url || userPhoto.src}
            />
          ))}
        </div>
      )}
      <div className={cls.likes}>
        {likesCountEnhance} &quot;{t('like')}&quot;
      </div>
    </div>
  )
}
