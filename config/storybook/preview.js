import { addDecorator } from '@storybook/react'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '../../src/app/providers/ThemeProvider'
import React, { useEffect } from 'react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { QueryDecorator } from '../../src/shared/config/storybook/QueryDecorator/QueryDecorator'
import { I18nDecorator } from '../../src/shared/config/storybook/I18nDecorator/I18nDecorator'
import i18n from '../../src/shared/config/storybook/I18nDecorator/i18next'
import * as NextImage from 'next/image'

const OriginalNextImage = NextImage.default

// eslint-disable-next-line no-import-assign
Object.defineProperty(NextImage, 'default', {
    configurable: true,
    value: (props) => <OriginalNextImage {...props} unoptimized />
})

export const globalTypes = {
    locale: {
        title: 'en',
        description: 'Internationalization locale',
        toolbar: {
            icon: 'globe',
            items: [
                { value: 'en', right: '🇬🇧', title: 'English' },
                { value: 'ru', right: '🇷🇺', title: 'Russian' }
            ]
        }
    }
}

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    },
    layout: 'fullscreen',
    nextRouter: {
        Provider: RouterContext.Provider
    },
    i18n,
    locale: 'en',
    locales: {
        en: 'en',
        ru: 'ru'
    }

}

addDecorator(StyleDecorator)
addDecorator(ThemeDecorator(Theme.LIGHT))
addDecorator(QueryDecorator())
addDecorator(I18nDecorator())
