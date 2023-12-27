import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar'

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Sidebar,
  title: 'widgets/Sidebar',
} as ComponentMeta<typeof Sidebar>

const Template: ComponentStory<typeof Sidebar> = args => <Sidebar {...args} />

export const Normal = Template.bind({})
Normal.args = {}
