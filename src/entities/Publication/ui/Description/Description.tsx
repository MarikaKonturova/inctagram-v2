import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import cls from './Description.module.scss'

interface IProps {
  description: string
  title: string
}

export const Description: React.FC<IProps> = ({ description, title }) => {
  const { t } = useTranslation('post')
  const [isExpanded, setIsExpanded] = useState(false)
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const truncatedDescription =
    !isExpanded && description?.length > 90 ? `${description?.slice(0, 70)}...` : description

  return (
    <div className={cls.description}>
      <div className={cls.rightBlock}>
        <span className={cls.headerTitle}>{title}</span>
        {description && truncatedDescription}
        {description?.length > 90 && (
          <div onClick={handleToggleExpand}>
            <div className={cls.lessMore}>{isExpanded ? t('less') : t('more')}</div>
          </div>
        )}
      </div>
    </div>
  )
}
