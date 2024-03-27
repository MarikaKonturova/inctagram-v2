import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import React, { type FC, useCallback } from 'react'
import IconSubscribe from 'shared/assets/icons/outline/person-add-outline.svg'
import IconUnsubscribe from 'shared/assets/icons/outline/person-remove-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'

import { useSubscribeOrUnsubscribe } from '../../model'
import cls from './FollowAndUnfollowMenuItemButton.module.scss'

interface IProps {
  isFollowing: boolean
  userId: number
  userName: string
}

export const FollowAndUnfollowMenuItemButton: FC<IProps> = ({ isFollowing, userId, userName }) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const { t } = useTranslation('profile')

  const { subscribeOrUnsubscribe } = useSubscribeOrUnsubscribe({
    isFollowing,
    userId,
    userName,
  })

  const onUnsubscribePersonClick = useCallback(async () => {
    subscribeOrUnsubscribe()
  }, [])

  return (
    <Menu.Item>
      <button className={clsx(cls.item)} onClick={onUnsubscribePersonClick} type={'button'}>
        {isFollowing ? (
          <IconUnsubscribe aria-hidden={'true'} fill={fill} />
        ) : (
          <IconSubscribe aria-hidden={'true'} fill={fill} />
        )}
        {t(isFollowing ? 'unfollow' : 'follow')}
      </button>
    </Menu.Item>
  )
}
