import clsx from 'clsx'
import { useCommentStore } from 'entities/Comment/model/useCommentStore'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Input } from 'shared/ui'

import { useCommentPost } from '../../model'
import { useAnswerForComment } from '../../model/useCommentPost'
import cls from './AddCommentBox.module.scss'

interface AddCommentBoxProps {
  className?: string
  postId: number
}

export const AddCommentBox = ({ className, postId }: AddCommentBoxProps) => {
  const { control, handleSubmit, reset, setFocus, setValue } = useForm({
    defaultValues: {
      text: '',
    },
  })
  const { addComment } = useCommentPost()
  const { addAnswerForComment } = useAnswerForComment()
  const { repliedComment, setRepliedComment } = useCommentStore()
  const { t } = useTranslation(['profile'])
  const onAddCommentClick = ({ text }: { text: string }) => {
    if (repliedComment.id) {
      addAnswerForComment({
        answerContent: { content: text },
        commentId: repliedComment.id,
        postId,
      })
    } else {
      addComment({ commentContent: { content: text }, postId })
    }
    reset()
    setRepliedComment({ id: 0, postId: 0, userName: '' })
  }

  useEffect(() => {
    if (repliedComment.userName && postId === repliedComment.postId) {
      setValue('text', `${repliedComment.userName}  `)
      setFocus('text')
    }
  }, [repliedComment.userName])

  return (
    <div className={clsx(cls.container, {}, [className])}>
      <Controller
        control={control}
        name={'text'}
        render={({ field }) => (
          <Input {...field} className={clsx(cls.input)} placeholder={`${t('addComment')}`} />
        )}
      />

      <Button
        className={clsx(cls.button)}
        onClick={handleSubmit(onAddCommentClick)}
        theme={'textButton'}
      >
        {t('publish')}
      </Button>
    </div>
  )
}
