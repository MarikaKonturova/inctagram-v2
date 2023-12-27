import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import React, { type FC } from 'react'
import IconEdit from 'shared/assets/icons/light/edit-2.svg'
import IconEditOutline from 'shared/assets/icons/outline/edit-2-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'

import cls from './UpdateMyPostButton.module.scss'

interface IProps {
  openEditPostModal: () => void
}

export const UpdateMyPostButton: FC<IProps> = ({ openEditPostModal }) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  return (
    <Menu.Item>
      {({ active }) => (
        <button className={clsx(cls.item)} onClick={openEditPostModal} type={'button'}>
          {active ? (
            <IconEdit aria-hidden={'true'} fill={fill} />
          ) : (
            <IconEditOutline aria-hidden={'true'} fill={fill} />
          )}
          Edit Post{' '}
        </button>
      )}
    </Menu.Item>
  )
}
