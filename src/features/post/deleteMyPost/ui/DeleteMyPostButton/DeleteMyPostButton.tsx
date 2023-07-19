import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import React, { type FC } from 'react'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import IconTrash from 'shared/assets/icons/light/trash.svg'
import IconTrashOutline from 'shared/assets/icons/outline/trash-outline.svg'

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
                <button type='button'
                        className={clsx(cls.item)}
                        onClick={openDeletePostModal}
                >
                    {active
                        ? <IconTrash aria-hidden="true" fill={fill}/>
                        : <IconTrashOutline aria-hidden="true" fill={fill}/>
                    }
                    Delete Post</button>)}
        </Menu.Item>
    )
}
