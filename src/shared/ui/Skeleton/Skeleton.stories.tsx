import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/constants/theme'

import { Skeleton } from './Skeleton'

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Skeleton,
  title: 'shared/Skeleton',
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = args => <Skeleton {...args} />

export const Normal = Template.bind({})
Normal.args = {
  height: 200,
  width: '100%',
}

export const Circle = Template.bind({})
Circle.args = {
  border: '50%',
  height: 100,
  width: 100,
}

export const NormalDark = Template.bind({})
NormalDark.args = {
  height: 200,
  width: '100%',
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

export const CircleDark = Template.bind({})
CircleDark.args = {
  border: '50%',
  height: 100,
  width: 100,
}
CircleDark.decorators = [ThemeDecorator(Theme.DARK)]
