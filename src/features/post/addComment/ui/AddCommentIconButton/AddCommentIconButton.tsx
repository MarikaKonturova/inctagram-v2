import React from 'react'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import IconShareOutline from 'shared/assets/icons/general/paper-plane.svg'
import { ActionIcon } from 'shared/ui'
import { useCommentPost } from '../../model'

export const AddCommentIconButton = () => {
    const { theme } = useTheme()

    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const { addComment } = useCommentPost()

    const onCommentIconClick = () => {
        // addComment()
        return new Promise<void>((resolve) => { resolve() })
    }

    return (
        <ActionIcon filledIcon={<IconShareOutline fill={fill}/>}
                    outlineIcon={<IconShareOutline fill={fill}/>} onClick={onCommentIconClick} />
    )
}
