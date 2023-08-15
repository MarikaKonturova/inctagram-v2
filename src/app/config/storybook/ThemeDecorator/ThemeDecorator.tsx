import 'app/styles/index.scss'
import { type Story } from '@storybook/react'
import { type ReactElement } from 'react'
import { type Theme, ThemeProvider } from 'app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme) => function StoryComponent (StoryComponent: Story): ReactElement {
    return (
        <ThemeProvider initialTheme={theme}>
            <StoryComponent/>
        </ThemeProvider>
    )
}
