import { Menu } from '@headlessui/react'
import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { MoreOptions } from './MoreOptions'

export default {
  argTypes: {},
  component: MoreOptions,
  title: 'MoreOptions',
} as ComponentMeta<typeof MoreOptions>

const Template: ComponentStory<typeof MoreOptions> = () => {
  return (
    <MoreOptions
      content={
        <>
          <Menu.Item>Create</Menu.Item>
          <Menu.Item>Read</Menu.Item>
          <Menu.Item>Update</Menu.Item>
          <Menu.Item>Delete</Menu.Item>
        </>
      }
    />
  )
}

export const DefaultPostModalActions = Template.bind({})
DefaultPostModalActions.args = {}
