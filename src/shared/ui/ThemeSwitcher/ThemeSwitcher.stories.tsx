import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/constants/theme'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher'

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: ThemeSwitcher,
  title: 'shared/ThemeSwitcher',
} as ComponentMeta<typeof ThemeSwitcher>

const Template: ComponentStory<typeof ThemeSwitcher> = args => <ThemeSwitcher {...args} />

export const Light = Template.bind({})

Light.args = {}

Light.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Dark = Template.bind({})

Dark.args = {}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
