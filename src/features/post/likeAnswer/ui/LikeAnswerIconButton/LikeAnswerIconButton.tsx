import React, { type FC } from 'react'
import IconLike from 'shared/assets/icons/light/heart.svg'
import IconLikeOutline from 'shared/assets/icons/outline/heart-outline.svg'
import { LikeStatus } from 'shared/types/likeStatus'
import { ActionIcon } from 'shared/ui'

import { useLikeAnswer } from '../../model/useLikeAnswer'

interface likeAnswerType {
    commentId: number
    postId: number
    answerId: number
    isLiked: boolean
}

export const LikeAnswerIconButton: FC<likeAnswerType> = ({ commentId, postId, answerId, isLiked }) => {
    const { likeAnswer } = useLikeAnswer(postId, commentId, answerId)
    const onLikeIconClick = () => {
        likeAnswer({ likeStatus: isLiked ? LikeStatus.DISLIKE : LikeStatus.LIKE })
    }

    return (
        <ActionIcon filledIcon={<IconLike fill="#CC1439" />}
                    outlineIcon={<IconLikeOutline fill="#ffffff" />}
                    onClick={onLikeIconClick}
                    initialState={isLiked}
        />
    )
}
