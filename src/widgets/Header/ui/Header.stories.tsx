import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { Header } from './Header'

export default {
    title: 'widgets/Header',
    component: Header,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header/>

export const Normal = Template.bind({})
Normal.args = {}
