import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'shared/constants/theme'

import { Modal } from './Modal'

export default {
  component: Modal,
  title: 'shared/Modal',
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = args => <Modal {...args} />

export const Light = Template.bind({})

Light.args = {
  isOpen: true,
  title: 'Light  Modal',
}

export const Dark = Template.bind({})

Dark.args = {
  isOpen: true,
  title: 'Dark Modal',
}

Dark.decorators = [ThemeDecorator(Theme.DARK)]
