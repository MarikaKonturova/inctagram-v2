import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/constants/theme'

import { Select } from './Select'

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    options: ['Selected-box 1', 'Selected-box 2', 'Selected-box 3'],
  },
  component: Select,
  title: 'shared/Select',
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = args => <Select {...args} />

export const Normal = Template.bind({})
Normal.args = {}
export const NormalDisabled = Template.bind({})
NormalDisabled.args = {
  disabled: true,
}
export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]
export const NormalDarkDisabled = Template.bind({})
NormalDarkDisabled.args = {
  disabled: true,
}
NormalDarkDisabled.decorators = [ThemeDecorator(Theme.DARK)]
