import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Button, Input } from '../../../../../shared/ui'
import { useAnswerForComment } from '../../model/useAnswerForComment'
import cls from './AddAnswerForCommentBox.module.scss'

interface AddAnswerForCommentBoxProps {
    postId: number
    commentId: number
}

export const AddAnswerForCommentBox = ({ postId, commentId }: AddAnswerForCommentBoxProps) => {
    const [text, setText] = useState('')
    const { addAnswerForComment, isSuccess } = useAnswerForComment()
    const onAddCommentClick = async () => {
        addAnswerForComment({ postId, commentId, answerContent: { content: text } })
    }
    useEffect(() => {
        if (isSuccess) {
            setText('')
        }
    }, [isSuccess])

    return <div className={clsx(cls.container)}>
        <Input value={text} onChange={(e) => { setText(e.currentTarget.value) }} className={clsx(cls.input)}
               placeholder='Add an answer...'
        />
        <Button onClick={onAddCommentClick} className={clsx(cls.button)} theme={'textButton'}>Publish</Button>
    </div>
}
