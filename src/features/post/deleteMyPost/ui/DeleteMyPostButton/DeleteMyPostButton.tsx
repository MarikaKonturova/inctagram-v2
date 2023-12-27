import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import React, { type FC } from 'react'
import IconTrash from 'shared/assets/icons/light/trash.svg'
import IconTrashOutline from 'shared/assets/icons/outline/trash-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'

import cls from './DeleteMyPostButton.module.scss'

interface IProps {
  openDeletePostModal: () => void
}

export const DeleteMyPostButton: FC<IProps> = ({ openDeletePostModal }) => {
  const { theme } = useTheme()
  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

  return (
    <Menu.Item>
      {({ active }) => (
        <button className={clsx(cls.item)} onClick={openDeletePostModal} type={'button'}>
          {active ? (
            <IconTrash aria-hidden={'true'} fill={fill} />
          ) : (
            <IconTrashOutline aria-hidden={'true'} fill={fill} />
          )}
          Delete Post
        </button>
      )}
    </Menu.Item>
  )
}
