import { useGetPostAnswersForComment } from 'entities/Comment'
import { Comment, LikeCommentIconButton } from 'features/post'
import React, { useState } from 'react'

interface PropsType {
  commentId: number
  openedCommentId: number
  postId: number
}

export const AnswersForCommentaries = ({ commentId, openedCommentId, postId }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const { answerForComment } = useGetPostAnswersForComment(postId, openedCommentId)

  const viewAnswerOnClick = (commentId: number) => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {answerForComment?.items.map(answer =>
        answer.commentId === commentId ? (
          <Comment
            actionSlot={
              <LikeCommentIconButton
                commentId={answer.commentId}
                isLiked={answer.isLiked}
                postId={answer.id}
              />
            }
            avatarSize={26}
            data={answer}
            isOpen={isOpen}
            isRepliedComment
            key={answer.id}
            openedCommentId={openedCommentId}
            viewAnswerOnClick={viewAnswerOnClick}
          />
        ) : null
      )}
    </>
  )
}
