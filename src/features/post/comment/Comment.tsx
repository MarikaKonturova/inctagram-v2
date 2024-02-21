import clsx from 'clsx'
import { useCommentStore } from 'entities/Comment'
import { CreationDate } from 'entities/Post'
import React, { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import userPhoto from 'shared/assets/images/user.png'
import { type AnswerType } from 'shared/types/comment'
import { type IComment } from 'shared/types/post'
import { Avatar } from 'shared/ui'

import cls from './Comment.module.scss'

interface PropsType {
  actionSlot: ReactNode
  avatarSize: number
  commentId: number
  data: Omit<AnswerType | IComment, 'answerCount' | 'commentId' | 'postId'> & {
    answerCount?: number
    postId?: number | undefined
  }
  isRepliedComment?: boolean
  openedComments?: {
    [id: number]: boolean
  }
  viewAnswerOnClick?: (id: number) => void
}

export function Comment({
  actionSlot,
  avatarSize,
  commentId,
  data,
  isRepliedComment = false,
  openedComments,
  viewAnswerOnClick,
}: PropsType) {
  const {
    answerCount,
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
    setClicked(prevClicked => {
      const newClicked = !prevClicked

      if (newClicked) {
        setRepliedComment({
          id: isRepliedComment && commentId ? commentId : id,
          postId: postId,
          userName,
        })
        setClicked(false)
      } else {
        setRepliedComment({
          id: 0,
          postId: postId,
          userName: '',
        })
      }

      return newClicked
    })
  }

  return (
    <div className={clsx(cls.avatarCommentGroup, { [cls.additionalStyle]: isRepliedComment })}>
      <div>
        <Avatar size={avatarSize} src={avatars?.thumbnail.url || userPhoto.src} />
      </div>

      <div className={cls.commentInfo}>
        <div className={cls.commentBox}>
          <span className={cls.userName}>{userName}</span>
          <span className={cls.content}>{content}</span>
        </div>
        <div className={cls.bottomInfo}>
          <CreationDate className={cls.time} date={createdAt} type={'agoTime'} />
          <p className={cls.actionButton}>{`${t('like')}: ${likeCount}`} </p>
          <button className={cls.button} onClick={onAnswerHandler} type={'button'}>
            {t('reply')}
          </button>
        </div>
        {!!answerCount && (
          <button
            className={cls.button}
            onClick={() => {
              void viewAnswerOnClick?.(commentId)
            }}
            type={'button'}
          >
            <div>
              <span>
                {!openedComments || openedComments[commentId]
                  ? `${t('hideReplies')}`
                  : `${t('viewReplies')} (${answerCount})`}
              </span>
            </div>
            <div className={cls.line} />
          </button>
        )}
      </div>
      {actionSlot}
    </div>
  )
}
