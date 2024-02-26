import { type Story, type StoryContext } from '@storybook/react'
import { type ReactElement, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from '../../../../../i18next'

export const I18nDecorator = () =>
  function StoryComponent(StoryComponent: Story, context: StoryContext): ReactElement {
    const { locale } = context.globals

    useEffect(() => {
      const changeLanguage = async () => {
        await i18n.changeLanguage(locale?.toString())
      }

      changeLanguage().catch(console.error)
    }, [locale])

    return (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    )
  }
