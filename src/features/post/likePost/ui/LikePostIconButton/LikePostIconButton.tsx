import React from 'react'
import IconLike from 'shared/assets/icons/light/heart.svg'
import IconLikeOutline from 'shared/assets/icons/outline/heart-outline.svg'
import { LikeStatus } from 'shared/types/likeStatus'
import { ActionIcon } from 'shared/ui'

import { useLikePost } from '../../model'

interface LikePostIconButtonProps {
  postId: number
  postIsLiked: boolean
}

export const LikePostIconButton = ({ postId, postIsLiked }: LikePostIconButtonProps) => {
  const { like } = useLikePost(postId)
  const onLikeIconClick = async () => {
    like({ likeStatus: postIsLiked ? LikeStatus.DISLIKE : LikeStatus.LIKE })
  }

  return (
    <ActionIcon
      filledIcon={<IconLike fill={'#CC1439'} />}
      initialState={postIsLiked}
      onClick={onLikeIconClick}
      outlineIcon={<IconLikeOutline fill={'#ffffff'} />}
    />
  )
}
