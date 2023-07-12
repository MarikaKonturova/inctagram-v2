import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher'

export default {
    title: 'shared/ThemeSwitcher',
    component: ThemeSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ThemeSwitcher>

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => <ThemeSwitcher {...args} />

export const Light = Template.bind({})

Light.args = {}

Light.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Dark = Template.bind({})

Dark.args = {}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
