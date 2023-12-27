import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/constants/theme'
import { Loader } from 'shared/ui/Loader/Loader'

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Loader,
  title: 'shared/Loader',
} as ComponentMeta<typeof Loader>

const Template: ComponentStory<typeof Loader> = args => <Loader {...args} />

export const Light = Template.bind({})

Light.args = {}

export const Dark = Template.bind({})

Dark.args = {}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
