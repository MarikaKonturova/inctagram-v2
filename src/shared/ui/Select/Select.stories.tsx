import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'app/config/storybook/ThemeDecorator/ThemeDecorator'
import { Select } from './Select'

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    args: {
        options: ['Selected-box 1', 'Selected-box 2', 'Selected-box 3']
    }
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args}/>
export const Normal = Template.bind({})
Normal.args = {
}
export const NormalDisabled = Template.bind({})
NormalDisabled.args = {
    disabled: true
}
export const NormalDark = Template.bind({})
NormalDark.args = {
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]
export const NormalDarkDisabled = Template.bind({})
NormalDarkDisabled.args = {
    disabled: true
}
NormalDarkDisabled.decorators = [ThemeDecorator(Theme.DARK)]
