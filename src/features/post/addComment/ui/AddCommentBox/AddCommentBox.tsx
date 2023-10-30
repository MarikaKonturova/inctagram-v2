import clsx from 'clsx'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useCommentStore } from 'features/profile/getPosts/model'
import { Button, Input } from 'shared/ui'
import { useCommentPost } from '../../model'

import { useAnswerForComment } from '../../model/useCommentPost'
import cls from './AddCommentBox.module.scss'

interface AddCommentBoxProps {
    className?: string
    postId: number
}

export const AddCommentBox = ({ postId, className }: AddCommentBoxProps) => {
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        setFocus
    } = useForm({
        defaultValues: {
            text: ''
        }
    })
    const { addComment } = useCommentPost()
    const { addAnswerForComment } = useAnswerForComment()
    const { repliedComment, setRepliedComment } = useCommentStore()

    const onAddCommentClick = ({ text }: { text: string }) => {
        if (repliedComment.id) {
            addAnswerForComment({ postId, commentId: repliedComment.id, answerContent: { content: text } })
        } else {
            addComment({ postId, commentContent: { content: text } })
        }
        reset()
        setRepliedComment({ id: 0, userName: '' })
    }

    useEffect(() => {
        if (repliedComment.userName) {
            setValue('text', repliedComment.userName + ' ')
            setFocus('text')
        }
    }, [repliedComment.userName])

    // return <div className={clsx(cls.container)}>
    return (
        <div className={clsx(cls.container, {}, [className])}>
            <Controller
            name="text"
            control={control}
            render={({ field }) => (
                <Input {...field}
                       className={clsx(cls.input)}
                       placeholder='Add a Comment...'
                />)} />

            <Button
            theme={'textButton'}
            className={clsx(cls.button)}
            onClick={handleSubmit(onAddCommentClick)}
            >
                Publish
            </Button>
        </div>
    )
}
