import { useGetPostAnswersForComment } from 'entities/Comment'
import { Comment } from 'features/post'
import cls from 'features/post/comment/Comment.module.scss'
import { LikeAnswerIconButton } from 'features/post/likeAnswer/ui/LikeAnswerIconButton/LikeAnswerIconButton'
import { t } from 'i18next'
import React, { useState } from 'react'
import { AnswerType } from 'shared/types/comment'
import { IComment } from 'shared/types/post'

interface PropsType {
  commentId: number
  isOpen: boolean
  openedCommentId: number
  openedComments: {
    [id: number]: boolean
  }
  postId: number
}

export const AnswersForCommentaries = ({
  commentId,
  isOpen,
  openedCommentId,
  openedComments,
  postId,
}: PropsType) => {
  const { answerForComment } = useGetPostAnswersForComment(postId, openedCommentId)

  return (
    <>
      {openedComments[commentId] !== undefined && openedComments[commentId]
        ? answerForComment?.items.map(answer =>
            answer.commentId === commentId ? (
              <Comment
                actionSlot={
                  <LikeAnswerIconButton
                    answerId={answer.id}
                    commentId={answer.commentId}
                    isLiked={answer.isLiked}
                    postId={postId}
                  />
                }
                avatarSize={36}
                commentId={openedCommentId}
                data={answer}
                isRepliedComment
                key={answer.id}
              />
            ) : null
          )
        : null}
    </>
  )
}
