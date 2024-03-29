import React, { type FC } from 'react'
import IconLike from 'shared/assets/icons/light/heart16px.svg'
import IconLikeOutline from 'shared/assets/icons/outline/heart-outline16px.svg'
import { LikeStatus } from 'shared/types/likeStatus'
import { ActionIcon } from 'shared/ui'

import { useLikeComment } from '../../model/useLikeComment'
import cls from './LikeCommentIcon.module.scss'

interface likeCommentType {
  commentId: number
  isLiked: boolean
  postId: number
}

export const LikeCommentIconButton: FC<likeCommentType> = ({ commentId, isLiked, postId }) => {
  const { isLoading, likeComment } = useLikeComment(postId, commentId)
  const onLikeIconClick = () => {
    likeComment({ likeStatus: isLiked ? LikeStatus.DISLIKE : LikeStatus.LIKE })
  }

  return (
    <ActionIcon
      className={cls.icon}
      filledIcon={<IconLike className={cls.likeIcon} fill={'#CC1439'} />}
      initialState={isLiked}
      isLoading={isLoading}
      onClick={onLikeIconClick}
      outlineIcon={<IconLikeOutline className={cls.likeIcon} fill={'#ffffff'} />}
    />
  )
}
