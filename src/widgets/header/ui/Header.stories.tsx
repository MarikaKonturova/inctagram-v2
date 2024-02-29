import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { Header } from './Header'

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Header,
  title: 'widgets/Header',
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header />

export const Normal = Template.bind({})
Normal.args = {}
