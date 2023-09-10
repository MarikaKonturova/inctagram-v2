import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { SnackBar } from './SnackBar'

export default {
    title: 'widgets/SnackBar',
    component: SnackBar,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof SnackBar>

const Template: ComponentStory<typeof SnackBar> = () => <SnackBar/>

export const Normal = Template.bind({})
Normal.args = {}
