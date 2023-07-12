import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import congratulationsImg from 'shared/assets/images/congratulations.png'
import { Card } from 'shared/ui/Card/Card'

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {}
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const BasicCard = Template.bind({})
BasicCard.args = {
    src: congratulationsImg,
    alt: 'congratulations'
}

export const CardWhenLoading = Template.bind({})
CardWhenLoading.args = {
    src: '',
    alt: 'no image',
    skeletonWidth: 300,
    skeletonHeight: 300
}
