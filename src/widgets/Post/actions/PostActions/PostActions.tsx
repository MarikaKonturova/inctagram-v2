import clsx from 'clsx'

import {
    AddCommentIconButton,
    AddPostToFavoutitesIconButton,
    LikePostIconButton,
    SharePostIconButton
} from 'features/post'
import { type PostResponse } from 'shared/types/post'
import cls from './PostActions.module.scss'

interface PostActionsProps {
    post: PostResponse
}

export const PostActions = ({ post }: PostActionsProps) => (
    <div className={clsx(cls.container)}>
        <div className={clsx(cls.left_group)}>
            <LikePostIconButton postId={post.id} postIsLiked={post.isLiked} />
            <AddCommentIconButton />
            <SharePostIconButton />
        </div>
        <AddPostToFavoutitesIconButton postId={post.id} postIsFavourite={post.isFavorite} />
    </div>
)
