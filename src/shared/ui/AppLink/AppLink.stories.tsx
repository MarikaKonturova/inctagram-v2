import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { AppLink } from 'shared/ui/AppLink/AppLink'
export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/test',
  },
  component: AppLink,
  title: 'shared/AppLink',
} as ComponentMeta<typeof AppLink>

const Template: ComponentStory<typeof AppLink> = args => <AppLink {...args} />

export const Primary = Template.bind({})

Primary.args = {
  children: 'Primary',
  href: '/login',
}
