import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { Input } from './Input'

export default {
  component: Input,
  title: 'shared/Input',
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => <Input {...args} />

export const DefaultInput = Template.bind({})
DefaultInput.args = {
  placeholder: 'Text Input',
  type: 'text',
}

export const EmailInput = Template.bind({})
EmailInput.args = {
  placeholder: 'Email Input',
  type: 'email',
}

export const SearchInput = Template.bind({})
SearchInput.args = {
  placeholder: 'Search Input',
  type: 'search',
}

export const PasswordInput = Template.bind({})
PasswordInput.args = {
  placeholder: 'Password Input',
  type: 'password',
}
