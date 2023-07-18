import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import React, { type FC, useCallback } from 'react'

import { Theme, useTheme } from 'app/providers/ThemeProvider'
import IconEdit from 'shared/assets/icons/light/edit-2.svg'
import IconEditOutline from 'shared/assets/icons/outline/edit-2-outline.svg'
import { type Post } from 'shared/types/post'
import { useUpdateMyPost } from '../../model'

import cls from './UpdateMyPostButton.module.scss'

interface IProps {
    post: Post
    openEditPostModal: () => void
}

export const UpdateMyPostButton: FC<IProps> = ({ post, openEditPostModal }) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    // const { update } = useUpdateMyPost(post)

    const onEditPostClick = useCallback(() => {
        // update(post)
        openEditPostModal()
    }, [])

    return (
        <Menu.Item>
            {({ active }) => (
                <button type='button'
                        className={clsx(cls.item)}
                        onClick={onEditPostClick}
                >
                    {active
                        ? <IconEdit aria-hidden="true" fill={fill}/>
                        : <IconEditOutline aria-hidden="true" fill={fill}/>
                    }
                    Edit Post </button>
            )}
        </Menu.Item>
    )
}
