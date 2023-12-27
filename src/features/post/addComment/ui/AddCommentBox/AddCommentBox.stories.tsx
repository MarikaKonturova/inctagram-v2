import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { AddCommentBox } from './AddCommentBox'

export default {
  argTypes: {},
  component: AddCommentBox,
  title: 'features/AddCommentBox',
} as ComponentMeta<typeof AddCommentBox>

const Template: ComponentStory<typeof AddCommentBox> = args => {
  return (
    <div style={{ border: '1px solid white', marginLeft: '50px', width: '480px' }}>
      <AddCommentBox {...args} />
    </div>
  )
}

export const DefaultActionIcon = Template.bind({})
DefaultActionIcon.args = {
  postId: 1,
}
