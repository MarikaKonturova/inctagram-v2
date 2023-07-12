import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { MyPostDropdown } from './MyPostDropdown'

export default {
    title: 'features/PostModalActions',
    component: MyPostDropdown,
    argTypes: {

    }
} as ComponentMeta<typeof MyPostDropdown>

const Template: ComponentStory<typeof MyPostDropdown> = () => {
    return <MyPostDropdown />
}

export const DefaultPostModalActions = Template.bind({})
DefaultPostModalActions.args = {
}
