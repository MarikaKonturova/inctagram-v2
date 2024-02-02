import { type Story } from '@storybook/react'
// import 'app/styles/index.scss'
import { type ReactElement } from 'react'
import { type Theme } from 'shared/constants/theme'
import ThemeProvider from 'shared/context/ThemeProvider'

export const ThemeDecorator = (theme: Theme) =>
  function StoryComponent(StoryComponent: Story): ReactElement {
    return (
      <ThemeProvider initialTheme={theme}>
        <StoryComponent />
      </ThemeProvider>
    )
  }
