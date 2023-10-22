import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import AvatarImg from 'shared/assets/tests/storybook.jpg'
import { Avatar } from './Avatar'

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Primary = Template.bind({})

Primary.args = {
    size: 192,
    src: AvatarImg.src
}

export const Small = Template.bind({})

Small.args = {
    size: 36,
    src: AvatarImg.src
}

export const PrimarySrcNone = Template.bind({})

PrimarySrcNone.args = {
    size: 192
}
