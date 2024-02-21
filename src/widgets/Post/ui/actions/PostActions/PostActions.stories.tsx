import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { type PostResponse } from 'shared/types/post'

import { PostActions } from './PostActions'

export default {
  argTypes: {},
  component: PostActions,
  title: 'features/PostModalActions',
} as ComponentMeta<typeof PostActions>

const Template: ComponentStory<typeof PostActions> = () => {
  return <PostActions post={{} as PostResponse} />
}

export const DefaultPostModalActions = Template.bind({})
DefaultPostModalActions.args = {}
