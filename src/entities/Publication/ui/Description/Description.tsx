import React, { useState } from 'react'
import { Avatar } from 'shared/ui'

import cls from './Description.module.scss'

interface IProps {
  avatarURL: string
  description: string
  title: string
}

export const Description: React.FC<IProps> = ({ avatarURL, description, title }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  const truncatedDescription =
    !isExpanded && description?.length > 90 ? `${description?.slice(0, 70)}...` : description

  return (
    <div className={cls.description}>
      <div>
        <Avatar alt={'avatar'} size={36} src={avatarURL} />
      </div>
      <div className={cls.rightBlock}>
        <span className={cls.headerTitle}>{title}</span>
        {description && truncatedDescription}
        {description?.length > 90 && (
          <div onClick={handleToggleExpand}>
            <div className={cls.lessMore}>{isExpanded ? 'Less' : 'More'}</div>
          </div>
        )}
      </div>
    </div>
  )
}
