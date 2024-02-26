import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { DatePicker } from './DatePicker'

export default {
  argTypes: {
    onChange: { action: 'onChange' },
  },
  component: DatePicker,
  title: 'shared/DatePicker',
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = args => <DatePicker {...args} />

export const DefaultDatePicker = Template.bind({})
DefaultDatePicker.args = {
  onChange: () => {},
  value: '2023-04-10T16:20:10.847Z',
}
