import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Tab } from './Tab'

export default {
  argTypes: {},
  component: Tab,
  title: 'shared/Tab',
} as ComponentMeta<typeof Tab>

const Template: ComponentStory<typeof Tab> = args => {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div
      onClick={() => {
        setIsSelected(!isSelected)
      }}
      style={{ margin: '0 10px', width: ' 200px' }}
    >
      <Tab {...args} isSelected={isSelected} />
    </div>
  )
}

export const DefaultTextarea = Template.bind({})
DefaultTextarea.args = {
  text: 'General Information',
}
