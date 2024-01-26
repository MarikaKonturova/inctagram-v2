import { LikeCommentIconButton } from 'features/post'
import React, { type FC, useState } from 'react'
import { type ProfileDataModel } from 'shared/types/auth'

import CommentInfo from '../../../entities/Comment/ui/CommentInfo/CommentInfo'
import GetAnswersForCommentaries from '../getAnswersForCommentaries/GetAnswersForCommentaries'
import { useGetPostComments } from '../model'
import cls from './GetCommentaries.module.scss'

interface Props {
  postId: number
  userData: ProfileDataModel
}

export const GetCommentaries: FC<Props> = ({ postId, userData }) => {
  const [openedCommentId, setOpenedCommentId] = useState<number>()
  const [isOpen, setIsOpen] = useState(false)
  const { comments, isLoading } = useGetPostComments(postId)

  if (isLoading) {
    return <div className={cls.comments} />
  }

  const viewAnswerOnClick = (commentId: number) => {
    setOpenedCommentId(commentId)
    setIsOpen(!isOpen)
    if (isOpen) {
      setOpenedCommentId(0)
      setIsOpen(false)
    }
  }

  return (
    <div className={cls.comments}>
      {comments?.items.map(comment => (
        <div className={cls.comment} key={comment.id}>
          <CommentInfo
            actionSlot={
              <LikeCommentIconButton
                commentId={comment.id}
                isLiked={comment.isLiked}
                postId={comment.postId}
              />
            }
            avatarSize={36}
            data={comment}
            isOpen={isOpen}
            openedCommentId={openedCommentId}
            postId={postId}
            viewAnswerOnClick={viewAnswerOnClick}
          />
          <GetAnswersForCommentaries
            commentId={comment.id}
            openedCommentId={openedCommentId as number}
            postId={postId}
          />
        </div>
      ))}
    </div>
  )
}
