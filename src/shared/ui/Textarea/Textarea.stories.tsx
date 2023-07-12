import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { Textarea } from './Textarea'

export default {
    title: 'shared/Textarea',
    component: Textarea,
    argTypes: {
        onChange: { action: 'onChange' }
    }
} as ComponentMeta<typeof Textarea>

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />

export const DefaultTextarea = Template.bind({})
DefaultTextarea.args = {
    placeholder: 'Text-area',
    onChange: () => new Promise((resolve) => { resolve(true) })
}
