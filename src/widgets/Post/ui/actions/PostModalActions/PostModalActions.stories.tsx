import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { type PostResponse } from 'shared/types/post'

import { PostModalActions } from './PostModalActions'

export default {
  argTypes: {},
  component: PostModalActions,
  title: 'features/PostModalActions',
} as ComponentMeta<typeof PostModalActions>

const Template: ComponentStory<typeof PostModalActions> = () => {
  return <PostModalActions post={{} as PostResponse} />
}

export const DefaultPostModalActions = Template.bind({})
DefaultPostModalActions.args = {}
