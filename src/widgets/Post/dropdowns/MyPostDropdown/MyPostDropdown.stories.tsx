import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { MyPostDropdown } from './MyPostDropdown'

export default {
  argTypes: {},
  component: MyPostDropdown,
  title: 'features/PostModalActions',
} as ComponentMeta<typeof MyPostDropdown>

const Template: ComponentStory<typeof MyPostDropdown> = () => {
  return <MyPostDropdown openDeletePostModal={() => {}} openEditPostModal={() => {}} />
}

export const DefaultPostModalActions = Template.bind({})
DefaultPostModalActions.args = {}
