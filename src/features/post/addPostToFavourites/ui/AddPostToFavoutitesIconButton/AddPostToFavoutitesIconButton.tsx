import React, { type FC } from 'react'
import IconFavouritesOutline from 'shared/assets/icons/light/bookmark.svg'
import IconFavourites from 'shared/assets/icons/outline/bookmark-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { ActionIcon } from 'shared/ui'
import { useAddToFavouritesPost } from '../../model'

interface IProps {
    postId: number
    postIsFavourite: boolean
}

export const AddPostToFavoutitesIconButton: FC<IProps> = ({ postIsFavourite, postId }) => {
    const { theme } = useTheme()

    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const { addToFavourites } = useAddToFavouritesPost()

    const onFavouritesIconClick = () => {
        addToFavourites(postId)
    }

    return (
        <ActionIcon filledIcon={<IconFavouritesOutline fill={fill}/>}
                    outlineIcon={<IconFavourites fill={fill} />}
                    onClick={onFavouritesIconClick}
                    initialState={postIsFavourite} />
    )
}
