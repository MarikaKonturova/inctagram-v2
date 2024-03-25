import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import React from 'react'
import IconCopy from 'shared/assets/icons/light/copy.svg'
import IconCopyOutline from 'shared/assets/icons/outline/copy-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useSnackbar } from 'shared/hooks'
import { useTheme } from 'shared/hooks/useTheme'
import { PostResponse } from 'shared/types/post'

import cls from './CopyToClipboard.module.scss'

type PropsType = {
  publ: PostResponse
}

export const CopyToClipboard: React.FC<PropsType> = props => {
  const onOpen = useSnackbar(state => state.onOpen)
  const { t } = useTranslation(['post'])
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff' + ''

  const copyUrl = () => {
    const currentUrl = new URL(window.location.origin)

    const postId = props.publ.id
    const userName = props.publ.userName

    currentUrl.pathname = `/profile/${userName}`

    currentUrl.searchParams.set('postId', postId.toString())

    const newUrl = currentUrl.toString()

    navigator.clipboard
      .writeText(newUrl)
      .then(() => {
        onOpen(t('copyUrlSuccess'), 'success', 'left')
      })
      .catch(() => {
        onOpen(t('copyUrlUnSuccess'), 'danger', 'left')
      })
  }

  return (
    <Menu.Item>
      {({ active }) => (
        <button className={clsx(cls.item)} onClick={copyUrl} type={'button'}>
          {active ? (
            <IconCopyOutline aria-hidden={'true'} fill={fill} />
          ) : (
            <IconCopy aria-hidden={'true'} fill={fill} />
          )}
          {t('copyLink')}
        </button>
      )}
    </Menu.Item>
  )
}
