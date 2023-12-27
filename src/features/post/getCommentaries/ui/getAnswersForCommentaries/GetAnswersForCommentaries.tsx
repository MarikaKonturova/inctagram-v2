import CommentInfo from 'entities/Post/ui/CommentInfo/CommentInfo'
import React, { useState } from 'react'

import { useGetPostAnswersForComments } from '../../model'

interface PropsType {
  commentId: number
  openedCommentId: number
  postId: number
}

const GetAnswersForCommentaries = ({ commentId, openedCommentId, postId }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const { answerForComment } = useGetPostAnswersForComments(postId, openedCommentId)

  const viewAnswerOnClick = (commentId: number) => {
    // setOpenedCommentId(commentId)
    setIsOpen(!isOpen)
    // if (isOpen) {
    //     setOpenedCommentId(0)
    //     setIsOpen(false)
    // }
  }

  return (
    <>
      {answerForComment?.items.map(answer =>
        answer.commentId === commentId ? (
          <CommentInfo
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
