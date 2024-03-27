import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import userPhoto from 'shared/assets/images/user.png'
import { AvatarPostModel, AvatarSizes } from 'shared/types/post'
import { Avatar } from 'shared/ui'

import cls from './Description.module.scss'

interface IProps {
  avatar: AvatarPostModel | null
  description: string
  title: string
}

export const Description: React.FC<IProps> = ({ avatar, description, title }) => {
  const { t } = useTranslation('post')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const truncatedDescription =
    !isExpanded && description?.length > 90 ? `${description?.slice(0, 70)}...` : description

  return (
    <div className={cls.description}>
      <Avatar size={AvatarSizes.medium} src={avatar?.thumbnail?.url || userPhoto.src} />
      <div className={cls.rightBlock}>
        <span className={cls.headerTitle}>{title}</span>
        <span className={cls.title}>{description && truncatedDescription} </span>
        {description?.length > 90 && (
          <div onClick={handleToggleExpand}>
            <div className={cls.lessMore}>{isExpanded ? t('less') : t('more')}</div>
          </div>
        )}
      </div>
    </div>
  )
}
