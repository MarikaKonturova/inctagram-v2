import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { type AnswerType } from 'shared/types/comment'
import { type Comment } from 'shared/types/post'
import { Avatar } from 'shared/ui'
import { formattedDate } from 'shared/utils'

import { useCommentStore } from '../../model'
import cls from './CommentInfo.module.scss'

interface PropsType {
  actionSlot: ReactNode
  avatarSize: number
  data: Omit<AnswerType | Comment, 'answerCount' | 'commentId' | 'postId'> & {
    answerCount?: number
    commentId?: number
    postId?: number
  }
  isOpen: boolean
  isRepliedComment?: boolean
  openedCommentId?: number
  postId: number
  viewAnswerOnClick?: (id: number) => void
}

function CommentInfo({
  actionSlot,
  avatarSize,
  data,
  isOpen,
  isRepliedComment = false,
  openedCommentId,
  postId,
  viewAnswerOnClick,
}: PropsType) {
  const {
    answerCount,
    commentId,
    content,
    createdAt,
    from: { avatars, id: fromId, userName },
    id,
    isLiked,
    likeCount,
  } = data
  const { setRepliedComment } = useCommentStore()

  const onAnswerHandler = () => {
    setRepliedComment({ id: isRepliedComment && commentId ? commentId : id, userName })
  }

  return (
    <div className={clsx(cls.avatarCommentGroup, { [cls.additionalStyle]: isRepliedComment })}>
      <Avatar alt={'avatar'} size={avatarSize} src={avatars?.thumbnail.url} />
      <div className={cls.commentInfo}>
        <span className={cls.userName}>{userName} </span>
        <span className={cls.content}>{content}</span>
        <div className={cls.bottomInfo}>
          <p className={cls.time}>{formattedDate(createdAt)} </p>
          <p className={cls.actionButton}>Like: {likeCount} </p>
          <button className={cls.button} onClick={onAnswerHandler} type={'button'}>
            Answer
          </button>
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
                ? 'Hide answers'
                : `View answers (${answerCount})`}
            </span>
          </button>
        )}
      </div>
      {actionSlot}
    </div>
  )
}

export default CommentInfo
