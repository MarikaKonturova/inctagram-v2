import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import React, { type FC, useCallback } from 'react'

import { Theme, useTheme } from 'app/providers/ThemeProvider'
import IconUnsubscribe from 'shared/assets/icons/light/person-remove.svg'
import IconUnsubscribeOutline from 'shared/assets/icons/outline/person-remove-outline.svg'
import { useSubscribeOrUnsubscribe } from '../../model'
import cls from './SubscribeOrUnsubscribeButton.module.scss'

interface IProps {
    userId: string
}

export const SubscribeOrUnsubscribeButton: FC<IProps> = ({ userId }) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'

    const { subscribeOrUnsubscribe } = useSubscribeOrUnsubscribe(userId)

    const onUnsubscribePersonClick = useCallback(async () => {
        subscribeOrUnsubscribe()
    }, [])

    return (
        <Menu.Item>
            {({ active }) => (
                <button type='button'
                        className={clsx(cls.item)}
                        onClick={onUnsubscribePersonClick}
                >
                    {active
                        ? <IconUnsubscribe aria-hidden="true" fill={fill}/>
                        : <IconUnsubscribeOutline aria-hidden="true" fill={fill}/>
                    }
                    Unsubscribe</button>)}

        </Menu.Item>
    )
}
