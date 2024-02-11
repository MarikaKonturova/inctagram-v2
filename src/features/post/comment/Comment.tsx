import clsx from 'clsx'
import { useCommentStore } from 'entities/Comment'
import React, { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type AnswerType } from 'shared/types/comment'
import { type IComment } from 'shared/types/post'
import { Avatar } from 'shared/ui'
import { formattedDate } from 'shared/utils'

import cls from './Comment.module.scss'

interface PropsType {
  actionSlot: ReactNode
  avatarSize: number
  data: Omit<AnswerType | IComment, 'answerCount' | 'commentId' | 'postId'> & {
    answerCount?: number
    commentId?: number
    postId?: number | undefined
  }
  isOpen: boolean
  isRepliedComment?: boolean
  openedCommentId?: number
  viewAnswerOnClick?: (id: number) => void
}

export function Comment({
  actionSlot,
  avatarSize,
  data,
  isOpen,
  isRepliedComment = false,
  openedCommentId,
  viewAnswerOnClick,
}: PropsType) {
  const {
    answerCount,
    commentId,
    content,
    createdAt,
    from: { avatars, userName },
    id,
    likeCount,
    postId,
  } = data
  const { setRepliedComment } = useCommentStore()
  const { t } = useTranslation(['profile'])
  const [clicked, setClicked] = useState(false)

  const onAnswerHandler = () => {
    setClicked(true)
    clicked
      ? setRepliedComment({
          id: isRepliedComment && commentId ? commentId : id,
          postId: postId,
          userName,
        })
      : setRepliedComment({ id: 0, postId: postId, userName: '' })
  }

  return (
    <div className={clsx(cls.avatarCommentGroup, { [cls.additionalStyle]: isRepliedComment })}>
      <Avatar size={avatarSize} src={avatars?.thumbnail.url} />
      <div className={cls.commentInfo}>
        <span className={cls.userName}>{userName} </span>
        <span className={cls.content}>{content}</span>
        <div className={cls.bottomInfo}>
          <p className={cls.time}>{formattedDate(createdAt)} </p>
          <p className={cls.actionButton}>{`${t('like')}: ${likeCount}`} </p>
          <button className={cls.button} onClick={onAnswerHandler} type={'button'}>
            {t('reply')}
          </button>
          {clicked && <button onClick={() => setClicked(false)}>x</button>}
        </div>
        {!!answerCount && (
          <button
            className={cls.button}
            onClick={() => {
              void viewAnswerOnClick?.(id)
            }}
            type={'button'}
          >
            <div className={cls.line} />
            <span>
              {isOpen && (openedCommentId === id || openedCommentId === commentId)
                ? `${t('hideReplies')}`
                : `${t('viewReplies')} (${answerCount})`}
            </span>
          </button>
        )}
      </div>
      {actionSlot}
    </div>
  )
}
