import { LikeCommentIconButton } from 'features/post'
import React, { useState } from 'react'

import CommentInfo from '../../../entities/Comment/ui/CommentInfo/CommentInfo'
import { useGetPostAnswersForComments } from './model'

interface PropsType {
  commentId: number
  openedCommentId: number
  postId: number
}

const GetAnswersForCommentaries = ({ commentId, openedCommentId, postId }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const { answerForComment } = useGetPostAnswersForComments(postId, openedCommentId)

  const viewAnswerOnClick = (commentId: number) => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {answerForComment?.items.map(answer =>
        answer.commentId === commentId ? (
          <CommentInfo
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
            postId={postId}
            viewAnswerOnClick={viewAnswerOnClick}
          />
        ) : null
      )}
    </>
  )
}

export default GetAnswersForCommentaries
