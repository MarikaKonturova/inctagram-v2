import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'
import IconCopy from 'shared/assets/icons/light/copy.svg'
import IconCopyOutline from 'shared/assets/icons/outline/copy-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { copyToClipboard } from 'shared/utils/copyToClipboard'

import cls from './CopyToClipboard.module.scss'

export const CopyToClipboard = () => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  return (
    <Menu.Item>
      {({ active }) => (
        <button className={clsx(cls.item)} onClick={copyToClipboard} type={'button'}>
          {active ? (
            <IconCopy aria-hidden={'true'} fill={fill} />
          ) : (
            <IconCopyOutline aria-hidden={'true'} fill={fill} />
          )}
          Copy Link
        </button>
      )}
    </Menu.Item>
  )
}
