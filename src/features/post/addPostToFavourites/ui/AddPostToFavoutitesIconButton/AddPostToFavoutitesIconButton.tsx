import React, { type FC, useCallback } from 'react'
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

export const AddPostToFavoutitesIconButton: FC<IProps> = ({ postId, postIsFavourite }) => {
  const { theme } = useTheme()

  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const { addToFavourites, isLoading } = useAddToFavouritesPost()

  const onFavouritesIconClick = useCallback(() => {
    addToFavourites(postId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  return (
    <ActionIcon
      filledIcon={<IconFavouritesOutline fill={fill} />}
      initialState={postIsFavourite}
      isLoading={isLoading}
      onClick={onFavouritesIconClick}
      outlineIcon={<IconFavourites fill={fill} />}
    />
  )
}
