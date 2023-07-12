import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar'

export default {
    title: 'widgets/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Sidebar>

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args}/>

export const Normal = Template.bind({})
Normal.args = {}
