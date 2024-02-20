import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import congratulationsImg from 'shared/assets/images/congratulations.png'
import { Card } from 'shared/ui/Card/Card'

export default {
  argTypes: {},
  component: Card,
  title: 'shared/Card',
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = args => <Card {...args} />

export const BasicCard = Template.bind({})
BasicCard.args = {
  alt: 'congratulations',
  src: congratulationsImg,
}

export const CardWhenLoading = Template.bind({})
CardWhenLoading.args = {
  alt: 'no image',
  src: '',
}
