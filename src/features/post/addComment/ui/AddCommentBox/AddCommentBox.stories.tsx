import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { AddCommentBox } from './AddCommentBox'

export default {
    title: 'features/AddCommentBox',
    component: AddCommentBox,
    argTypes: {

    }
} as ComponentMeta<typeof AddCommentBox>

const Template: ComponentStory<typeof AddCommentBox> = (args) => {
    return <div style={{ width: '480px', border: '1px solid white', marginLeft: '50px' }}>
        <AddCommentBox {...args}/>

    </div>
}

export const DefaultActionIcon = Template.bind({})
DefaultActionIcon.args = {
    postId: '1'

}
