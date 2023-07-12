import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import IconHeartMock from 'shared/assets/icons/light/heart.svg'
import IconHeartMockOutline from 'shared/assets/icons/outline/heart-outline.svg'
import { ActionIcon } from './ActionIcon'

export default {
    title: 'shared/ActionIcon',
    component: ActionIcon,
    argTypes: {

    }
} as ComponentMeta<typeof ActionIcon>

const Template: ComponentStory<typeof ActionIcon> = (args) => {
    const onIconClick = () => {
        return new Promise<void>(resolve => { resolve() })
    }
    return <ActionIcon {...args} onClick={onIconClick} />
}

export const DefaultActionIcon = Template.bind({})
DefaultActionIcon.args = {
    filledIcon: <IconHeartMock/>,
    outlineIcon: <IconHeartMockOutline/>
}
