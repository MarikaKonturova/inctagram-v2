import React, { type FC } from 'react'
import IconLike from 'shared/assets/icons/light/heart16px.svg'
import IconLikeOutline from 'shared/assets/icons/outline/heart-outline16px.svg'
import { LikeStatus } from 'shared/types/likeStatus'
import { ActionIcon } from 'shared/ui'

import { useLikeAnswer } from '../../model/useLikeAnswer'
import styles from './LikeAnswerIcon.module.scss'

interface likeAnswerType {
  answerId: number
  commentId: number
  isLiked: boolean
  postId: number
}

export const LikeAnswerIconButton: FC<likeAnswerType> = ({
  answerId,
  commentId,
  isLiked,
  postId,
}) => {
  const { isLoading, likeAnswer } = useLikeAnswer(postId, commentId, answerId)
  const onLikeIconClick = () => {
    likeAnswer({ likeStatus: isLiked ? LikeStatus.DISLIKE : LikeStatus.LIKE })
  }

  return (
    <ActionIcon
      filledIcon={<IconLike fill={'#CC1439'} />}
      initialState={isLiked}
      isLoading={isLoading}
      onClick={onLikeIconClick}
      outlineIcon={<IconLikeOutline className={styles.outLine} />}
    />
  )
}
