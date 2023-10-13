import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Button, Input } from 'shared/ui'
import { useCommentPost } from '../../model'

import cls from './AddCommentBox.module.scss'

interface AddCommentBoxProps {
    className?: string
    postId: number
}

export const AddCommentBox = ({ postId, className }: AddCommentBoxProps) => {
    const [text, setText] = useState('')
    const { addComment, isSuccess } = useCommentPost()
    const onAddCommentClick = async () => {
        addComment({ postId, commentContent: { content: text } })
    }
    useEffect(() => {
        if (isSuccess) {
            setText('')
        }
    }, [isSuccess])

    // return <div className={clsx(cls.container)}>
    return <div className={clsx(cls.container, {}, [className])}>
        <Input value={text} onChange={(e) => { setText(e.currentTarget.value) }} className={clsx(cls.input)}
               placeholder='Add a Comment...'
        />
        <Button onClick={onAddCommentClick} className={clsx(cls.button)} theme={'textButton'}>Publish</Button>
    </div>
}
