import clsx from 'clsx'
import { AddPostToFavoutitesIconButton, LikePostIconButton, SharePostIconButton } from 'features/post'

import cls from './PostModalActions.module.scss'

interface PostModalActionsProps {
    postId: string
}

export const PostModalActions = ({ postId, ...restProps }: PostModalActionsProps) => (
    <div className={clsx(cls.container)}>
        <div className={clsx(cls.left_group)}>
            <LikePostIconButton />
            <SharePostIconButton />
        </div>
        <AddPostToFavoutitesIconButton postId={postId} />
    </div>
)
