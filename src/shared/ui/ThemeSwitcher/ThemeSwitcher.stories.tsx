import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { ThemeDecorator } from 'shared/config/storybook'
import { Theme } from 'shared/constants/theme'
import { ThemeSwitcher } from 'shared/ui'

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
