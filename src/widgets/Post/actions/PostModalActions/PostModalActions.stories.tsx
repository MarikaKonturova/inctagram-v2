import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { type PostResponse } from 'shared/types/post'
import { PostModalActions } from './PostModalActions'

export default {
    title: 'features/PostModalActions',
    component: PostModalActions,
    argTypes: {

    }
} as ComponentMeta<typeof PostModalActions>

const Template: ComponentStory<typeof PostModalActions> = () => {
    // TODO: fix
    return <PostModalActions post={{} as PostResponse}/>
}

export const DefaultPostModalActions = Template.bind({})
DefaultPostModalActions.args = {
}
