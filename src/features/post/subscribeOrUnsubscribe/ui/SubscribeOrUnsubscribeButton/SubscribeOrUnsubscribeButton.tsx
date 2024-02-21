import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import React, { type FC, useCallback } from 'react'
import IconUnsubscribe from 'shared/assets/icons/light/person-remove.svg'
import IconUnsubscribeOutline from 'shared/assets/icons/outline/person-remove-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'

import { useSubscribeOrUnsubscribe } from '../../model'
import cls from './SubscribeOrUnsubscribeButton.module.scss'

interface IProps {
  userId: string
}

export const SubscribeOrUnsubscribeButton: FC<IProps> = ({ userId }) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const { t } = useTranslation('profile')
  const { subscribeOrUnsubscribe } = useSubscribeOrUnsubscribe(userId)

  const onUnsubscribePersonClick = useCallback(async () => {
    subscribeOrUnsubscribe()
  }, [])

  return (
    <Menu.Item>
      {({ active }) => (
        <button className={clsx(cls.item)} onClick={onUnsubscribePersonClick} type={'button'}>
          {active ? (
            <IconUnsubscribe aria-hidden={'true'} fill={fill} />
          ) : (
            <IconUnsubscribeOutline aria-hidden={'true'} fill={fill} />
          )}
          {t('unsubscribe')}
        </button>
      )}
    </Menu.Item>
  )
}
