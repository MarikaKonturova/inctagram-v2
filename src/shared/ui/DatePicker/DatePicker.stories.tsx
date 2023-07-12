import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { DatePicker } from './DatePicker'

export default {
    title: 'shared/DatePicker',
    component: DatePicker,
    argTypes: {
        onChange: { action: 'onChange' }
    }
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />

export const DefaultDatePicker = Template.bind({})
DefaultDatePicker.args = {
    value: '2023-04-10T16:20:10.847Z',
    onChange: () => {}
}
