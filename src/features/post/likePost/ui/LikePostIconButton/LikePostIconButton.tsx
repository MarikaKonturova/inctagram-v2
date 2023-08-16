import React from 'react'
import IconLike from 'shared/assets/icons/light/heart.svg'
import IconLikeOutline from 'shared/assets/icons/outline/heart-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { ActionIcon } from 'shared/ui'
import { useLikePost } from '../../model'

export const LikePostIconButton = () => {
    const { theme } = useTheme()
    const { like } = useLikePost()

    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

    const onLikeIconClick = async () => {
    // like()
        return new Promise<void>((resolve) => {
            resolve()
        })
    }
    return (
        <ActionIcon
      filledIcon={<IconLike fill={fill} />}
      outlineIcon={<IconLikeOutline fill={fill} />}
      onClick={onLikeIconClick}
        />
    )
}
