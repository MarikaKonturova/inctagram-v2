import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { Device } from './Device'

export default {
    title: 'entities/Device',
    component: Device,
    argTypes: {
        onRemove: { action: 'clicked' }
    }
} as ComponentMeta<typeof Device>

const Template: ComponentStory<typeof Device> = (args) => <Device {...args} />

export const CurrentDevice = Template.bind({})

CurrentDevice.args = {
    device: {
        ip: '127.0.0.1',
        lastActiveDate: '2023-05-01T17:04:58.000Z',
        title: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0'
    },
    isCurrentDevice: true
}

export const OtherDevice = Template.bind({})

OtherDevice.args = {
    device: {
        ip: '127.0.0.1',
        lastActiveDate: '2023-05-01T17:02:03.000Z',
        title: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    },
    isCurrentDevice: false
}
