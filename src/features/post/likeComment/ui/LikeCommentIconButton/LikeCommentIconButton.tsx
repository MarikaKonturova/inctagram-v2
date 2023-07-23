import React from 'react'
import IconLike from 'shared/assets/icons/light/heart.svg'
import IconLikeOutline from 'shared/assets/icons/outline/heart-outline.svg'
import { ActionIcon } from 'shared/ui'

export const LikeCommentIconButton = () => {
    const onLikeIconClick = () => {
        console.log('onLikeIconClick')
    }

    return (
        <ActionIcon filledIcon={<IconLike fill="#CC1439" />}
                    outlineIcon={<IconLikeOutline fill="#ffffff" />}
                    onClick={onLikeIconClick} />
    )
}
