import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { Input } from './Input'

export default {
    title: 'shared/Input',
    component: Input
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args}/>

export const DefaultInput = Template.bind({})
DefaultInput.args = {
    type: 'text',
    placeholder: 'Text Input'
}

export const EmailInput = Template.bind({})
EmailInput.args = {
    type: 'email',
    placeholder: 'Email Input'
}

export const SearchInput = Template.bind({})
SearchInput.args = {
    type: 'search',
    placeholder: 'Search Input'
}

export const PasswordInput = Template.bind({})
PasswordInput.args = {
    type: 'password',
    placeholder: 'Password Input'
}
