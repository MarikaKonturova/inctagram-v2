import React, { type FC } from 'react'
import IconLike from 'shared/assets/icons/light/heart.svg'
import IconLikeOutline from 'shared/assets/icons/outline/heart-outline.svg'
import { LikeStatus } from 'shared/types/likeStatus'
import { ActionIcon } from 'shared/ui'
import { useLikeComment } from '../../model/useLikeComment'
import cls from './LikeCommentIcon.module.scss'

interface likeCommentType {
    commentId: number
    postId: number
    isLiked: boolean
}

export const LikeCommentIconButton: FC<likeCommentType> = ({ commentId, postId, isLiked }) => {
    const { likeComment } = useLikeComment(postId, commentId)
    const onLikeIconClick = () => {
        likeComment({ likeStatus: isLiked ? LikeStatus.DISLIKE : LikeStatus.LIKE })
    }

    return (
        <ActionIcon filledIcon={<IconLike fill="#CC1439" className={cls.likeIcon} />}
                    outlineIcon={<IconLikeOutline fill="#ffffff" className={cls.likeIcon} />}
                    onClick={onLikeIconClick}
                    initialState={isLiked}
                    className={cls.icon}
        />
    )
}
