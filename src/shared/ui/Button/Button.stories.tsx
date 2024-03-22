import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'
import { BUTTON_VARIANTS } from 'shared/constants'
import { Button } from 'shared/ui/Button/Button'
export default {
  argTypes: {
    block: { control: 'boolean' },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    size: {
      control: {
        type: 'radio',
      },
      options: ['small', 'medium', 'regular'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['outline', 'secondary', 'primary', 'textButton'],
    },
  },
  component: Button,
  title: 'shared/Button',
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const TextButton = Template.bind({})
TextButton.args = {
  children: 'Button text',
  theme: BUTTON_VARIANTS.TEXTBUTTON,
}
export const Primary = Template.bind({})
Primary.args = {
  children: 'Button text',
}
export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Button text',
  theme: BUTTON_VARIANTS.SECONDARY,
}
export const Outline = Template.bind({})
Outline.args = {
  children: 'Button text',
  theme: BUTTON_VARIANTS.OUTLINE,
}
export const WithBlock = Template.bind({})
WithBlock.args = {
  block: true,
  children: 'Button text',
}
export const TextButtonDisabled = Template.bind({})
TextButtonDisabled.args = {
  children: 'Button text',
  disabled: true,
  theme: BUTTON_VARIANTS.TEXTBUTTON,
}
export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
  children: 'Button text',
  disabled: true,
}
export const SecondaryDisabled = Template.bind({})
SecondaryDisabled.args = {
  children: 'Button text',
  disabled: true,
  theme: BUTTON_VARIANTS.SECONDARY,
}
export const OutlineDisabled = Template.bind({})
OutlineDisabled.args = {
  children: 'Button text',
  disabled: true,
  theme: BUTTON_VARIANTS.OUTLINE,
}

export const allButtons: ComponentStory<typeof Button> = args => (
  <>
    <div style={{ display: 'flex', gap: 10, paddingBottom: 10 }}>
      <Button {...args} theme={BUTTON_VARIANTS.TEXTBUTTON}>
        Button text
      </Button>
      <Button {...args}>Button text</Button>
      <Button {...args} theme={BUTTON_VARIANTS.SECONDARY}>
        Button text
      </Button>
      <Button {...args} theme={BUTTON_VARIANTS.OUTLINE}>
        Button text
      </Button>
    </div>
    <div style={{ display: 'flex', gap: 10, paddingBottom: 10 }}>
      <Button {...args} theme={BUTTON_VARIANTS.TEXTBUTTON}>
        Button text
      </Button>
      <Button {...args}>Button text</Button>
      <Button {...args} theme={BUTTON_VARIANTS.SECONDARY}>
        Button text
      </Button>
      <Button {...args} theme={BUTTON_VARIANTS.OUTLINE}>
        Button text
      </Button>
    </div>
    <div style={{ display: 'flex', gap: 10, paddingBottom: 10 }}>
      <Button {...args} theme={BUTTON_VARIANTS.TEXTBUTTON}>
        Button text
      </Button>
      <Button {...args}>Button text</Button>
      <Button {...args} theme={BUTTON_VARIANTS.SECONDARY}>
        Button text
      </Button>
      <Button {...args} theme={BUTTON_VARIANTS.OUTLINE}>
        Button text
      </Button>
    </div>
  </>
)
