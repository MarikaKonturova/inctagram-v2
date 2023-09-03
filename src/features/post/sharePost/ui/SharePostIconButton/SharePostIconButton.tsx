import React from 'react'
import IconShareOutline from 'shared/assets/icons/general/paper-plane.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
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
        <ActionIcon filledIcon={<IconShareOutline fill={fill}/>}
                    outlineIcon={<IconShareOutline fill={fill}/>} onClick={onShareIconClick} />
    )
}
