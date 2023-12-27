import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import { SnackBar } from './SnackBar'

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: SnackBar,
  title: 'widgets/SnackBar',
} as ComponentMeta<typeof SnackBar>

const Template: ComponentStory<typeof SnackBar> = () => <SnackBar />

export const Normal = Template.bind({})
Normal.args = {}
