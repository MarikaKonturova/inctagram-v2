import clsx from 'clsx'
import { LikeCommentIconButton } from 'features/post'
import { useCommentStore } from 'features/profile/getPosts/model'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type AnswerType } from 'shared/types/comment'
import { type Comment } from 'shared/types/post'
import { Avatar } from 'shared/ui'
import { formattedDate } from 'shared/utils'

import cls from './CommentInfo.module.scss'

interface PropsType {
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
  const { t } = useTranslation(['profile'])

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
          <p className={cls.actionButton}>{`${t('like')}: ${likeCount}`} </p>
          <button className={cls.button} onClick={onAnswerHandler} type={'button'}>
            {t('reply')}
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
                ? `${t('hideReplies')}`
                : `${t('viewReplies')} (${answerCount})`}
            </span>
          </button>
        )}
      </div>
      <LikeCommentIconButton commentId={commentId || id} isLiked={isLiked} postId={postId} />
    </div>
  )
}

export default CommentInfo
