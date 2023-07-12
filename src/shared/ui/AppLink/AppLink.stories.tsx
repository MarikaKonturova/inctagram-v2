import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { AppLink } from 'shared/ui/AppLink/AppLink'
export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    args: {
        to: '/test'
    }
} as ComponentMeta<typeof AppLink>

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />

export const Primary = Template.bind({})

Primary.args = {
    children: 'Primary',
    href: '/login'
}
