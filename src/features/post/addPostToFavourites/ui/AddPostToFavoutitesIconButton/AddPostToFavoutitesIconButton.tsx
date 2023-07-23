import React, { type FC } from 'react'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import IconFavouritesOutline from 'shared/assets/icons/light/bookmark.svg'
import IconFavourites from 'shared/assets/icons/outline/bookmark-outline.svg'
import { ActionIcon } from 'shared/ui'
import { useAddToFavouritesPost } from '../../model'

interface IProps {
    postId: number
}

export const AddPostToFavoutitesIconButton: FC<IProps> = ({ postId }) => {
    const { theme } = useTheme()

    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const { addToFavourites } = useAddToFavouritesPost(postId)

    const onFavouritesIconClick = () => {
        addToFavourites()
    }

    return (
        <ActionIcon filledIcon={<IconFavouritesOutline fill={fill}/>}
                    outlineIcon={<IconFavourites fill={fill} />}
                    onClick={onFavouritesIconClick} />
    )
}
