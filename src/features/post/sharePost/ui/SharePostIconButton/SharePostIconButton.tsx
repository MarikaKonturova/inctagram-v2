import React from 'react'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import IconComment from 'shared/assets/icons/light/message-circle.svg'
import IconCommentOutline from 'shared/assets/icons/outline/message-circle-outline.svg'
import { ActionIcon } from 'shared/ui'
import { useSharePost } from '../../model'

export const SharePostIconButton = () => {
    const { theme } = useTheme()

    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const { share } = useSharePost()

    const onShareIconClick = () => {
    // share()
        return new Promise<void>((resolve) => { resolve() })
    }

    return (
        <ActionIcon filledIcon={<IconComment fill={fill}/>}
                    outlineIcon={<IconCommentOutline fill={fill}/>} onClick={onShareIconClick} />
    )
}
