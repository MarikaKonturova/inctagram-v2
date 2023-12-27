import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { PostDropdown } from './PostDropdown'

export default {
  argTypes: {},
  component: PostDropdown,
  title: 'features/PostModalActions',
} as ComponentMeta<typeof PostDropdown>

const Template: ComponentStory<typeof PostDropdown> = () => {
  return <PostDropdown postId={'1'} userId={'1'} />
}

export const DefaultPostModalActions = Template.bind({})
DefaultPostModalActions.args = {}
