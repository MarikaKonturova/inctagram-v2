import clsx from 'clsx'
import {
  AddPostToFavoutitesIconButton,
  LikePostIconButton,
  SharePostIconButton,
} from 'features/post'
import { type PostResponse } from 'shared/types/post'

import cls from './PostModalActions.module.scss'

interface PostModalActionsProps {
  post: PostResponse
}

export const PostModalActions = ({ post, ...restProps }: PostModalActionsProps) => {
  return (
    <div className={clsx(cls.container)}>
      <div className={clsx(cls.left_group)}>
        <LikePostIconButton postId={post.id} postIsLiked={post.isLiked} />
        <SharePostIconButton />
      </div>
      <AddPostToFavoutitesIconButton postId={post.id} postIsFavourite={post.isFavorite} />
    </div>
  )
}
