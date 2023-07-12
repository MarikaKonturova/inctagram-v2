import clsx from 'clsx'
import React from 'react'

import {
    LikePostIconButton,
    AddCommentIconButton,
    SharePostIconButton,
    AddPostToFavoutitesIconButton
} from 'features/post'
import cls from './PostActions.module.scss'

interface PostActionsProps {
    postId: string
}

export const PostActions = ({ postId }: PostActionsProps) => (
    <div className={clsx(cls.container)}>
        <div className={clsx(cls.left_group)}>
            <LikePostIconButton />
            <AddCommentIconButton />
            <SharePostIconButton />
        </div>
        <AddPostToFavoutitesIconButton postId={postId} />
    </div>
)
