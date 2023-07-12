import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { Tab } from './Tab'

export default {
    title: 'shared/Tab',
    component: Tab,
    argTypes: {

    }
} as ComponentMeta<typeof Tab>

const Template: ComponentStory<typeof Tab> = (args) => {
    const [isSelected, setIsSelected] = useState(false)
    return <div onClick={() => { setIsSelected(!isSelected) }} style={{ width: ' 200px', margin: '0 10px' }}>
        <Tab {...args} isSelected={isSelected} />
    </div>
}

export const DefaultTextarea = Template.bind({})
DefaultTextarea.args = {
    text: 'General Information'

}
