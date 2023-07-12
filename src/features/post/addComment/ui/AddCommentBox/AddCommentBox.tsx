import clsx from 'clsx'
import { useState } from 'react'
import { Button, Input } from 'shared/ui'
import { useCommentPost } from '../../model'

import cls from './AddCommentBox.module.scss'

interface AddCommentBoxProps {
    postId: string
}

export const AddCommentBox = ({ postId }: AddCommentBoxProps) => {
    const [text, setText] = useState('')
    const { addComment } = useCommentPost()
    const onAddCommentClick = async () => {
        addComment({ postId, commentContent: { content: text } })
    }

    return <div className={clsx(cls.container)}>
        <Input onChange={(e) => { setText(e.currentTarget.value) }} className={clsx(cls.input)}
               placeholder='Add a Comment...'
        />
        <Button onClick={onAddCommentClick} className={clsx(cls.button)} theme={'textButton'}>Publish</Button>
    </div>
}
