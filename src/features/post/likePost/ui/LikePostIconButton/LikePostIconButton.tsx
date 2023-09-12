import React from 'react'
import IconLike from 'shared/assets/icons/light/heart.svg'
import IconLikeOutline from 'shared/assets/icons/outline/heart-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { ActionIcon } from 'shared/ui'
import { LikeStatus } from '../../constants/likeStatus'
import { useLikePost } from '../../model'

interface LikePostIconButtonProps {
    postId: number
    postIsLiked: boolean
}

export const LikePostIconButton = ({ postId, postIsLiked }: LikePostIconButtonProps) => {
    const { theme } = useTheme()
    const { like } = useLikePost(postId)

    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

    const onLikeIconClick = async () => {
        like({ likeStatus: postIsLiked ? LikeStatus.DISLIKE : LikeStatus.LIKE })
    }
    return (
        <ActionIcon filledIcon={<IconLike fill={fill}/>}
                    outlineIcon={<IconLikeOutline fill={fill}/>} onClick={onLikeIconClick}
                    initialState={postIsLiked}
        />
    )
}
