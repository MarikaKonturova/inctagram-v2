import React from 'react'
import IconComment from 'shared/assets/icons/light/message-circle.svg'
import IconCommentOutline from 'shared/assets/icons/outline/message-circle-outline.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { ActionIcon } from 'shared/ui'

import { useCommentPost } from '../../model'

export const AddCommentIconButton = () => {
  const { theme } = useTheme()

  const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
  const { addComment } = useCommentPost()

  const onCommentIconClick = () => {
    // addComment()
    return new Promise<void>(resolve => {
      resolve()
    })
  }

  return (
    <ActionIcon
      filledIcon={<IconComment fill={fill} />}
      onClick={onCommentIconClick}
      outlineIcon={<IconCommentOutline fill={fill} />}
    />
  )
}
