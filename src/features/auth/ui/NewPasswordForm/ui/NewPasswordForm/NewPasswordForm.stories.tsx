import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { NewPasswordForm } from './NewPasswordForm'

export default {
    title: 'shared/NewPasswordForm',
    component: NewPasswordForm,
    argTypes: {
        onSubmit: { action: 'onSubmit' }
    }
} as ComponentMeta<typeof NewPasswordForm>

const Template: ComponentStory<typeof NewPasswordForm> = (args) => <NewPasswordForm {...args} />

export const DefaultNewPassword = Template.bind({})
DefaultNewPassword.args = {}
