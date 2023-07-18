import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import React, { type FC, useCallback } from 'react'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import IconTrash from 'shared/assets/icons/light/trash.svg'
import IconTrashOutline from 'shared/assets/icons/outline/trash-outline.svg'

import { useDeleteMyPost } from '../../model'

import cls from './DeleteMyPostButton.module.scss'

interface IProps {
    postId: string
    openDeletePostModal: () => void
}

export const DeleteMyPostButton: FC<IProps> = ({ postId, openDeletePostModal }) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    // const { deletePost } = useDeleteMyPost(postId)

    const onDeletePostClick = useCallback(async () => {
        // TODO: здесь будет запрос на удаление => редирект на profile
        // deletePost()
        // routerPush(AppRoutes.PROFILE)
    }, [])

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
