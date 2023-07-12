import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { Button } from 'shared/ui/Button/Button'
export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        children: { control: 'text' },
        size: {
            options: ['small', 'medium', 'regular'],
            control: {
                type: 'radio'
            }
        },
        theme: {
            options: ['outline', 'secondary', 'primary', 'textButton'],
            control: { type: 'radio' }
        },
        disabled: { control: 'boolean' },
        block: { control: 'boolean' }
    }
} as ComponentMeta < typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const TextButton = Template.bind({})
TextButton.args = {
    children: 'Button text',
    theme: 'textButton'
}
export const Primary = Template.bind({})
Primary.args = {
    children: 'Button text'
}
export const Secondary = Template.bind({})
Secondary.args = {
    children: 'Button text',
    theme: 'secondary'
}
export const Outline = Template.bind({})
Outline.args = {
    children: 'Button text',
    theme: 'outline'
}
export const WithBlock = Template.bind({})
WithBlock.args = {
    children: 'Button text',
    block: true
}
export const TextButtonDisabled = Template.bind({})
TextButtonDisabled.args = {
    children: 'Button text',
    theme: 'textButton',
    disabled: true
}
export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
    children: 'Button text',
    disabled: true
}
export const SecondaryDisabled = Template.bind({})
SecondaryDisabled.args = {
    children: 'Button text',
    theme: 'secondary',
    disabled: true
}
export const OutlineDisabled = Template.bind({})
OutlineDisabled.args = {
    children: 'Button text',
    theme: 'outline',
    disabled: true
}

export const allButtons: ComponentStory<typeof Button> = (args) => (
    <>
        <div style={{ paddingBottom: 10, display: 'flex', gap: 10 }}>
            <Button {...args} theme={'textButton'}>
                Button text
            </Button>
            <Button {...args}>
                Button text
            </Button>
            <Button {...args} theme={'secondary'}>
                Button text
            </Button>
            <Button {...args} theme={'outline'}>
                Button text
            </Button>
        </div>
        <div style={{ paddingBottom: 10, display: 'flex', gap: 10 }}>
            <Button {...args} theme={'textButton'}>
                Button text
            </Button>
            <Button {...args} >
                Button text
            </Button>
            <Button {...args} theme={'secondary'}>
                Button text
            </Button>
            <Button {...args} theme={'outline'}>
                Button text
            </Button>
        </div>
        <div style={{ paddingBottom: 10, display: 'flex', gap: 10 }}>
            <Button {...args} theme={'textButton'}>
                Button text
            </Button>
            <Button {...args} >
                Button text
            </Button>
            <Button {...args} theme={'secondary'}>
                Button text
            </Button>
            <Button {...args} theme={'outline'}>
                Button text
            </Button>
        </div>
    </>
)
