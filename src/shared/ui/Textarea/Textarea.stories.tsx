import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { Textarea } from './Textarea'

export default {
  argTypes: {
    onChange: { action: 'onChange' },
  },
  component: Textarea,
  title: 'shared/Textarea',
} as ComponentMeta<typeof Textarea>

const Template: ComponentStory<typeof Textarea> = args => <Textarea {...args} />

export const DefaultTextarea = Template.bind({})
DefaultTextarea.args = {
  onChange: () =>
    new Promise(resolve => {
      resolve(true)
    }),
  placeholder: 'Text-area',
}
