import { type ComponentMeta, type ComponentStory } from '@storybook/react'

import { NewPasswordForm } from './NewPasswordForm'

export default {
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  component: NewPasswordForm,
  title: 'shared/NewPasswordForm',
} as ComponentMeta<typeof NewPasswordForm>

const Template: ComponentStory<typeof NewPasswordForm> = args => <NewPasswordForm {...args} />

export const DefaultNewPassword = Template.bind({})
DefaultNewPassword.args = {}
